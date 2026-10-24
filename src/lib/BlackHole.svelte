<script>
	// Full-screen ray-traced Schwarzschild black hole (r_s = 1). Photons are
	// integrated with a = -1.5 h² x / r⁵, cross a thin accretion disk with
	// Doppler beaming, and land on a text plane behind the hole, so the name
	// is gravitationally lensed. Costs one fullscreen fragment pass per frame
	// at an adaptive resolution; the loop stops whenever the canvas is dimmed.
	import { onMount } from 'svelte';

	/** hero: 0 at the top, 1 once the hero has scrolled away. finale: 0..1 as the contact section arrives. */
	let { hero = 0, finale = 0, title = 'DEANDARK', lensed = 'EVENT HORIZON', ok = $bindable(true) } = $props();

	let canvas;
	let invalidate = () => {};
	let redraw = () => {};

	const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

	const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime, uFocal, uDisk, uText, uRow, uShift;
uniform vec3 uCam, uFwd, uRight, uUp;
uniform sampler2D uTex;

const float RIN = 3.0;
const float ROUT = 14.0;
const float ZT = 40.0;
const vec2 PLANE = vec2(64.0, 32.0);
const float FAR = 90.0;

float hash(vec3 p) {
	p = fract(p * 0.3183099 + 0.1);
	p *= 17.0;
	return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

vec3 stars(vec3 d) {
	vec3 col = vec3(0.0);
	for (int i = 0; i < 2; i++) {
		float s = i == 0 ? 160.0 : 380.0;
		vec3 q = d * s;
		vec3 c = floor(q);
		float h = hash(c);
		if (h > 0.982) {
			vec3 o = vec3(hash(c + 1.3), hash(c + 2.7), hash(c + 4.1)) - 0.5;
			float b = smoothstep(0.28, 0.0, length(fract(q) - 0.5 - o * 0.5)) * (h - 0.982) / 0.018;
			col += b * mix(vec3(0.72, 0.68, 1.0), vec3(1.0, 0.9, 0.86), hash(c + 7.0));
		}
	}
	// Faint violet haze, tuned so open sky lands near the page's #05040a after gamma.
	return col + vec3(0.00016, 0.0001, 0.0007) * (1.0 - abs(d.y));
}

// Rays that hit the plane sit next to rays that miss it (plane edge, shadow
// edge), so the hardware mip choice explodes there and draws a dotted seam of
// the texture's average. With the LOD extensions the level is capped instead,
// and past ~16 texels per pixel (photon ring, edges) the text fades out rather
// than sparkle.
vec2 textAlpha(vec2 t) {
#ifdef LOD
	vec2 dx = dFdx(t) * vec2(2048.0, 512.0);
	vec2 dy = dFdy(t) * vec2(2048.0, 512.0);
	float l = 0.5 * log2(max(max(dot(dx, dx), dot(dy, dy)), 1.0));
	float keep = 1.0 - smoothstep(4.0, 6.0, l);
	l = min(l, 3.0);
	return keep * vec2(texture2DLodEXT(uTex, t, l).a, texture2DLodEXT(uTex, t + vec2(0.0, 0.5), l).a);
#else
	return vec2(texture2D(uTex, t).a, texture2D(uTex, t + vec2(0.0, 0.5)).a);
#endif
}

vec3 disk(vec3 p, vec3 dir, out float a) {
	float r = length(p.xz);
	float ang = atan(p.z, p.x) - uTime * 1.6 * pow(r, -1.5);
	float bands = 0.55 + 0.25 * sin(ang * 3.0 + log(r) * 9.0) + 0.2 * sin(ang * 7.0 - r * 2.3);
	float edge = smoothstep(RIN, RIN + 0.8, r) * (1.0 - smoothstep(ROUT - 6.0, ROUT, r));
	float temp = pow(RIN / r, 0.9);
	vec3 vdir = normalize(vec3(-p.z, 0.0, p.x));
	float v = sqrt(0.5 / r);
	float g = sqrt(1.0 - v * v) / (1.0 - v * dot(vdir, -dir)) * sqrt(1.0 - 1.0 / r);
	float heat = clamp(temp * g, 0.0, 1.4);
	vec3 c = mix(vec3(0.22, 0.08, 0.62), vec3(0.78, 0.45, 1.0), clamp(heat, 0.0, 1.0));
	c = mix(c, vec3(1.0, 0.94, 1.0), clamp(heat - 0.75, 0.0, 1.0));
	a = clamp(edge * (0.5 + 0.5 * bands), 0.0, 1.0) * 0.92;
	return c * temp * bands * edge * g * g * g * 2.4;
}

void main() {
	// uShift lifts the image off-centre (portrait screens keep the hole clear of the lead).
	vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y) - vec2(0.0, uShift);
	vec3 v = normalize(uFwd * uFocal + uRight * uv.x + uUp * uv.y);
	vec3 p = uCam;
	vec3 hc = cross(p, v);
	float h2 = dot(hc, hc);
	vec3 col = vec3(0.0);
	float T = 1.0;
	vec2 tuv = vec2(0.0);
	float hit = 0.0;
	bool captured = false;

	for (int i = 0; i < 240; i++) {
		float r2 = dot(p, p);
		float r = sqrt(r2);
		if (r < 1.0) { captured = true; break; }
		if (r > FAR) break;
		float dt = clamp(0.03 * r + 0.002 * r2, 0.02, 6.0);
		v += -1.5 * h2 * p / (r2 * r2 * r) * dt;
		vec3 np = p + v * dt;
		if (p.y * np.y < 0.0) {
			vec3 q = mix(p, np, p.y / (p.y - np.y));
			float rr = length(q.xz);
			if (rr > RIN && rr < ROUT) {
				float a;
				vec3 e = disk(q, normalize(v), a);
				col += T * e * uDisk;
				T *= 1.0 - a * uDisk;
			}
		}
		if (hit < 0.5 && p.z > -ZT && np.z <= -ZT) {
			vec3 q = mix(p, np, (p.z + ZT) / (p.z - np.z));
			vec2 s = q.xy / PLANE + 0.5;
			if (s.x > 0.0 && s.x < 1.0 && s.y > 0.0 && s.y < 1.0) { tuv = s; hit = 1.0; }
		}
		p = np;
	}

	// Sampled outside the loop so the mip level comes from uniform control flow.
	vec2 t = vec2(tuv.x, (1.0 - tuv.y) * 0.5);
	vec2 rows = textAlpha(t);
	float ta = mix(rows.x, rows.y, uRow) * hit * uText;
	vec3 nv = normalize(v);
	vec3 bg = captured ? vec3(0.0) : stars(nv);
#ifdef LOD
	// Beside the shadow the whole sky squeezes into a few pixels; stars there only flicker.
	bg *= 1.0 - smoothstep(0.01, 0.04, length(fwidth(nv)));
#endif
	col += T * mix(bg, vec3(0.86, 0.8, 1.0) * 0.95, ta);

	col = 1.0 - exp(-col * 1.25);
	gl_FragColor = vec4(pow(col, vec3(0.4545)), 1.0);
}`;

	/** Two rows on one texture: the name on top, the finale line below. */
	function drawText(ctx, w, h) {
		ctx.clearRect(0, 0, w, h);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#fff';
		ctx.shadowColor = 'rgba(200, 160, 255, 0.9)';
		ctx.shadowBlur = 18;
		const rows = [title, lensed];
		rows.forEach((text, i) => {
			let size = h * 0.3;
			ctx.font = `600 ${size}px "Clash Display", system-ui, sans-serif`;
			const fit = (w * 0.92) / ctx.measureText(text).width;
			if (fit < 1) {
				size *= fit;
				ctx.font = `600 ${size}px "Clash Display", system-ui, sans-serif`;
			}
			ctx.fillText(text, w / 2, h * (0.25 + i * 0.5));
		});
	}

	function compile(gl, type, src) {
		const s = gl.createShader(type);
		gl.shaderSource(s, src);
		gl.compileShader(s);
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
		return s;
	}

	const clamp01 = (x) => Math.min(1, Math.max(0, x));
	const ease = (x) => 1 - Math.pow(1 - clamp01(x), 3);

	onMount(() => {
		const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false });
		if (!gl) return void (ok = false);

		let prog;
		try {
			prog = gl.createProgram();
			gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
			const lod = gl.getExtension('OES_standard_derivatives') && gl.getExtension('EXT_shader_texture_lod');
			const head = lod
				? '#extension GL_OES_standard_derivatives : enable\n#extension GL_EXT_shader_texture_lod : enable\n#define LOD\n'
				: '';
			gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, head + FRAG));
			gl.linkProgram(prog);
			if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
		} catch (e) {
			console.error(e);
			return void (ok = false);
		}
		gl.useProgram(prog);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		const U = {};
		for (const n of ['uRes', 'uTime', 'uFocal', 'uShift', 'uDisk', 'uText', 'uRow', 'uCam', 'uFwd', 'uRight', 'uUp']) {
			U[n] = gl.getUniformLocation(prog, n);
		}

		const tex = gl.createTexture();
		const text = document.createElement('canvas');
		text.width = 2048;
		text.height = 512;
		const upload = () => {
			drawText(text.getContext('2d'), text.width, text.height);
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			invalidate();
		};
		redraw = upload;
		document.fonts.load('600 100px "Clash Display"').then(upload, () => {});

		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		let skipIntro = reduced.matches;
		try {
			skipIntro ||= sessionStorage.getItem('dd-intro') === '1';
			sessionStorage.setItem('dd-intro', '1');
		} catch {}
		const born = performance.now();
		const introStart = born - (skipIntro ? 1e5 : 0);

		// Adaptive resolution: a pixel budget, scaled by q, which follows frame time.
		const BUDGET = 1.5e6;
		let q = 0.75;
		let lastTune = 0;
		let avg = 16.7;
		const size = () => {
			const w = canvas.clientWidth || innerWidth;
			const h = canvas.clientHeight || innerHeight;
			const s = Math.min(devicePixelRatio || 1, Math.sqrt(BUDGET / (w * h))) * q;
			const W = Math.max(1, Math.round(w * s));
			const H = Math.max(1, Math.round(h * s));
			if (canvas.width !== W || canvas.height !== H) {
				canvas.width = W;
				canvas.height = H;
				gl.viewport(0, 0, W, H);
			}
		};
		size();

		let mx = 0;
		let my = 0;
		let px = 0;
		let py = 0;
		const onPointer = (e) => {
			if (reduced.matches) return;
			mx = (e.clientX / innerWidth) * 2 - 1;
			my = (e.clientY / innerHeight) * 2 - 1;
		};

		let raf = 0;
		let last = 0;
		const looping = () => !document.hidden && !reduced.matches && (hero < 1 || finale > 0);

		const frame = (now) => {
			raf = 0;
			const dt = last ? Math.min(now - last, 100) : 16.7;
			last = now;
			// Resizing clears the canvas, so it happens before this frame draws, never after.
			if (now - lastTune > 1500 && (avg > 24 ? q > 0.4 : avg < 17.5 && q < 1)) {
				q = avg > 24 ? Math.max(0.4, q * 0.85) : Math.min(1, q * 1.1);
				lastTune = now;
				size();
			}
			const age = (now - introStart) / 1000;
			const intro = ease(age / 3.2);
			const time = reduced.matches ? 12 : (now - born) / 1000 + 20;

			px += (mx - px) * Math.min(1, dt / 400);
			py += (my - py) * Math.min(1, dt / 400);

			const D = (70 - 48 * intro) * (1 - 0.27 * hero) * (1 - 0.62 * finale);
			const yaw = -0.35 + 0.35 * intro + px * 0.08;
			const el = 0.1 + 0.05 * finale + py * 0.035;
			const cam = [D * Math.sin(yaw) * Math.cos(el), D * Math.sin(el), D * Math.cos(yaw) * Math.cos(el)];
			const len = Math.hypot(...cam);
			const fwd = cam.map((c) => -c / len);
			let right = [-fwd[2], 0, fwd[0]];
			const rl = Math.hypot(...right);
			right = right.map((c) => c / rl);
			let up = [
				right[1] * fwd[2] - right[2] * fwd[1],
				right[2] * fwd[0] - right[0] * fwd[2],
				right[0] * fwd[1] - right[1] * fwd[0]
			];
			const roll = -0.14 + 0.06 * finale;
			const cr = Math.cos(roll);
			const sr = Math.sin(roll);
			[right, up] = [right.map((c, i) => c * cr + up[i] * sr), up.map((c, i) => c * cr - right[i] * sr)];

			gl.uniform2f(U.uRes, canvas.width, canvas.height);
			gl.uniform1f(U.uTime, time);
			gl.uniform1f(U.uFocal, 0.95);
			const tall = canvas.height / canvas.width;
			gl.uniform1f(U.uShift, tall > 1 ? 0.1 * tall * (1 - finale) : 0);
			gl.uniform1f(U.uDisk, ease((age - 0.4) / 2.4));
			gl.uniform1f(U.uText, ease((age - 1.2) / 2));
			gl.uniform1f(U.uRow, clamp01((finale - 0.35) / 0.5));
			gl.uniform3fv(U.uCam, cam);
			gl.uniform3fv(U.uFwd, fwd);
			gl.uniform3fv(U.uRight, right);
			gl.uniform3fv(U.uUp, up);
			gl.drawArrays(gl.TRIANGLES, 0, 3);

			if (!looping()) {
				last = 0;
				return;
			}
			avg += (dt - avg) * 0.1;
			raf = requestAnimationFrame(frame);
		};

		// One queued frame at most; frame() keeps itself going while looping() holds.
		invalidate = () => {
			if (!raf) raf = requestAnimationFrame(frame);
		};

		const onResize = () => {
			size();
			invalidate();
		};
		const onLost = (e) => {
			e.preventDefault();
			cancelAnimationFrame(raf);
			raf = 0;
			invalidate = redraw = () => {};
			ok = false;
		};

		addEventListener('resize', onResize);
		addEventListener('pointermove', onPointer, { passive: true });
		document.addEventListener('visibilitychange', onResize);
		canvas.addEventListener('webglcontextlost', onLost);
		invalidate();

		return () => {
			cancelAnimationFrame(raf);
			invalidate = redraw = () => {};
			removeEventListener('resize', onResize);
			removeEventListener('pointermove', onPointer);
			document.removeEventListener('visibilitychange', onResize);
			canvas.removeEventListener('webglcontextlost', onLost);
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		};
	});

	// Scroll changes restart a stopped loop, or redraw once when it stays stopped.
	$effect(() => {
		hero;
		finale;
		invalidate();
	});

	// Declared after onMount, so the first run finds upload in place; later runs follow a language switch.
	$effect(() => {
		title;
		lensed;
		redraw();
	});
</script>

<canvas
	bind:this={canvas}
	aria-hidden="true"
	style:opacity={ok ? Math.max(1 - hero * 0.88, finale) : 0}
></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		z-index: 0;
		width: 100vw;
		height: 100lvh;
		pointer-events: none;
		transition: opacity 0.4s linear;
	}
</style>
