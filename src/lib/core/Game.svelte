<script lang="ts">
	import Keyboard from './Keyboard.svelte';
	import type { Letter } from './types';
	import { createEmptyBoard, maxBound, minBound } from './utils';

	export const length = 5;
	export const chances = 6;
	export let word = 'moone';

	let chancesLeft: number = chances;
	let board = createEmptyBoard(length, chances);
	$: index = maxBound(chances - chancesLeft, chances - 1);

	const handleEnter = () => {
		// TODO: check if input is a valid word
		const input = board[index].reduce((str, { ch }) => str + ch, '');
		const wordArr = Array.from(word.toUpperCase());
		const newRow = Array.from(input)
			// green letters take higher priority
			.map((ch, i): Letter => {
				if (ch === wordArr[i]) {
					wordArr[i] === '';
					return { ch, type: 'green' };
				}
				return { ch, type: null };
			})
			// then check for yellow and gray
			.map((letter): Letter => {
				if (letter.type) return letter;

				const found = wordArr.findIndex((ch) => ch === letter.ch);
				if (found !== -1) {
					wordArr[found] = '';
					return { ...letter, type: 'yellow' };
				}
				return { ...letter, type: 'gray' };
			});

		board[index] = newRow;
		chancesLeft = minBound(chancesLeft - 1);

		// TODO: check if word and input are the same to win.
		// TODO: check if chances are 0 to end.
	};
</script>

<Keyboard bind:input={board[index]} on:enter={handleEnter} />

{#each board as row}
	<div style="display: flex;">
		{#each row as letter}
			<div style={`padding: 1rem; background-color: ${letter.type || 'white'};`}>
				{letter.ch || '-'}
			</div>
		{/each}
	</div>
{/each}
