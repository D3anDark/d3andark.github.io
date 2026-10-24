// Discord component embed: a Components V2 card that replaces the link preview.
// Discord's crawler runs no JS, so it has to sit in the prerendered <head>.
// Spec: https://docs.discord.com/developers/link-previews/component-embeds
export function embed(components) {
	const json = JSON.stringify({ component: { type: 17, accent_color: 0xae31f6, components } }).replace(/</g, '\\u003c');
	// Over 3,000 bytes Discord silently falls back to Open Graph, so fail the build instead.
	const size = new TextEncoder().encode(json).length;
	if (size > 3000) throw new Error(`Discord component embed is ${size} bytes, the limit is 3000`);
	return `<script id="discord:component-embed" type="application/json">${json}</script>`;
}
