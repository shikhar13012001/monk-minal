const chalk = require('chalk');
const {
	getWords,
	centerText,
	convertTimeToInteger
} = require('../utils/helpers.js');
const cliCursor = require('cli-cursor');
const spinner = require('cli-spinners').dots;

/**
 * Calculates Words Per Minute (WPM) based on typing performance.
 *
 * @param {number} correctChars - The number of correctly typed characters.
 * @param {number} totalChars - The total number of characters typed.
 * @param {number} timeInSeconds - The total time taken in seconds.
 * @returns {Object} An object containing grossWPM, netWPM, and accuracy.
 *
 * @throws {Error} Throws an error if timeInSeconds is zero or negative.
 */
function calculateWPM(correctChars, totalChars, timeInSeconds) {
	if (timeInSeconds <= 0) {
		throw new Error("Time must be greater than zero.");
	}

	// Standard word length is considered as 5 characters
	const STANDARD_WORD_LENGTH = 5;

	// Calculate time in minutes
	const timeInMinutes = timeInSeconds / 60;

	// Calculate Gross WPM (total words typed)
	const grossWPM = (totalChars / STANDARD_WORD_LENGTH) / timeInMinutes;

	// Calculate Errors (extra characters typed)
	const errors = totalChars - correctChars;

	// Ensure errors do not exceed total characters
	const adjustedErrors = errors > 0 ? errors : 0;

	// Calculate Net WPM (Gross WPM minus errors per minute)
	const netWPM = grossWPM - (adjustedErrors / timeInMinutes);

	// Calculate Accuracy Percentage
	const accuracy = (correctChars / totalChars) * 100;

	return {
		grossWPM: Math.max(grossWPM, 0).toFixed(2),
		netWPM: Math.max(netWPM, 0).toFixed(2),
		accuracy: accuracy.toFixed(2)
	};
}

/**
 * Main game function that handles the typing test game logic.
 * 
 * @param {Object} data - The game data containing settings such as time, words, and gameType.
 */
const MAIN = async (data) => {
	// Convert the provided time into seconds
	data.time = convertTimeToInteger(data.time || '0s');

	// Get the text data for the typing game
	const textData = getWords(data);

	// Initialize display indexes for slicing the text
	let indexes = { high: 30, low: 0 };
	let text = textData.slice(indexes.low, indexes.high).join(' ');

	// Display game version and initial message
	console.log(centerText(chalk.yellowBright('monk-minal v1.0.0')));
	console.log(centerText(chalk.gray('Press any key to start')));

	// Required node modules
	const readline = require('readline');
	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);

	// Game state variables
	let currentInput = '';
	let index = 0;
	let prevCount = 0;
	let correctTypedCharacters = 0;
	let totalTypedCharacters = 0;
	let flag = 0;
	let errorString = '';

	// Start the timer for the game
	const startTime = new Date().getTime();

	// Timer reference for clearing later
	let timerInterval = null;

	// Handle keypress events
	process.stdin.on('keypress', async (str, key) => {
		console.clear();
		totalTypedCharacters++;

		// Start the timer and hide the cursor on first key press
		if (flag === 0) {
			cliCursor.hide();
			// Timer display using spinner and elapsed time
			timerInterval = setInterval(() => {
				let elapsedTime = Math.floor((new Date() - startTime) / 1000); // in seconds
				process.stdout.clearLine(); // Clear the current line
				process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
				process.stdout.write(
					centerText(
						`${spinner.frames[elapsedTime % spinner.frames.length]} ${elapsedTime}s`
					)
				);
			}, 1000); // Update every second
			flag = 1;
		}

		// Handle special key inputs
		if (key.name === 'escape') {
			process.exit(); // Exit the game if escape key is pressed
		}

		// Handle backspace key to correct errors
		if (key.name === 'backspace') {
			if (errorString.length > 0) {
				errorString = errorString.slice(0, errorString.length - 1);
			}
			
		} else if (str === text[index]) {
			// Handle correct typing
			correctTypedCharacters++;
			currentInput += str;
			index++;
		} else {
			// Handle incorrect typing
			errorString += str;
		}

		// Display the current typing state and feedback
		console.log(centerText(chalk.gray(`${currentInput.split(' ').length + prevCount} words`)));

		// Formatting the current typing, errors, and remaining text
		errorString = errorString.replace(/\r/g, ''); // Clean carriage return characters
		let WORDs = chalk`{green ${currentInput}}{bgRedBright ${errorString}}{yellowBright ${text[index] || ''}}{gray ${text.slice(index + 1)}}`;

		// Display the centered output
		console.log(centerText(WORDs));

		// Calculate words per minute (WPM) using the accurate function
		const endTime = new Date().getTime();
		const timeTaken = (endTime - startTime) / 1000;
		const totalWords = currentInput.split(' ').filter(word => word.length > 0).length + prevCount;
		
		let wpmData = {
			grossWPM: '0.00',
			netWPM: '0.00',
			accuracy: '0.00'
		};

		try {
			wpmData = calculateWPM(correctTypedCharacters, totalTypedCharacters, timeTaken);
		} catch (error) {
			// Handle error if timeTaken is zero or negative
			console.error(centerText(chalk.red(`Error calculating WPM: ${error.message}`)));
		}

		// Display WPM and Accuracy
		console.log(centerText(chalk.gray(`Gross WPM: ${wpmData.grossWPM} | Net WPM: ${wpmData.netWPM} | Accuracy: ${wpmData.accuracy}%`)));

		// Handle different game end conditions
		if (data.gameType === 'Time' && timeTaken >= data.time) {
			endGame(wpmData, correctTypedCharacters, totalTypedCharacters, timeTaken, timerInterval);
		} else if (data.gameType === 'Words' && totalWords >= parseInt(data.words)) {
			endGame(wpmData, correctTypedCharacters, totalTypedCharacters, timeTaken, timerInterval);
		} else if (data.gameType === 'Quote' && totalWords >= textData.length) {
			endGame(wpmData, correctTypedCharacters, totalTypedCharacters, timeTaken, timerInterval);
		}

		// Change the displayed text after reaching 30 words
		if (currentInput.length >= text.length) {
			indexes.low = indexes.high;
			indexes.high += 30;
			currentInput = '';
			text = textData.slice(indexes.low, indexes.high).join(' ');
			index = 0;
			prevCount += 30;
		}
	});

	// Keep the input stream open
	process.stdin.resume();
};

/**
 * End the game, display results, and exit.
 * 
 * @param {Object} wpmData - Object containing grossWPM, netWPM, and accuracy.
 * @param {number} correctTypedCharacters - Number of correctly typed characters.
 * @param {number} totalTypedCharacters - Total number of characters typed.
 * @param {number} timeTaken - Total time taken for the game.
 * @param {Object} timerInterval - The interval timer to be cleared.
 */
const endGame = (wpmData, correctTypedCharacters, totalTypedCharacters, timeTaken, timerInterval) => {
	console.clear();
	console.log(centerText(chalk.red('Game Over!')));
	console.log(
		centerText(
			chalk.cyanBright(
				`Gross WPM: ${wpmData.grossWPM} | Net WPM: ${wpmData.netWPM} | Accuracy: ${wpmData.accuracy}% | Time Taken: ${timeTaken.toFixed(2)}s`
			)
		)
	);
	// Clear the timer interval and show the cursor
	clearInterval(timerInterval);
	cliCursor.show();
	process.exit(0);
};

module.exports = {
	Game: MAIN
};
