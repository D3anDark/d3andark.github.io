<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import BlackHole from '#lib/BlackHole.svelte';
	import Logo from '#lib/Logo.svelte';

	const copy = {
		en: {
			kicker: 'Error 404 · signal lost',
			title: 'This address fell past the event horizon.',
			body: 'Nothing comes back from in there. Not light, not this page.',
			home: 'Back to orbit'
		},
		pl: {
			kicker: 'Błąd 404 · utracono sygnał',
			title: 'Ten adres wpadł za horyzont zdarzeń.',
			body: 'Stamtąd nic nie wraca. Ani światło, ani ta strona.',
			home: 'Wróć na orbitę'
		}
	};
	const t = copy[browser && document.documentElement.lang === 'pl' ? 'pl' : 'en'];

	let ok = $state(true);
	let live = $state(false);
	let lost = $state('');

	onMount(() => {
		live = true;
		if (location.pathname !== '/404') lost = 'deandark.me' + decodeURI(location.pathname);
	});
</script>

<svelte:head>
	<title>404 · DeanDark</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- The 404 sits right behind the hole, so all that reaches you is its Einstein ring. -->
<BlackHole title="404" lensed="404" bind:ok />

<main class:gl={live && ok}>
	<a class="brand" href="/" data-sveltekit-reload><Logo size={26} /><span>DeanDark</span></a>
	<div class="hole" aria-hidden="true"><Logo size={180} /></div>
	<div class="text">
		<p class="kicker">{t.kicker}</p>
		<h1><span>404</span> {t.title}</h1>
		{#if lost}<p class="lost"><s>{lost}</s></p>{/if}
		<p class="body">{t.body}</p>
		<a class="home" href="/" data-sveltekit-reload>{t.home}</a>
	</div>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100svh;
		padding: 24px var(--gutter) clamp(28px, 6vh, 56px);
	}

	.brand {
		justify-self: start;
		align-self: start;
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		font: 600 1.1rem/1 var(--font-display);
		letter-spacing: 0.01em;
	}

	.hole {
		align-self: center;
		justify-self: center;
		display: grid;
		place-items: center;
		width: 300px;
		max-width: 70vw;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			transparent 0 36%,
			rgba(255, 226, 190, 0.55) 38%,
			rgba(174, 49, 246, 0.35) 46%,
			transparent 70%
		);
	}

	.hole :global(svg) {
		width: 60%;
		height: auto;
		animation: spin 40s linear infinite;
	}

	/* The canvas draws the hole and the lensed 404 instead. */
	.gl .hole {
		visibility: hidden;
	}

	@keyframes spin {
		to {
			rotate: 1turn;
		}
	}

	.text {
		display: grid;
		justify-items: start;
		gap: 12px;
		max-width: 30rem;
	}

	.kicker {
		margin: 0;
		font: 500 0.78rem/1 var(--font-mono);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent-ink);
	}

	h1 {
		margin: 0;
		font: 600 clamp(1.6rem, 4.4vw, 2.4rem) / 1.1 var(--font-display);
		text-wrap: balance;
	}

	/* Without the canvas the number itself has to carry the page. */
	h1 span {
		display: block;
		margin-bottom: 8px;
		font-size: clamp(4rem, 16vw, 8rem);
		line-height: 1;
		text-shadow: 0 0 40px rgba(174, 49, 246, 0.6);
	}

	.gl h1 span {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}

	.lost {
		max-width: 100%;
		margin: 0;
		overflow-wrap: anywhere;
		font: 0.85rem/1.5 var(--font-mono);
		color: var(--ink-3);
	}

	.body {
		margin: 0;
		color: var(--ink-2);
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.home {
		margin-top: 12px;
		padding: 12px 20px;
		border: 1px solid var(--line-2);
		border-radius: 999px;
		font: 500 0.85rem/1 var(--font-mono);
		text-decoration: none;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.home:hover {
		color: var(--bg);
		background: var(--ink);
		border-color: var(--ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.hole :global(svg) {
			animation: none;
		}
	}
</style>
