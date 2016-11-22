import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'
import * as shelljs from 'shelljs'
import {assign} from 'lodash'


interface IInitOptions {
	interactive?: boolean,
	silent?: boolean,
	location?: string
}
const defaultOptions: IInitOptions = {
	interactive: false,
	silent: true,
	location: './'
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
	const pathName = path.join(options.location, appName, '/')
	let dir: fs.Stats = null
	try {
		fs.mkdirSync(pathName)
	} catch (e) {
		throw new Error(`Error creating ${appName} already exists: ${e.message}`)
	}
	log(chalk.blue('Creating directory: ' + appName ))
	let originalDir = shelljs.pwd()
	try {
		shelljs.cd(pathName)
		shelljs.exec('git init', {silent: true})
		shelljs.exec('lerna init', {silent: options.silent})
	} catch (e) {
		shelljs.cd(originalDir)
		throw e
	}
	log(chalk.green(appName,'finished' ))
	shelljs.cd(originalDir)
}
