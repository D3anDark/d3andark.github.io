<script>
	// A browser-sized imitation of Unisic's region capture: drag a selection on
	// a fake desktop, read its size in virtual 2560×1440 pixels, pick an action.
	import { inview } from './inview.js';

	let { t } = $props();

	const VW = 2560;
	const VH = 1440;
	const SAMPLE = { x: 0.2, y: 0.24, w: 0.46, h: 0.46 };

	let screen;
	let phase = $state('idle'); // idle | drag | done
	let sel = $state({ x: 0, y: 0, w: 0, h: 0 });
	let toast = $state('');
	let pulse = $state(0);
	let count = 0;
	let played = false;
	let origin;
	let rect;
	let toastTimer;
	let anim = 0;

	const size = $derived(`${Math.round(sel.w * VW)} × ${Math.round(sel.h * VH)}`);
	const below = $derived(sel.y + sel.h < 0.78);

	const clamp01 = (v) => Math.min(1, Math.max(0, v));

	function point(e) {
		return [clamp01((e.clientX - rect.left) / rect.width), clamp01((e.clientY - rect.top) / rect.height)];
	}

	function down(e) {
		if (e.button !== 0 || e.target.closest('button')) return;
		cancelAnimationFrame(anim);
		rect = screen.getBoundingClientRect();
		origin = point(e);
		sel = { x: origin[0], y: origin[1], w: 0, h: 0 };
		phase = 'drag';
		screen.setPointerCapture(e.pointerId);
	}

	function move(e) {
		if (phase !== 'drag') return;
		const [x, y] = point(e);
		sel = { x: Math.min(x, origin[0]), y: Math.min(y, origin[1]), w: Math.abs(x - origin[0]), h: Math.abs(y - origin[1]) };
	}

	function up() {
		if (phase !== 'drag') return;
		phase = sel.w > 0.02 && sel.h > 0.02 ? 'done' : 'idle';
	}

	function reset() {
		cancelAnimationFrame(anim);
		phase = 'idle';
	}

	function sample() {
		cancelAnimationFrame(anim);
		sel = { ...SAMPLE };
		phase = 'done';
		requestAnimationFrame(() => screen.querySelector('.tools button')?.focus());
	}

	/** First time the demo is seen, it draws a selection by itself. */
	function autoplay(seen) {
		if (!seen || played || phase !== 'idle') return;
		played = true;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return void (sel = { ...SAMPLE }, (phase = 'done'));
		const start = performance.now() + 500;
		phase = 'drag';
		sel = { x: SAMPLE.x, y: SAMPLE.y, w: 0, h: 0 };
		const step = (now) => {
			const k = Math.min(1, Math.max(0, (now - start) / 1100));
			const e = 1 - Math.pow(1 - k, 3);
			sel = { x: SAMPLE.x, y: SAMPLE.y, w: SAMPLE.w * e, h: SAMPLE.h * e };
			if (k < 1) anim = requestAnimationFrame(step);
			else phase = 'done';
		};
		anim = requestAnimationFrame(step);
	}

	function act(i) {
		count += 1;
		const [w, h] = size.split(' × ');
		toast = t.done[i].replace('{w}', w).replace('{h}', h).replace('{n}', String(count));
		pulse += 1;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toast = '';
			phase = 'idle';
		}, 2600);
	}

	function key(e) {
		if (e.key === 'Escape' && phase !== 'idle') reset();
	}

	$effect(() => () => {
		clearTimeout(toastTimer);
		cancelAnimationFrame(anim);
	});
</script>

