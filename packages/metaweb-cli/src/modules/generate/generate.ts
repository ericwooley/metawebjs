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
	mkdirBehavior: shelljs.mkdir,
	recursiveDirectoryLookup: recursive
}

export interface IVars {
	CLI_VERSION?: string;
	CURRENT_DATE?: string;
	MODULE_NAME?: string
}
export interface IGenerateOptions {
	readBehavior?: typeof fs.readFile,
	writeBehavior?: typeof fs.writeFile,
	mkdirBehavior?: typeof shelljs.mkdir,
	recursiveDirectoryLookup?: typeof recursive,
	location?: string,
	silent?: boolean
}
export default function generateFiles (
	readDir: string,
	variables: IVars = {},
	options: IGenerateOptions = {}) {
		return new Promise(resolve => {
			const opts= merge({}, defaultOptions, options) as typeof defaultOptions
			opts.recursiveDirectoryLookup(readDir, (err, files) => {
				if (err) throw err
				Promise.all(files
					.map((file) => processFile(file, variables, opts)
					.then((result: string) => {
						const fileToWrite = path.join('./', file.replace(readDir, ''))
						return writeFile(fileToWrite, result, opts)
					})
				))
				.then(resolve)
			})
		})
}

interface IWriteFileOptions {
	writeBehavior: typeof fs.writeFile,
	mkdirBehavior: typeof shelljs.mkdir
}
export function writeFile (file: string, contents: string, {
	writeBehavior,
	mkdirBehavior
}: IWriteFileOptions) {
	return new Promise(resolve => {
		mkdirBehavior('-p', file.split(path.sep).slice(0, -1))
		writeBehavior(file, contents, (err: Error) => {
			if (err) throw err
			resolve(file)
		})
	})
}


export function processFile (file: string, vars: IVars, {readBehavior}: {readBehavior: typeof fs.readFile}) {
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
