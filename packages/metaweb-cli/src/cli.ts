#!/usr/bin/env node

import * as program from 'commander'
import initModule from './modules/init/init'
import * as path from 'path'
import * as chalk from 'chalk'
import {assign} from 'lodash'
let packageMeta = require(path.join(__dirname, '../',  'package.json'))

program
	.version(packageMeta.version)
	.option('--init [type]', 'metaweb --init [name]')
	.option('-i --interactive', 'metaweb --interactive', null, false)
	.option('-l --location [type]', 'metaweb --location /temp/test', null, false)
	.option('-s --silent', 'metaweb --silent', null, false)
	.parse(process.argv);
type IProgramOptions = {
		init?: string,
		silent?: boolean,
		location?: string
	}
const initializedProgram: IProgramOptions = program
interface IModules {
	init?: typeof initModule
}

const defaultOptions = {
	location: './'
}

export default function cli({init}: IModules, options = initializedProgram) {
	try {
		if (options.init) {
			init(options.init, {
				silent: !!options.silent,
				location: options.location || defaultOptions.location
			})
		}
	} catch (e) {
		console.error(chalk.red('========== OOOPS, looks like there was a problem =========='))
		console.error(chalk.red(e.message))
		console.error(chalk.red('==========================================================='))
	}
}

cli({init: initModule})
