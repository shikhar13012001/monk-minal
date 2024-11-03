const { Select } = require('enquirer');

const gameTypePrompt = new Select({
	name: 'gameType',
	message: 'Pick a game type:',
	choices: ['Time', 'Words', 'Quote']
});

// Options for time
const timePrompt = new Select({
	name: 'time',
	message: 'Pick a time:',
	choices: ['15s', '30s', '60s', '120s']
});

// Options for words
const wordsPrompt = new Select({
	name: 'words',
	message: 'Pick a number of words:',
	choices: ['10', '20', '30', '40', '50']
});

// Option for difficulty
const difficultyPrompt = new Select({
	name: 'difficulty',
	message: 'Pick a difficulty:',
	choices: ['Easy', 'Medium', 'Hard']
});
const MAIN = async () => {
	const resp = await gameTypePrompt.run();
	const gameType = resp;
	let response = {};
	if (resp === 'Time') {
		const time = await timePrompt.run();
		response = { time };
	} else if (resp === 'Words') {
		const words = await wordsPrompt.run();
		response = { words: parseInt(words) };
	}
	const difficulty = await difficultyPrompt.run();

	return { gameType, ...response, difficulty };
};

module.exports = { Options: MAIN };
