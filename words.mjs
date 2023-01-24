import fs from 'node:fs';

// words taken from:
// https://github.com/first20hours/google-10000-english
const words = await fetch(
	'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt'
)
	.then((res) => res.text())
	.then((val) => val.split('\n'))
	.then((val) => val.filter((word) => word.length >= 5 && word.length <= 7));

const filter = (n) => words.filter((word) => word.length === n);

const letters_5 = filter(5);
const letters_6 = filter(6);
const letters_7 = filter(7);

console.group('words by length:');
console.log(`5-letters: ${letters_5.length} words`);
console.log(`6-letters: ${letters_6.length} words`);
console.log(`7-letters: ${letters_7.length} words`);
console.groupEnd();

if (!fs.existsSync('src/assets')) {
	fs.mkdirSync('src/assets', { recursive: true });
}

fs.writeFileSync('src/assets/letters_5.json', JSON.stringify(letters_5));
fs.writeFileSync('src/assets/letters_6.json', JSON.stringify(letters_6));
fs.writeFileSync('src/assets/letters_7.json', JSON.stringify(letters_7));
