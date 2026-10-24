<script>
	// Decorative: the stack as rings around a core. The list beside it carries
	// the same content for everyone, so this whole figure is aria-hidden.
	import Logo from './Logo.svelte';
	import { stack } from './content.js';
	import { inview } from './inview.js';

	const RADII = [0.36, 0.54, 0.72, 0.9];
	const PERIODS = [70, 95, 130, 170];

	let on = $state(false);
</script>

<div class="orbit" class:on aria-hidden="true" {@attach inview((v) => (on = v))}>
	<div class="core"><Logo size={56} /></div>
	{#each stack as items, r (r)}
		<div class="ring" style:--r={RADII[r]} style:--t="{PERIODS[r]}s" style:--k={r} class:rev={r % 2}>
			<div class="spin">
				{#each items as item, i (item)}
					<div class="arm" style:--a="{i / items.length + r * 0.07}turn">
						<b>{item}</b>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.orbit {
		position: relative;
		width: min(100%, 680px);
		aspect-ratio: 1;
		margin-inline: auto;
	}

	.core {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		display: grid;
		place-items: center;
		width: 15%;
		aspect-ratio: 1;
		border-radius: 50%;
		color: var(--ink);
		background: radial-gradient(circle, rgba(174, 49, 246, 0.35), transparent 70%);
	}

	.ring {
		position: absolute;
		inset: calc((1 - var(--r)) * 50%);
		border-radius: 50%;
		border: 1px dashed rgba(200, 172, 214, calc(0.28 - var(--k) * 0.05));
	}

	.spin,
	.arm {
		position: absolute;
		inset: 0;
	}

	.spin {
		animation: spin var(--t) linear infinite paused;
	}

	.arm {
		rotate: var(--a);
	}

	b {
		position: absolute;
		left: 50%;
		top: 0;
		padding: 5px 10px;
		border-radius: 999px;
		white-space: nowrap;
		font: 500 0.74rem/1 var(--font-mono);
		color: var(--ink);
		background: var(--bg);
		border: 1px solid rgba(174, 49, 246, calc(0.85 - var(--k) * 0.17));
		animation: unspin var(--t) linear infinite paused;
	}

	.rev .spin,
	.rev b {
		animation-direction: reverse;
	}

	.on .spin,
	.on b {
		animation-play-state: running;
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}

	@keyframes unspin {
		from {
			transform: translate(-50%, -50%) rotate(calc(-1 * var(--a)));
		}
		to {
			transform: translate(-50%, -50%) rotate(calc(-1 * var(--a) - 1turn));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spin,
		b {
			animation-duration: 1e6s;
		}
	}
</style>
