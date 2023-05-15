const randomWords = require('random-words');
const quotes = require('../data/quotes.json');
const allWords = require('../data/allWords.json').words;
const os = require('os');
const wrap = require('ruxe');
const stripAnsi = require('strip-ansi');
const getWords = data => {
	const { gameType, words, difficulty } = data;
	let count = 400;
	if (gameType === 'Time') {
		count = 300;
	} else if (gameType === 'Words') {
		count = words;
	} else if (gameType === 'Quote') {
		// create a random number between 0 and quotes.length
		const index = Math.floor(Math.random() * quotes.length);
		// get the quote at that index
		const quote = quotes[index];
		// get the words from the quote
		return quote.text.split(' ');
	}

	let generatedWords = null;
	if (difficulty === 'Easy') {
		generatedWords = randomWords({ exactly: count, maxLength: 5 });
	} else if (difficulty === 'Medium') {
		generatedWords = randomWords({ exactly: count, maxLength: 8 });
	} else if (difficulty === 'Hard') {
		// pick 400 random words from allWords
		const randomIndexes = [];
		for (let i = 0; i < count; i++) {
			const index = Math.floor(Math.random() * allWords.length);
			randomIndexes.push(index);
		}
		const randomWordsArray = randomIndexes.map(index => allWords[index]);
		generatedWords = randomWordsArray;
		// generatedWords = randomWords({ exactly: count, maxLength: 12 });
	}
  

	return generatedWords;
};

const centerText = text => {
	// Your paragraph text
	// Get terminal width
	let terminalWidth = process.stdout.columns;

	// Wrap the text so it doesn't exceed the terminal width
	text = wrap(text, { width: 51 });

	// Split the text into lines
	let lines = text.split('\n');

	// Center each line
	let centeredLines = lines.map((line, _) => {
		let visibleLength = stripAnsi(line).length;
		let paddingLeft = Math.floor((terminalWidth - visibleLength) / 2);

		return line.padStart(paddingLeft + line.length);
	});

	// Join the lines back together
	let centeredText = centeredLines.join('\n');
	return centeredText;
};
function justifyText(text, width) {
	let words = text.split(' ');
	let line = '';
	let lines = [];

	words.forEach(word => {
		if ((line + word).length >= width) {
			lines.push(line);
			line = '';
		}
		line += ' ' + word;
	});

	lines.push(line); // Push the last line

	// Add padding to each line to justify the text
	lines = lines.map(line => {
		let padding = ' '.repeat(width - line.length);
		return line + padding;
	});

	return lines.join(os.EOL); // Join the lines with a newline
}
const convertTimeToInteger = time => {
	const seconds = time.split('s')[0];
	// convert to integer
	return parseInt(seconds);
};
module.exports = {
	getWords,
	centerText,
	justifyText,
	convertTimeToInteger
};
