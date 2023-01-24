import type { Letter } from './types';

export const createEmptyBoard = (length: number, chances: number): Letter[][] => {
	const board = Array.from({ length: chances }).map((): Letter[] =>
		Array.from({ length }).map(() => ({ ch: '', type: null }))
	);
	return board;
};

export const minBound = (num: number, min = 0) => (num < min ? min : num);
export const maxBound = (num: number, max: number) => (num > max ? max : num);