<div class="demo" {@attach inview(autoplay)}>
	<div class="bar">
		<p>{t.title}</p>
		<button type="button" class="sample" onclick={sample}>{t.keyboard}</button>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="screen"
		class:idle={phase === 'idle'}
		bind:this={screen}
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={reset}
		onkeydown={key}
	>
		<div class="wall" aria-hidden="true">
			<div class="win term">
				<i></i>
				<div class="lines">
					{#each [62, 40, 78, 30, 55, 70, 24, 48, 66, 36] as w, i (i)}
						<span style:width="{w}%" class:c={i % 3 === 1}></span>
					{/each}
				</div>
			</div>
			<div class="win pic"><i></i><b></b></div>
			<div class="panel"><s></s><s></s><s></s><em>21:37</em></div>
		</div>

		{#if phase === 'idle'}
			<p class="hint" aria-hidden="true">{t.hint}</p>
		{:else}
			{#key pulse}
				<div
					class="sel"
					class:flash={pulse > 0 && toast}
					style:left="{sel.x * 100}%"
					style:top="{sel.y * 100}%"
					style:width="{sel.w * 100}%"
					style:height="{sel.h * 100}%"
				>
					<span class="size">{size}</span>
					<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>
				</div>
			{/key}
			{#if phase === 'done' && !toast}
				<div
					class="tools"
					class:above={!below}
					style:left="{Math.min(sel.x, 0.55) * 100}%"
					style:top="{(below ? sel.y + sel.h : sel.y) * 100}%"
				>
					{#each t.actions as label, i (label)}
						<button type="button" onclick={() => act(i)}>{label}</button>
					{/each}
				</div>
			{/if}
		{/if}

		<p class="toast" class:on={toast} role="status">{toast}</p>
	</div>

	<p class="note">{t.note} <span>{t.escape}</span></p>
</div>

<style>
	.demo {
		display: grid;
		gap: 14px;
	}

	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 16px;
	}

	.bar p {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.15rem;
	}

	.sample {
		font: 500 0.78rem/1 var(--font-mono);
		color: var(--ink-2);
		background: none;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 8px 12px;
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s;
	}

	.sample:hover {
		color: var(--ink);
		border-color: var(--accent);
	}

	.screen {
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid var(--line);
		background: #0d0a1c;
		cursor: crosshair;
		touch-action: none;
		user-select: none;
		box-shadow: 0 30px 80px -30px rgba(120, 50, 220, 0.45);
	}

	.wall {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 78% 22%, transparent 5.5%, rgba(226, 207, 238, 0.5) 6%, transparent 9%),
			radial-gradient(ellipse 70% 60% at 75% 20%, rgba(174, 49, 246, 0.35), transparent 70%),
			radial-gradient(ellipse 80% 70% at 10% 100%, rgba(67, 61, 139, 0.6), transparent 70%),
			linear-gradient(160deg, #17153b, #0b0918);
	}

	.win {
		position: absolute;
		border-radius: 8px;
		background: rgba(18, 15, 36, 0.92);
		border: 1px solid rgba(200, 172, 214, 0.16);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
	}

	.win > i {
		display: block;
		height: 9%;
		min-height: 10px;
		border-bottom: 1px solid rgba(200, 172, 214, 0.1);
		background: radial-gradient(circle at 12px 50%, #c8acd6 2.5px, transparent 3px),
			radial-gradient(circle at 24px 50%, rgba(200, 172, 214, 0.4) 2.5px, transparent 3px);
	}

	.term {
		left: 6%;
		top: 9%;
		width: 50%;
		height: 62%;
	}

	.lines {
		display: grid;
		gap: 6%;
		padding: 5% 6%;
	}

	.lines span {
		height: 5px;
		border-radius: 3px;
		background: rgba(226, 207, 238, 0.28);
	}

	.lines span.c {
		background: rgba(174, 49, 246, 0.55);
	}

	.pic {
		right: 5%;
		top: 30%;
		width: 34%;
		height: 48%;
	}

	.pic b {
		position: absolute;
		inset: 16% 6% 6%;
		border-radius: 4px;
		background: radial-gradient(circle at 50% 55%, #05040a 16%, #e2cfee 18%, #ae31f6 26%, transparent 46%),
			linear-gradient(180deg, #1b1640, #2e236c);
	}

	.panel {
		position: absolute;
		inset: auto 0 0;
		height: 7%;
		display: flex;
		align-items: center;
		gap: 1.2%;
		padding: 0 2%;
		background: rgba(10, 8, 22, 0.85);
		border-top: 1px solid rgba(200, 172, 214, 0.1);
	}

	.panel s {
		width: 2.2%;
		aspect-ratio: 1;
		border-radius: 4px;
		background: rgba(200, 172, 214, 0.35);
	}

	.panel em {
		margin-left: auto;
		font: 500 clamp(0.5rem, 1.2vw, 0.72rem) / 1 var(--font-mono);
		font-style: normal;
		color: var(--ink-2);
	}

	.screen.idle::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(5, 4, 10, 0.5);
		pointer-events: none;
	}

	.hint {
		position: absolute;
		inset: 0;
		z-index: 1;
		margin: 0;
		display: grid;
		place-items: center;
		font: 500 clamp(0.8rem, 2vw, 1rem) / 1 var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink);
		pointer-events: none;
	}

	.sel {
		position: absolute;
		z-index: 1;
		outline: 1.5px solid var(--lilac);
		box-shadow: 0 0 0 100vmax rgba(5, 4, 10, 0.55);
		pointer-events: none;
	}

	.sel.flash {
		animation: shot 0.5s var(--ease);
	}

	@keyframes shot {
		from {
			outline-color: #fff;
			outline-offset: 6px;
		}
	}

	.size {
		position: absolute;
		left: 0;
		bottom: calc(100% + 6px);
		padding: 3px 7px;
		border-radius: 5px;
		background: var(--lilac);
		color: #120d24;
		font: 600 0.7rem/1.2 var(--font-mono);
		white-space: nowrap;
	}

	.h {
		position: absolute;
		width: 8px;
		height: 8px;
		background: #fff;
		border: 1.5px solid #5b2a9a;
		border-radius: 2px;
	}

	.tl { left: -4px; top: -4px; }
	.tr { right: -4px; top: -4px; }
	.bl { left: -4px; bottom: -4px; }
	.br { right: -4px; bottom: -4px; }

	.tools {
		position: absolute;
		z-index: 2;
		display: flex;
		gap: 4px;
		margin-top: 10px;
		padding: 4px;
		border-radius: 10px;
		background: rgba(18, 14, 36, 0.96);
		border: 1px solid rgba(200, 172, 214, 0.22);
		animation: rise 0.25s var(--ease);
	}

	.tools.above {
		margin-top: 0;
		transform: translateY(calc(-100% - 10px));
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 6px;
		}
	}

	.tools button {
		font: 500 clamp(0.62rem, 1.4vw, 0.8rem) / 1 var(--font-body);
		color: var(--ink);
		background: none;
		border: 0;
		border-radius: 7px;
		padding: 7px 10px;
		cursor: pointer;
	}

	.tools button:hover,
	.tools button:focus-visible {
		background: rgba(174, 49, 246, 0.3);
	}

	.toast {
		position: absolute;
		right: 3%;
		bottom: 11%;
		z-index: 3;
		margin: 0;
		max-width: 70%;
		padding: 10px 14px;
		border-radius: 10px;
		background: rgba(18, 14, 36, 0.96);
		border: 1px solid rgba(200, 172, 214, 0.25);
		font: 500 clamp(0.66rem, 1.4vw, 0.85rem) / 1.3 var(--font-body);
		opacity: 0;
		translate: 0 8px;
		transition: opacity 0.25s, translate 0.25s var(--ease);
		pointer-events: none;
	}

	.toast.on {
		opacity: 1;
		translate: 0 0;
	}

	.note {
		margin: 0;
		font: 0.78rem/1.5 var(--font-mono);
		color: var(--ink-3);
	}

	.note span {
		white-space: nowrap;
	}

	@media (hover: none) {
		.note span {
			display: none;
		}
	}
</style>
