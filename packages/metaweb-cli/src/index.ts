#!/usr/bin/env node

import * as program from 'commander'
import init from './modules/init/init'
import * as path from 'path'

let packageMeta = require(path.join(__dirname, '../',  'package.json'))
type IProgramOptions = {
	init?: string,
	silent?: boolean,
	location?: string
}
program
  .version(packageMeta.version)
  .option('--init [type]', 'metaweb --init [name]')
  .option('-i --interactive', 'metaweb --interactive', null, false)
	.option('-l --location [type]', 'metaweb --location /temp/test', null, false)
	.option('-s --silent', 'metaweb --silent', null, false)
  .parse(process.argv);


const initializedProgram: IProgramOptions & commander.IExportedCommand = program
if (initializedProgram.init) {
	init(initializedProgram.init, {
		silent: !!initializedProgram.silent,
		location: initializedProgram.location
	})
}
