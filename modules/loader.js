
const MAIN = async () => {
    const ora = (await import('ora')).default;
	const spinner = ora('Loading monk-minal').start();
	// create delay of 1 second
	await new Promise(resolve => setTimeout(resolve, 1000));
	spinner.succeed('Loaded monk-minal');
	// stop the spinner
	spinner.stop();
};

module.exports = { loader: MAIN };
