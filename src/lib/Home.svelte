<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { fade } from 'svelte/transition';
	import BlackHole from './BlackHole.svelte';
	import CaptureDemo from './CaptureDemo.svelte';
	import Orbit from './Orbit.svelte';
	import Logo from './Logo.svelte';
	import { copy, site, links, install, stack, setup, games, gallery, bench, moons, belt, steam } from './content.js';
	import { reveal } from './inview.js';
	import { embed } from './embed.js';

	// One URL for both languages: the prerendered HTML is English, and the head
	// script has already set <html lang> before hydration swaps the text.
	let lang = $state(browser && document.documentElement.lang === 'pl' ? 'pl' : 'en');

	const t = $derived(copy[lang]);

	// English, like the prerendered HTML Discord reads it from.
	const en = copy.en;
	const card = embed([
		{ type: 12, items: [{ media: { url: site + '/images/embed.webp' }, description: en.hero.note }] },
		{
			type: 9,
			components: [{ type: 10, content: `# [DeanDark](${site})\n-# ${en.hero.kicker}\n${en.hero.lead}` }],
			accessory: { type: 11, media: { url: 'https://cdn.deandark.me/DeanDarkOdznaka.png' } }
		},
		{ type: 14 },
		{
			type: 10,
			content: [
				`**[Unisic](${links.unisic})** · ${en.unisic.tagline}`,
				`**[Tuni](${links.tuni})** · ${en.tuni.tagline}`,
				`-# ${en.belt.title}: ${belt.map((b) => b.name).join(', ')}`
			].join('\n')
		},
		{
			type: 1,
			components: [
				{ type: 2, style: 5, url: site, label: 'deandark.me' },
				{ type: 2, style: 5, url: links.github, label: 'GitHub' },
				{ type: 2, style: 5, url: links.server, label: en.horizon.channels[1] }
			]
		}
	]);

	const secs = $derived([
		['top', 'DeanDark'],
		['signature', t.signature.label],
		['now', t.now.label],
		['system', t.system.label],
		['unisic', 'Unisic'],
		['tuni', 'Tuni'],
		['belt', t.belt.label],
		['station', t.station.label],
		['trajectory', t.trajectory.label],
		['horizon', t.horizon.label]
	]);
	const channels = $derived(
		[
			[links.discord, 'Discord'],
			[links.server, 'discord.gg/hzd'],
			[links.email, 'contact@deandark.me'],
			[links.github, 'github.com/D3anDark']
		].map(([href, handle], i) => ({ href, handle, label: t.horizon.channels[i] }))
	);
	const fastest = Math.max(...bench.map((b) => b.mibs));
	const year = new Date().getFullYear();

	let ok = $state(true);
	let hero = $state(0);
	let finale = $state(0);
	let progress = $state(0);
	let section = $state(0);
	let menu = $state(false);
	let copied = $state(false);
	let peek = $state(null);
	let px = $state(0);
	let py = $state(0);

	// Falling in: the HUD distance shrinks from 26 to 1 Schwarzschild radius.
	const r = $derived(1 + 25 * (1 - progress) ** 2);
	const dilation = $derived(r - 1 < 1e-3 ? '∞' : (1 / Math.sqrt(1 - 1 / r)).toFixed(3));

	let horizonEl;
	let secEls = [];
	let raf = 0;
	let copyTimer;

	const clamp01 = (v) => Math.min(1, Math.max(0, v));

	function measure() {
		raf = 0;
		const vh = innerHeight;
		hero = clamp01(scrollY / vh);
		finale = horizonEl ? clamp01(1 - horizonEl.getBoundingClientRect().top / vh) : 0;
		const max = document.documentElement.scrollHeight - vh;
		progress = max > 0 ? clamp01(scrollY / max) : 0;
		let i = 0;
		for (let k = 0; k < secEls.length; k++) if (secEls[k].getBoundingClientRect().top < vh * 0.45) i = k;
		section = i;
	}

	const schedule = () => (raf ||= requestAnimationFrame(measure));

	onMount(() => {
		secEls = [...document.querySelectorAll('[data-sec]')];
		measure();
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(copyTimer);
		};
	});

	function switchLang() {
		lang = lang === 'pl' ? 'en' : 'pl';
		document.documentElement.lang = lang;
		try {
			localStorage.setItem('lang', lang);
		} catch {}
	}

	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(install.join('\n'));
		} catch {
			return;
		}
		copied = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copied = false), 1800);
	}

	function peekAt(e, img) {
		if (e.pointerType !== 'mouse' || !img) return void (peek = null);
		peek = img;
		px = e.clientX;
		py = e.clientY;
	}
</script>

<svelte:head>
	<title>{t.meta.title}</title>
	<meta name="description" content={t.meta.description} />
	<link rel="canonical" href={site + '/'} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="DeanDark" />
	<meta property="og:title" content={t.meta.title} />
	<meta property="og:description" content={t.meta.description} />
	<meta property="og:url" content={site + '/'} />
	<meta property="og:image" content="https://cdn.deandark.me/DeanDarkOdznaka.png" />
	<meta property="og:locale" content={lang === 'pl' ? 'pl_PL' : 'en_US'} />
	<meta property="og:locale:alternate" content={lang === 'pl' ? 'en_US' : 'pl_PL'} />
	<meta name="twitter:card" content="summary" />
	{@html card}
