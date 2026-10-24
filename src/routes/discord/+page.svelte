<script>
	import { links, site } from '#lib/content.js';
	import { embed } from '#lib/embed.js';

	const card = embed([
		{ type: 12, items: [{ media: { url: site + '/images/embed.webp' } }] },
		{
			type: 9,
			components: [{ type: 10, content: `# [Horyzont Zdarzeń](${links.server})\nDeanDark's Discord server.` }],
			accessory: { type: 11, media: { url: 'https://cdn.deandark.me/DeanDarkOdznaka.png' } }
		},
		{
			type: 1,
			components: [
				{ type: 2, style: 5, url: links.server, label: 'Join the server' },
				{ type: 2, style: 5, url: site, label: 'deandark.me' }
			]
		}
	]);
</script>

<svelte:head>
	<title>Horyzont Zdarzeń · Discord</title>
	<meta http-equiv="refresh" content="0; url={links.server}" />
	<meta name="description" content="Horyzont Zdarzeń, DeanDark's Discord server." />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="DeanDark" />
	<meta property="og:title" content="Horyzont Zdarzeń · Discord" />
	<meta property="og:description" content="Horyzont Zdarzeń, DeanDark's Discord server." />
	<meta property="og:url" content="https://deandark.me/discord" />
	<meta property="og:image" content="https://cdn.deandark.me/DeanDarkOdznaka.png" />
	{@html card}
</svelte:head>

<main>
	<a href={links.server}>discord.gg/hzd</a>
</main>

<style>
	main {
		display: grid;
		place-items: center;
		min-height: 100svh;
	}

	a {
		font: 500 1rem/1 var(--font-mono);
	}
</style>
