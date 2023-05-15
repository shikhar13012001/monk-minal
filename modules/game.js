const chalk = require('chalk'); // for styling
const {
	getWords,
	centerText,
	convertTimeToInteger
} = require('../utils/helpers.js');
const cliCursor = require('cli-cursor');
const spinner = require('cli-spinners').dots;
const os = require('os');
let currentInput = '';
let index = 0;
let prevCount = 0;
let timer;
let counter = 0;
let flag = 0;
let correctTypedCharacters = 0;
let totalTypedCharacters = 0;
const MAIN = async data => {
	data.time = convertTimeToInteger(data.time || '0s');
	const textData = getWords(data);
	let indexes = {
		high: 30,
		low: 0
	};
	let text = textData.slice(indexes.low, indexes.high).join(' ');
	console.log(centerText(chalk.yellowBright('monk-minal v1.0.0')));
	console.log(centerText(chalk.gray('Press any key to start')));
	const readline = require('readline');
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);

	const startTime = new Date().getTime();
	process.stdin.on('keypress', async (str, key) => {
		console.clear();
		totalTypedCharacters++;
		if (flag === 0) {
			cliCursor.hide();

			let timer = setInterval(() => {
				let elapsedTime = Math.floor((new Date() - startTime) / 1000); // in seconds
				process.stdout.clearLine(); // Clear the current line
				process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
				process.stdout.write(
					centerText(
						`${
							spinner.frames[elapsedTime % spinner.frames.length]
						} ${elapsedTime}s`
					)
				);
			}, 1000);
			flag = 1;
		}
		console.log('\n');
		if (key.name === 'escape') {
			process.exit();
		} else {
			if (str === text[index]) {
				correctTypedCharacters++;
				currentInput += str;
				index++;
			}

			// create delay of 1s
			console.log();
			// display the words typed in center
			console.log(
				centerText(
					chalk.gray(
						`${currentInput.split(' ').length + prevCount} words`
					)
				)
			);
			// calculate the wpm
			const WORDs =
				chalk.green(currentInput) +
				chalk.red(text[index] || '') +
				chalk.gray(text.slice(index + 1));
			console.log(centerText(WORDs));
		}

		// calculate the wpm
		const endTime = new Date().getTime();
		const timeTaken = (endTime - startTime) / 1000;
		const totalWords =
			currentInput.split(' ').length +
			prevCount -
			(text[index] === ' ' ? 0 : 1);
		const wpm = (totalWords * 100) / timeTaken;
		console.log(centerText(chalk.gray(`WPM: ${wpm.toFixed(2)}`)));
		if (data.gameType === 'Time') {
			if (timeTaken >= data.time) {
				console.log(centerText(chalk.red('Time up!')));
				console.log(
					centerText(
						chalk.cyanBright(
							`WPM: ${wpm.toFixed(2)} Accuracy: ${(
								(correctTypedCharacters /
									totalTypedCharacters) *
								100
							).toFixed(2)}% Time Take: ${timeTaken.toFixed(2)}s`
						)
					)
				);
				clearInterval(timer);
				process.exit(0);
			}
		}
		if (data.gameType === 'Words') {
			if (totalWords >= parseInt(data.words)) {
				console.log(
					centerText(
						chalk.red('You have completed the count of words.')
					)
				);
				console.log(
					centerText(
						chalk.cyanBright(
							`WPM: ${wpm.toFixed(2)} Accuracy: ${(
								(correctTypedCharacters /
									totalTypedCharacters) *
								100
							).toFixed(2)}% Time Take: ${timeTaken.toFixed(2)}s`
						)
					)
				);
				clearInterval(timer);
				process.exit(0);
			}
		}
		if (data.gameType === 'Quote') {
			if (totalWords >= textData.length) {
				console.log(
					centerText(chalk.red('You have completed the quote'))
				);
				console.log(
					centerText(
						chalk.cyanBright(
							`WPM: ${wpm.toFixed(2)} Accuracy: ${(
								(correctTypedCharacters /
									totalTypedCharacters) *
								100
							).toFixed(2)}% Time Take: ${timeTaken.toFixed(2)}s`
						)
					)
				);
				clearInterval(timer);
				process.exit(0);
			}
		}

		// change the text after 10 words
		if (currentInput.length >= text.length) {
			indexes.low = indexes.high;
			indexes.high += 30;
			currentInput = '';
			text = textData.slice(indexes.low, indexes.high).join(' ');
			index = 0;
			prevCount += 30;
		}
	});
	process.stdin.resume();
};

module.exports = {
	Game: MAIN
};

// put text in center of terminal
// if (flag == 0) {
// 	timer = setInterval(() => {
// 		const time = `${++counter}s`;
// 		readline.cursorTo(
// 			process.stdout,
// 			(process.stdout.columns - time.length) / 2,
// 			0
// 		);
// 		readline.clearLine(
// 			process.stdout,
// 			(process.stdout.columns - time.length) / 2
// 		);
// 		// clear current text
// 		process.stdout.write(time);
// 	}, 1000);
// 	await new Promise(resolve => setTimeout(resolve, 1000));
// 	flag = 1;
// }