</svelte:head>

<svelte:window onscroll={schedule} onresize={schedule} onkeydown={(e) => e.key === 'Escape' && (menu = false)} />

{#snippet label(n, text)}
	<p class="label"><span>{n}</span>{text}</p>
{/snippet}

<a class="skip" href="#main">{t.skip}</a>

<BlackHole {hero} {finale} lensed={t.horizon.lensed} bind:ok />

<header class="top" class:solid={hero > 0.85 || menu}>
	<a class="brand" href="#top" onclick={() => (menu = false)}>
		<Logo size={26} />
		<span>DeanDark</span>
	</a>
	<p class="hud" class:show={hero > 0.6} aria-hidden="true">
		<b>{String(section).padStart(2, '0')} / 09</b>
		{secs[section][1]}
		<i>{t.hud.distance}</i>
		<b>{r.toFixed(2)} rₛ</b>
		<i>{t.hud.dilation}</i>
		<b>×{dilation}</b>
	</p>
	<nav class="nav" aria-label="DeanDark">
		<ul>
			{#each Object.entries(t.nav) as [id, text] (id)}
				<li><a href="#{id}" aria-current={secs[section][0] === id ? 'location' : undefined}>{text}</a></li>
			{/each}
		</ul>
	</nav>
	<button class="lang" type="button" aria-label={t.langLabel} onclick={switchLang}>
		<span class:on={lang === 'en'}>EN</span>
		<span class:on={lang === 'pl'}>PL</span>
	</button>
	<button class="burger" type="button" aria-expanded={menu} aria-controls="menu" onclick={() => (menu = !menu)}>
		{menu ? t.close : t.menu}
	</button>
</header>

{#if menu}
	<nav id="menu" class="menu" aria-label="DeanDark" transition:fade={{ duration: 180 }}>
		<ol>
			{#each Object.entries(t.nav) as [id, text], i (id)}
				<li style:--i={i}>
					<a href="#{id}" onclick={() => (menu = false)}><span>0{i + 1}</span>{text}</a>
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<main id="main" inert={menu}>
	<section id="top" class="hero" class:flat={!ok} data-sec>
		<p class="kicker">{t.hero.kicker}</p>
		<h1 class:gl={ok}>DeanDark</h1>
		<div class="hero-foot">
			<div>
				<p class="lead">{t.hero.lead}</p>
				<a class="cue" href="#signature">{t.hero.cue}</a>
			</div>
			{#if ok}<p class="note">{t.hero.note}</p>{/if}
		</div>
	</section>

	<section id="signature" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('01', t.signature.label)}
			<h2>{t.signature.title}</h2>
		</header>
		<div class="sig">
			<div class="card" data-reveal {@attach reveal}>
				<div class="card-top">
					<Logo size={44} />
					<span>50.26°N<br />19.02°E</span>
				</div>
				<dl>
					{#each t.signature.card as [k, v] (k)}
						<div><dt>{k}</dt><dd>{v}</dd></div>
					{/each}
				</dl>
			</div>
			<div class="prose">
				{#each t.signature.body as p, i (i)}
					<p data-reveal style:--i={i} {@attach reveal}>{p}</p>
				{/each}
			</div>
		</div>

		<h3 class="minor" data-reveal {@attach reveal}>{t.signature.fieldsLabel}</h3>
		<ul class="fields">
			{#each t.signature.fields as [name, text], i (name)}
				<li data-reveal style:--i={i} {@attach reveal}>
					<span class="well" aria-hidden="true"></span>
					<h4>{name}</h4>
					<p>{text}</p>
				</li>
			{/each}
		</ul>

		<ul class="stats">
			{#each t.signature.stats as [n, text], i (text)}
				<li data-reveal style:--i={i} {@attach reveal}><b>{n}</b><span>{text}</span></li>
			{/each}
		</ul>
	</section>

	<section id="now" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('02', t.now.label)}
			<h2>{t.now.title}</h2>
			<p class="live"><i></i>{t.now.live}</p>
		</header>
		<ol class="now">
			{#each t.now.items as [name, text], i (name)}
				<li data-reveal style:--i={i} {@attach reveal}>
					<span>0{i + 1}</span>
					<h3>{name}</h3>
					<p>{text}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section id="system" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('03', t.system.label)}
			<h2>{t.system.title}</h2>
			<p class="sub">{t.system.sub}</p>
		</header>
		<div class="system">
			<div class="orbit-box"><Orbit /></div>
			<div class="rings">
				{#each stack as items, k (k)}
					<div data-reveal style:--i={k} {@attach reveal}>
						<h3><i style:--k={k}></i>{t.system.rings[k]}</h3>
						<ul class="tags">
							{#each items as item (item)}<li>{item}</li>{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="unisic" class="sec wrap product" data-sec>
		<header class="prod" data-reveal {@attach reveal}>
			<img src="/images/unisic.svg" alt="" width="72" height="72" />
			<div>
				{@render label('04', t.unisic.label)}
				<h2>Unisic</h2>
				<p class="meta">{t.unisic.meta}</p>
			</div>
		</header>
		<p class="tagline" data-reveal {@attach reveal}>{t.unisic.tagline}</p>
		<p class="body" data-reveal {@attach reveal}>{t.unisic.body}</p>

		<div class="demo-box" data-reveal {@attach reveal}>
			<CaptureDemo t={t.unisic.demo} />
		</div>

		<ul class="features">
			{#each t.unisic.features as [name, text], i (name)}
				<li data-reveal style:--i={i % 3} {@attach reveal}>
					<h3>{name}</h3>
					<p>{text}</p>
				</li>
			{/each}
		</ul>

		<div class="install" data-reveal {@attach reveal}>
			<div class="install-head">
				<h3>{t.unisic.install}</h3>
				<span>{t.unisic.installNote}</span>
			</div>
			<div class="shell">
				<pre><code>{#each install as line (line)}<span>{line}</span>{/each}</code></pre>
				<button type="button" onclick={copyInstall}>{copied ? t.unisic.copied : t.unisic.copy}</button>
			</div>
			<p class="tech">{t.unisic.tech}</p>
			<p class="links">
				<a class="btn primary" href={links.unisic}>{t.unisic.site}</a>
				<a class="btn" href={links.unisicSource}>{t.unisic.source}</a>
			</p>
		</div>

		<h3 class="minor" data-reveal {@attach reveal}>{t.unisic.galleryLabel}</h3>
		<ul class="film">
			{#each gallery as g, i (g.src)}
				<li>
					<figure>
						<img src={g.src} width={g.w} height={g.h} alt={t.unisic.gallery[i]} loading="lazy" decoding="async" />
						<figcaption><span>{String(i + 1).padStart(2, '0')}</span>{t.unisic.gallery[i]}</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
	</section>

	<section id="tuni" class="sec wrap product" data-sec>
		<header class="prod" data-reveal {@attach reveal}>
			<img src="/images/tuni.svg" alt="" width="72" height="72" />
			<div>
				{@render label('05', t.tuni.label)}
				<h2>Tuni</h2>
				<p class="meta">{t.tuni.meta}</p>
			</div>
		</header>
		<p class="tagline" data-reveal {@attach reveal}>{t.tuni.tagline}</p>
		<p class="body" data-reveal {@attach reveal}>{t.tuni.body}</p>

		<figure class="shot" data-reveal {@attach reveal}>
			<img src="/images/tuni.webp" width="1400" height="873" alt={t.tuni.alt} loading="lazy" decoding="async" />
		</figure>

		<div class="tuni">
			<ul class="ticks">
				{#each t.tuni.features as f, i (i)}
					<li data-reveal style:--i={i % 3} {@attach reveal}>{f}</li>
				{/each}
			</ul>
			<figure class="bench" data-reveal {@attach reveal}>
				<figcaption>
					<h3>{t.tuni.benchTitle}</h3>
					<span>{t.tuni.benchUnit}</span>
				</figcaption>
				<ul>
					{#each bench as b (b.name)}
						<li class:me={b.name === 'tuni'}>
							<span class="who">{b.name}<small>{b.engine}</small></span>
							<span class="track"><i style:--v={b.mibs / fastest}></i></span>
							<b>{b.mibs.toFixed(1)}</b>
						</li>
					{/each}
				</ul>
				<p>{t.tuni.benchNote}</p>
			</figure>
		</div>

		<div class="tuni-foot" data-reveal {@attach reveal}>
			<p class="credit">{t.tuni.credit}</p>
			<p class="links">
				<a class="btn primary" href={links.tuni}>{t.tuni.site}</a>
				<a class="btn" href={links.tuniSource}>{t.tuni.source}</a>
			</p>
		</div>

		<div class="moons">
			<h3 class="minor" data-reveal {@attach reveal}>{t.moons.label}</h3>
			<ul>
				{#each moons as m, i (m.name)}
					<li data-reveal style:--i={i} {@attach reveal}>
						<a href={m.href}>
							<span class="moon" aria-hidden="true"></span>
							<b>{m.name}</b>
							<small>{m.tags}</small>
							<span class="desc">{t.moons.items[i]}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="belt" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('06', t.belt.label)}
			<h2>{t.belt.title}</h2>
			<p class="sub">{t.belt.sub}</p>
		</header>
		<ul class="belt" onpointerleave={() => (peek = null)}>
			{#each belt as b, i (b.name)}
				<li data-reveal style:--i={i % 3} {@attach reveal}>
					<a href={b.href} onpointermove={(e) => peekAt(e, b.img)}>
						<span class="yr">{b.year}</span>
						<span class="nm">{b.name}</span>
						<span class="ds">{t.belt.items[i]}</span>
						<span class="tg">{b.tags}</span>
					</a>
				</li>
			{/each}
		</ul>
		{#if peek}
			<img
				class="peek"
				src={peek}
				alt=""
				width="1200"
				height="583"
				style:transform="translate({px}px, {py}px)"
				transition:fade={{ duration: 150 }}
			/>
		{/if}
	</section>

	<section id="station" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('07', t.station.label)}
			<h2>{t.station.title}</h2>
		</header>
		<div class="station">
			<div class="panel" data-reveal {@attach reveal}>
				<h3>{t.station.setupLabel}</h3>
				<dl>
					{#each setup as [k, v] (k)}
						<div><dt>{k}</dt><dd>{v}</dd></div>
					{/each}
				</dl>
			</div>
			<div class="panel" data-reveal style:--i={1} {@attach reveal}>
				<h3>{t.station.offLabel}</h3>
				<p>{t.station.off}</p>
				<ul class="tags">
					{#each games as g (g)}<li>{g}</li>{/each}
				</ul>
				<a class="steam" href={links.steam}>
					<span>{t.station.level}</span>
					<b>{steam.level}</b>
					<span>{t.station.steam}</span>
				</a>
			</div>
		</div>
	</section>

	<section id="trajectory" class="sec wrap" data-sec>
		<header class="head" data-reveal {@attach reveal}>
			{@render label('08', t.trajectory.label)}
			<h2>{t.trajectory.title}</h2>
		</header>
		<ol class="traj">
			{#each t.trajectory.items as [tag, name, text] (tag)}
				<li data-reveal {@attach reveal}>
					<span class="t">{tag}</span>
					<h3>{name}</h3>
					<p>{text}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section id="horizon" class="horizon" bind:this={horizonEl} data-sec>
		<div class="wrap horizon-in">
			{@render label('09', t.horizon.label)}
			<h2>{t.horizon.title}</h2>
			<p class="sub">{t.horizon.body}</p>
			<ul class="channels">
				{#each channels as c (c.href)}
					<li><a href={c.href}><b>{c.label}</b><span>{c.handle}</span></a></li>
				{/each}
			</ul>
		</div>
		<footer class="foot wrap">
			<span>© {year} DeanDark</span>
			<span>{t.horizon.footer}</span>
		</footer>
	</section>
</main>

<style>
	/* Chrome */

	.skip {
		position: fixed;
		left: 16px;
		top: -80px;
		z-index: 12;
		padding: 10px 14px;
		border-radius: 10px;
		background: var(--ink);
		color: var(--bg);
		font-weight: 600;
		text-decoration: none;
	}

	.skip:focus {
		top: 12px;
	}

	.top {
		position: fixed;
		inset: 0 0 auto;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 28px;
		height: 64px;
		padding-inline: var(--gutter);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}

	.top.solid {
		background: rgba(5, 4, 10, 0.9);
		border-color: var(--line);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		font: 600 1.1rem/1 var(--font-display);
		letter-spacing: 0.01em;
	}

	.nav ul {
		display: flex;
		gap: 4px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.nav a {
		display: block;
		padding: 8px 12px;
		border-radius: 999px;
		font: 500 0.8rem/1 var(--font-mono);
		color: var(--ink-2);
		text-decoration: none;
		transition:
			color 0.2s,
			background-color 0.2s;
	}

	.nav a:hover {
		color: var(--ink);
	}

	.nav a[aria-current] {
		color: var(--ink);
		background: rgba(174, 49, 246, 0.18);
	}

	.lang {
		display: flex;
		padding: 3px;
		color: inherit;
		background: none;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		font: 600 0.72rem/1 var(--font-mono);
		cursor: pointer;
	}

	.lang span {
		padding: 6px 9px;
		border-radius: 999px;
		color: var(--ink-3);
		transition:
			color 0.2s,
			background-color 0.2s;
	}

	.lang span.on {
		color: var(--bg);
		background: var(--ink);
	}

	.lang:hover span:not(.on) {
		color: var(--ink);
	}

	.burger {
		display: none;
		font: 500 0.8rem/1 var(--font-mono);
		color: var(--ink);
		background: none;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		padding: 9px 14px;
		cursor: pointer;
	}

	.menu {
		position: fixed;
		inset: 0;
		z-index: 9;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 104px var(--gutter) 40px;
		background: rgba(5, 4, 10, 0.97);
	}

	.menu ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.menu a {
		display: flex;
		align-items: baseline;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid var(--line);
		text-decoration: none;
		font: 600 clamp(2rem, 9vw, 3rem) / 1.1 var(--font-display);
		animation: drop 0.4s var(--ease) both;
		animation-delay: calc(var(--i) * 40ms);
	}

	.menu a span {
		font: 500 0.8rem/1 var(--font-mono);
		color: var(--accent-ink);
	}

	@keyframes drop {
		from {
			opacity: 0;
			translate: 0 -10px;
		}
	}

	/* Lives in the header so it never sits on top of content. */
	.hud {
		display: flex;
		align-items: baseline;
		gap: 6px;
		margin: 0 auto 0 0;
		font: 0.7rem/1 var(--font-mono);
		color: var(--ink-3);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
		opacity: 0;
		transition: opacity 0.4s;
	}

	.hud.show {
		opacity: 1;
	}

	.hud i {
		margin-left: 10px;
		font-style: normal;
	}

	.hud b {
		font-weight: 500;
		color: var(--ink);
	}

	main {
		position: relative;
		z-index: 1;
	}

	/* Shared */

	.label {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 0 0 20px;
		font: 500 0.76rem/1 var(--font-mono);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.label span {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--accent-ink);
	}

	.label span::after {
		content: '';
		width: 32px;
		height: 1px;
		background: var(--accent);
	}

	h2 {
		margin: 0;
		max-width: 18ch;
		font: 600 clamp(2.2rem, 5.6vw, 4.6rem) / 1.02 var(--font-display);
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	h3,
	h4 {
		margin: 0;
	}

	.sec {
		padding-block: clamp(96px, 13vw, 168px);
	}

	.head {
		margin-bottom: clamp(40px, 6vw, 72px);
	}

	.sub {
		max-width: 52ch;
		margin: 20px 0 0;
		color: var(--ink-2);
		font-size: 1.08rem;
	}

	.minor {
		margin: clamp(56px, 8vw, 96px) 0 24px;
		font: 500 0.76rem/1 var(--font-mono);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags li {
		padding: 6px 12px;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		font: 500 0.8rem/1.2 var(--font-mono);
		color: var(--ink-2);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 12px 18px;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		font-weight: 600;
		font-size: 0.92rem;
		text-decoration: none;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.btn:hover {
		border-color: var(--accent-ink);
	}

	.btn.primary {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--bg);
	}

	.btn.primary:hover {
		background: var(--accent-ink);
		border-color: var(--accent-ink);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 0;
	}

	/* 00 Hero */

	.hero {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100svh;
		padding: 96px var(--gutter) clamp(28px, 5vh, 48px);
	}

	.kicker {
		grid-row: 1;
		margin: 0;
		font: 500 0.78rem/1 var(--font-mono);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	h1 {
		grid-row: 2;
		align-self: center;
		justify-self: center;
		margin: 0;
		font: 600 clamp(3.4rem, 14vw, 11rem) / 0.9 var(--font-display);
		letter-spacing: 0.02em;
		text-transform: uppercase;
		text-shadow: 0 0 40px rgba(174, 49, 246, 0.6);
	}

	/* The canvas draws the name; keep it for screen readers and no-JS. */
	:global(.js) h1.gl {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.hero.flat {
		background: radial-gradient(
			circle at 50% 50%,
			var(--bg) 0 13vmin,
			rgba(255, 226, 190, 0.9) 13.6vmin,
			rgba(174, 49, 246, 0.45) 17vmin,
			transparent 38vmin
		);
	}

	.hero-foot {
		grid-row: 3;
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 24px 48px;
	}

	.lead {
		max-width: 38ch;
		margin: 0 0 24px;
		font-size: clamp(1.05rem, 1.5vw, 1.25rem);
		line-height: 1.55;
		text-shadow: 0 1px 24px var(--bg), 0 0 8px var(--bg);
	}

	.cue {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		font: 500 0.78rem/1 var(--font-mono);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ink-2);
	}

	.cue::before {
		content: '';
		width: 1px;
		height: 40px;
		background: linear-gradient(var(--accent-ink), transparent);
		animation: fall 2.4s var(--ease) infinite;
		transform-origin: top;
	}

	.cue:hover {
		color: var(--ink);
	}

	@keyframes fall {
		from {
			scale: 1 0;
		}
		60% {
			scale: 1 1;
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.note {
		max-width: 34ch;
		margin: 0;
		font: 0.72rem/1.55 var(--font-mono);
		color: var(--ink-3);
		text-align: right;
	}

	/* 01 Signature */

	.sig {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: clamp(32px, 6vw, 88px);
		align-items: start;
	}

	.card {
		position: relative;
		padding: 24px;
		border: 1px solid var(--line-2);
		border-radius: var(--radius);
		background: var(--panel);
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20px;
		margin-bottom: 8px;
		border-bottom: 1px dashed var(--line-2);
		color: var(--ink);
	}

	.card-top span {
		font: 0.7rem/1.4 var(--font-mono);
		color: var(--ink-3);
		text-align: right;
	}

	.card dl {
		margin: 0;
	}

	.card dl div {
		display: grid;
		grid-template-columns: 9.5em 1fr;
		gap: 12px;
		padding: 11px 0;
		border-bottom: 1px solid var(--line);
	}

	.card dl div:last-child {
		border-bottom: 0;
	}

	.card dt {
		font: 0.72rem/1.6 var(--font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	.card dd {
		margin: 0;
		font-size: 0.95rem;
	}

	.prose p {
		margin: 0 0 1.2em;
		max-width: 60ch;
		color: var(--ink-2);
		font-size: 1.08rem;
	}

	.prose p:first-child {
		color: var(--ink);
		font-size: clamp(1.2rem, 1.8vw, 1.45rem);
		line-height: 1.5;
	}

	.fields {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.fields li {
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--panel);
	}

	.well {
		display: block;
		width: 56px;
		aspect-ratio: 1;
		margin-bottom: 20px;
		border-radius: 50%;
		background:
			radial-gradient(circle, var(--bg) 0 22%, var(--accent-ink) 25%, transparent 32%),
			repeating-radial-gradient(circle, transparent 0 5px, rgba(200, 172, 214, 0.28) 5px 6px);
		mask: radial-gradient(circle, #000 55%, transparent 72%);
	}

	.fields h4 {
		font: 600 1.25rem/1.2 var(--font-display);
		margin-bottom: 8px;
	}

	.fields p {
		margin: 0;
		color: var(--ink-2);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: clamp(48px, 7vw, 88px) 0 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--line);
	}

	.stats li {
		display: grid;
		gap: 6px;
		padding: 28px 20px 0 0;
	}

	.stats b {
		font: 600 clamp(2.6rem, 6vw, 4.6rem) / 1 var(--font-display);
	}

	.stats li:last-child b {
		color: var(--accent-ink);
	}

	.stats span {
		color: var(--ink-2);
		font-size: 0.92rem;
	}

	/* 02 Now */

	.head:has(.live) {
		position: relative;
	}

	.live {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin: 20px 0 0;
		padding: 6px 12px;
		border: 1px solid rgba(174, 49, 246, 0.5);
		border-radius: 999px;
		font: 500 0.72rem/1 var(--font-mono);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.live i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 rgba(174, 49, 246, 0.6);
		animation: ping 2s ease-out infinite;
	}

	@keyframes ping {
		to {
			box-shadow: 0 0 0 10px rgba(174, 49, 246, 0);
		}
	}

	.now {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.now li {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--panel);
		transition: border-color 0.3s;
	}

	.now li:hover {
		border-color: rgba(174, 49, 246, 0.55);
	}

	.now span {
		font: 0.72rem/1 var(--font-mono);
		color: var(--accent-ink);
	}

	.now h3 {
		font: 600 1.35rem/1.15 var(--font-display);
	}

	.now p {
		margin: 0;
		color: var(--ink-2);
		font-size: 0.96rem;
	}

	/* 03 System */

	.system {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: clamp(32px, 5vw, 72px);
		align-items: center;
	}

	.orbit-box {
		padding: 24px 56px;
	}

	.rings {
		display: grid;
		gap: 28px;
	}

	.rings h3 {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
		font: 500 0.76rem/1 var(--font-mono);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.rings h3 i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1px solid rgba(174, 49, 246, calc(0.95 - var(--k) * 0.2));
		box-shadow: 0 0 0 calc(2px + var(--k) * 2px) rgba(174, 49, 246, 0.1);
	}

	/* 04-05 Products */

	.prod {
		display: flex;
		align-items: center;
		gap: clamp(20px, 3vw, 32px);
		margin-bottom: 32px;
	}

	.prod img {
		width: clamp(64px, 9vw, 104px);
		height: auto;
		filter: drop-shadow(0 12px 32px rgba(174, 49, 246, 0.35));
	}

	.prod .label {
		margin-bottom: 12px;
	}

	.prod h2 {
		font-size: clamp(3rem, 9vw, 7rem);
		line-height: 0.95;
	}

	.meta {
		margin: 10px 0 0;
		font: 0.78rem/1 var(--font-mono);
		color: var(--ink-3);
	}

	.tagline {
		max-width: 24ch;
		margin: 0 0 24px;
		font: 500 clamp(1.5rem, 3vw, 2.3rem) / 1.2 var(--font-display);
		text-wrap: balance;
	}

	.body {
		max-width: 64ch;
		margin: 0 0 clamp(48px, 7vw, 80px);
		color: var(--ink-2);
		font-size: 1.08rem;
	}

	.demo-box {
		margin-bottom: clamp(48px, 7vw, 80px);
	}

	.features {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		margin: 0 0 clamp(48px, 7vw, 80px);
		padding: 0;
		list-style: none;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--line);
		overflow: hidden;
	}

	.features li {
		padding: 28px 24px;
		background: var(--panel-solid);
	}

	.features h3 {
		margin-bottom: 8px;
		font: 600 1.15rem/1.25 var(--font-display);
	}

	.features p {
		margin: 0;
		color: var(--ink-2);
		font-size: 0.95rem;
	}

	.install {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 16px;
		padding: clamp(20px, 3vw, 32px);
		border: 1px solid var(--line-2);
		border-radius: var(--radius);
		background: linear-gradient(135deg, rgba(67, 61, 139, 0.35), rgba(23, 21, 59, 0.5));
	}

	.install-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px 16px;
	}

	.install-head h3 {
		font: 600 1.3rem/1.2 var(--font-display);
	}

	.install-head span {
		font: 0.78rem/1.5 var(--font-mono);
		color: var(--ink-3);
	}

	.shell {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 16px 16px 20px;
		border-radius: 12px;
		background: rgba(5, 4, 10, 0.85);
		border: 1px solid var(--line);
	}

	.shell pre {
		flex: 1;
		min-width: 0;
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		font: 0.88rem/1.7 var(--font-mono);
	}

	.shell code span {
		display: block;
	}

	.shell code span::before {
		content: '$ ';
		color: var(--accent-ink);
		user-select: none;
	}

	.shell button {
		flex: none;
		align-self: start;
		font: 500 0.78rem/1 var(--font-mono);
		color: var(--ink);
		background: rgba(200, 172, 214, 0.1);
		border: 1px solid var(--line-2);
		border-radius: 8px;
		padding: 8px 12px;
		cursor: pointer;
	}

	.shell button:hover {
		background: rgba(174, 49, 246, 0.25);
	}

	.tech {
		margin: 0;
		font: 0.8rem/1.6 var(--font-mono);
		color: var(--ink-3);
	}

	.film {
		display: flex;
		gap: 16px;
		margin: 0 calc(-1 * var(--gutter));
		padding: 0 var(--gutter) 16px;
		list-style: none;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: var(--gutter);
		scrollbar-width: thin;
		scrollbar-color: var(--line-2) transparent;
	}

	.film li {
		flex: none;
		scroll-snap-align: start;
	}

	.film figure {
		margin: 0;
	}

	.film img {
		height: clamp(220px, 32vw, 400px);
		width: auto;
		border-radius: 12px;
		border: 1px solid var(--line);
		background: var(--panel-solid);
	}

	.film figcaption {
		display: flex;
		gap: 10px;
		margin-top: 12px;
		font-size: 0.88rem;
		color: var(--ink-2);
	}

	.film figcaption span {
		font: 0.75rem/1.5 var(--font-mono);
		color: var(--accent-ink);
	}

	.shot {
		margin: 0 0 clamp(40px, 6vw, 72px);
	}

	.shot img {
		width: 100%;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		box-shadow: 0 40px 120px -40px rgba(120, 50, 220, 0.5);
	}

	.tuni {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: clamp(32px, 5vw, 64px);
		align-items: start;
	}

	.ticks {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px 32px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ticks li {
		position: relative;
		padding-top: 18px;
		border-top: 1px solid var(--line-2);
		color: var(--ink-2);
		font-size: 0.97rem;
	}

	.ticks li::before {
		content: '';
		position: absolute;
		left: 0;
		top: -1px;
		width: 28px;
		height: 1px;
		background: var(--accent);
	}

	.bench {
		margin: 0;
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--panel);
	}

	.bench figcaption {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.bench h3 {
		font: 600 1.2rem/1 var(--font-display);
	}

	.bench figcaption span,
	.bench > p {
		font: 0.74rem/1.5 var(--font-mono);
		color: var(--ink-3);
	}

	.bench ul {
		display: grid;
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.bench li {
		display: grid;
		grid-template-columns: 7.5em 1fr 3.5em;
		align-items: center;
		gap: 12px;
	}

	.who {
		display: grid;
		font: 500 0.88rem/1.2 var(--font-mono);
		color: var(--ink-2);
	}

	.who small {
		font-size: 0.66rem;
		color: var(--ink-3);
	}

	.track i {
		display: block;
		width: calc(var(--v) * 100%);
		height: 10px;
		border-radius: 0 4px 4px 0;
		background: rgba(200, 172, 214, 0.32);
	}

	.bench b {
		font: 500 0.88rem/1 var(--font-mono);
		font-variant-numeric: tabular-nums;
		color: var(--ink-2);
		text-align: right;
	}

	.bench li.me .who,
	.bench li.me b {
		color: var(--ink);
		font-weight: 600;
	}

	.bench li.me .track i {
		background: var(--accent);
	}

	.bench > p {
		margin: 20px 0 0;
	}

	.tuni-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px 32px;
		margin-top: clamp(40px, 6vw, 64px);
	}

	.credit {
		margin: 0;
		color: var(--ink-2);
		font-style: italic;
	}

	.moons ul {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.moons a {
		display: grid;
		align-content: start;
		gap: 6px;
		height: 100%;
		padding: 24px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--panel);
		text-decoration: none;
		transition: border-color 0.3s;
	}

	.moons a:hover {
		border-color: rgba(174, 49, 246, 0.55);
	}

	.moon {
		width: 22px;
		aspect-ratio: 1;
		margin-bottom: 12px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, var(--lilac), #433d8b 60%, #17153b);
		box-shadow: 0 0 0 6px rgba(200, 172, 214, 0.06);
	}

	.moons b {
		font: 600 1.2rem/1.2 var(--font-display);
	}

	.moons small {
		font: 0.74rem/1.4 var(--font-mono);
		color: var(--accent-ink);
	}

	.desc {
		margin-top: 6px;
		color: var(--ink-2);
		font-size: 0.94rem;
	}

	/* 06 Belt */

	.belt {
		margin: 0;
		padding: 0;
		list-style: none;
		border-bottom: 1px solid var(--line);
	}

	.belt a {
		display: grid;
		grid-template-columns: 4.5em minmax(0, 13em) minmax(0, 1fr) minmax(0, 12em);
		align-items: baseline;
		gap: 24px;
		padding: 26px 0;
		border-top: 1px solid var(--line);
		text-decoration: none;
	}

	.yr,
	.tg {
		font: 0.76rem/1.4 var(--font-mono);
		color: var(--ink-3);
	}

	.tg {
		text-align: right;
	}

	.nm {
		font: 600 clamp(1.4rem, 2.4vw, 1.9rem) / 1.1 var(--font-display);
		transition:
			color 0.25s,
			translate 0.35s var(--ease);
	}

	.ds {
		color: var(--ink-2);
		font-size: 0.97rem;
	}

	.belt a:hover .nm,
	.belt a:focus-visible .nm {
		color: var(--accent-ink);
		translate: 8px 0;
	}

	.peek {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 4;
		width: 320px;
		height: auto;
		margin: 20px 0 0 20px;
		border-radius: 10px;
		border: 1px solid var(--line-2);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
		pointer-events: none;
	}

	/* 07 Station */

	.station {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	.panel {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: clamp(20px, 3vw, 32px);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--panel);
	}

	.panel h3 {
		font: 500 0.76rem/1 var(--font-mono);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-2);
	}

	.panel dl {
		margin: 0;
	}

	.panel dl div {
		display: grid;
		grid-template-columns: 6em 1fr;
		gap: 16px;
		padding: 12px 0;
		border-bottom: 1px solid var(--line);
	}

	.panel dl div:last-child {
		border-bottom: 0;
	}

	.panel dt {
		font: 0.76rem/1.6 var(--font-mono);
		color: var(--ink-3);
	}

	.panel dd {
		margin: 0;
	}

	.panel > p {
		margin: 0;
		color: var(--ink-2);
	}

	.steam {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin-top: auto;
		padding-top: 16px;
		border-top: 1px dashed var(--line-2);
		text-decoration: none;
		font: 0.8rem/1 var(--font-mono);
		color: var(--ink-3);
	}

	.steam b {
		font: 600 2.4rem/1 var(--font-display);
		color: var(--ink);
		transition: color 0.2s;
	}

	.steam:hover b {
		color: var(--accent-ink);
	}

	/* 08 Trajectory */

	.traj {
		position: relative;
		margin: 0;
		padding: 0 0 0 36px;
		list-style: none;
	}

	.traj::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 8px;
		bottom: 8px;
		width: 1px;
		background: linear-gradient(var(--line-2), var(--accent) 85%, transparent);
	}

	.traj li {
		position: relative;
		display: grid;
		grid-template-columns: 7em minmax(0, 14em) minmax(0, 1fr);
		gap: 8px 32px;
		align-items: baseline;
		padding: 0 0 clamp(32px, 5vw, 48px);
	}

	.traj li::before {
		content: '';
		position: absolute;
		left: -36px;
		top: 0.45em;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--bg);
		border: 1px solid var(--accent-ink);
	}

	.traj li:last-child::before {
		background: var(--accent);
		box-shadow: 0 0 16px var(--accent);
	}

	.t {
		font: 600 0.82rem/1.6 var(--font-mono);
		color: var(--accent-ink);
	}

	.traj h3 {
		font: 600 1.3rem/1.25 var(--font-display);
	}

	.traj p {
		margin: 0;
		max-width: 56ch;
		color: var(--ink-2);
	}

	/* 09 Horizon */

	.horizon {
		position: relative;
		display: grid;
		grid-template-rows: 1fr auto;
		min-height: 135svh;
	}

	.horizon-in {
		align-self: end;
		padding-top: 48px;
		padding-bottom: clamp(48px, 7vw, 80px);
	}

	.horizon::before {
		content: '';
		position: absolute;
		inset: 45% 0 0;
		background: linear-gradient(transparent, rgba(5, 4, 10, 0.88) 45%);
		pointer-events: none;
	}

	.horizon > * {
		position: relative;
	}

	.horizon h2 {
		font-size: clamp(2.6rem, 7vw, 6rem);
		max-width: 14ch;
	}

	.channels {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
		margin: clamp(32px, 5vw, 56px) 0 0;
		padding: 0;
		list-style: none;
	}

	.channels a {
		display: grid;
		gap: 8px;
		height: 100%;
		padding: 22px;
		border: 1px solid var(--line-2);
		border-radius: var(--radius);
		background: rgba(5, 4, 10, 0.7);
		text-decoration: none;
		transition:
			border-color 0.25s,
			background-color 0.25s;
	}

	.channels a:hover {
		border-color: var(--accent-ink);
		background: rgba(174, 49, 246, 0.16);
	}

	.channels b {
		font: 600 1.2rem/1.2 var(--font-display);
	}

	.channels span {
		font: 0.76rem/1.4 var(--font-mono);
		color: var(--ink-3);
		overflow-wrap: anywhere;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
		padding-block: 24px;
		border-top: 1px solid var(--line);
		font: 0.74rem/1.5 var(--font-mono);
		color: var(--ink-3);
	}

	/* Layout breakpoints */

	@media (max-width: 1360px) {
		.hud i {
			display: none;
		}
	}

	@media (max-width: 1200px) {
		.hud {
			display: none;
		}

		.brand {
			margin-right: auto;
		}
	}

	@media (max-width: 1080px) {
		.now {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.system,
		.tuni {
			grid-template-columns: minmax(0, 1fr);
		}

		.channels {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.belt a {
			grid-template-columns: 4.5em minmax(0, 11em) minmax(0, 1fr);
		}

		.tg {
			display: none;
		}
	}

	@media (max-width: 900px) {
		.nav {
			display: none;
		}

		.burger {
			display: block;
		}

		.top {
			gap: 12px;
		}

		.sig,
		.fields,
		.features,
		.moons ul,
		.station {
			grid-template-columns: minmax(0, 1fr);
		}

		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.orbit-box {
			display: none;
		}

		.traj li {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 640px) {
		.now,
		.ticks,
		.channels {
			grid-template-columns: minmax(0, 1fr);
		}

		.belt a {
			grid-template-columns: minmax(0, 1fr);
			gap: 6px;
			padding: 20px 0;
		}

		.note {
			text-align: left;
		}

		.card dl div {
			grid-template-columns: minmax(0, 1fr);
			gap: 2px;
		}

		/* Stacked channels push the heading up into the bright ring. */
		.horizon::before {
			inset: 0;
			background: linear-gradient(transparent 20%, rgba(5, 4, 10, 0.85) 40%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cue::before,
		.live i,
		.menu a {
			animation: none;
		}
	}
</style>
