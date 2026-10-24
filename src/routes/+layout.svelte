<script>
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	// Hydration has put the right language in place by now (see .swap in app.css).
	onMount(() => document.documentElement.classList.remove('swap'));
</script>

{@render children()}
