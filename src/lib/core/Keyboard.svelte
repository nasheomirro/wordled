<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Letter } from './types';

	interface KeyboardEvents {
		enter: void;
	}

	export let input: Letter[];

	$: charCount = input.reduce((num, letter) => (letter.ch ? num + 1 : num), 0);
	const dispatch = createEventDispatcher<KeyboardEvents>();

	onMount(() => {
		const alphabet = /^[a-zA-Z]$/;
		const listener = ({ key, metaKey }: KeyboardEvent) => {
			// don't listen when user is using commands
			if (metaKey) return;

			// modify letters of the current index
			if (charCount < input.length && alphabet.test(key)) {
				input[charCount] = { ch: key.toUpperCase(), type: null };
			} else if (charCount > 0 && key === 'Backspace') {
				input[charCount - 1] = { ...input[charCount], ch: '' };
			} else if (key === 'Enter' && charCount === input.length) {
				dispatch('enter');
			}
		};
		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	});
</script>
