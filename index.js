#!/usr/bin/env node

/**
 * monk-minal
 * terminal version of monkeytype
 *
 * @author shikhar13012001 <https://portfolio-shikhar13012001.vercel.app/>
 */
const figlet = require('figlet');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const { Options } = require('./modules/options.js');
const { loader } = require('./modules/loader.js');
const { Game } = require('./modules/game.js');
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear: false });
	// draw Banner
	const Banner = figlet.textSync('MonkMinal', {
		font: 'Star Wars',
		horizontalLayout: 'universal smushing',
		verticalLayout: 'default'
	});
	log(Banner);
	input.includes(`help`) && cli.showHelp(0);
	// loader
	const data = await Options();
	await loader();
	await Game(data);
})();
