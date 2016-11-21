import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'
import * as shelljs from 'shelljs'
import {assign} from 'lodash'
interface IInitOptions {
	interactive?: boolean,
	silent?: boolean
}
const defaultOptions: IInitOptions = {
	interactive: false,
	silent: true
}
function logger (enabled: boolean) {
	return function (...args: any[]) {
		if (enabled) {
			console.log.apply(this, args)
		}
	}
}
export default function init (appName: string, options: IInitOptions = {}) {
	options = assign({}, defaultOptions, options)
	const log = logger(!options.silent)
	const pathName = path.join('./', appName, '/')
	let dir: fs.Stats = null
	try {
		fs.mkdirSync(pathName)
	} catch (e) {
		throw new Error(`${appName} already exists`)
	}
	log(chalk.blue('Creating directory: ' + appName ))
	let originalDir = shelljs.pwd()
	try {
		shelljs.cd(pathName)
		console.log(process.cwd())
		shelljs.exec('lerna init')
	} catch (e) {
		shelljs.cd(originalDir)
		throw e
	}
	shelljs.cd(originalDir)
}
