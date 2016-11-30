import * as recursive from 'recursive-readdir'
import * as dust from 'dustjs-linkedin'
import * as fs from 'fs'
import {merge} from 'lodash'
import * as Promise from 'promise'
import * as path from 'path'
import * as shelljs from 'shelljs'
const defaultOptions = {
	readBehavior: fs.readFile,
	writeBehavior: fs.writeFile,
	done: () => ''
}
interface IVars {}
export default function generateFiles (
	readDir: string,
	variables: IVars = {},
	options: {
		readBehavior?: typeof fs.readFile,
		writeBehavior?: typeof fs.writeFile,
		done?: () => any
	} = {}) {
		options = merge({}, defaultOptions, options)
		recursive(readDir, (err, files) => {
			if (err) throw err
			Promise.all(files
				.map((file) => processFile(file, variables, options)
				.then((result: string) => {
					const fileToWrite = path.join('./', file.replace(readDir, ''))
					return writeFile(fileToWrite, result, options.writeBehavior)
				})
			))
			.then(options.done)
		})
}

export function writeFile (file: string, contents: string, writeBehavior: typeof fs.writeFile) {
	return new Promise(resolve => {
		shelljs.mkdir('-p', file.split(path.sep).slice(0, -1))
		writeBehavior(file, contents, (err: Error) => {
			if (err) throw err
			resolve(file)
		})
	})
}


export function processFile (file: string, vars: IVars, {readBehavior = fs.readFile}) {
	return new Promise(resolve => {
		readBehavior(file, (err, fileContents) => {
			if (err) throw err
			var compiled = dust.compile(fileContents.toString(), file);
			dust.loadSource(compiled);
			dust.render(file, vars, function(err, out) {
				if (err) throw err
				resolve(out)
			});
		})
	})
}
