import generate, {IGenerateOptions, writeFile, processFile} from './generate'
import {fakeVars, elmTemplate, transformedElm} from './generate.data'
import * as sinon from 'sinon'
import {merge} from 'lodash'
import {expect} from 'chai'

describe('generate', () => {
	let options: IGenerateOptions
	let spies: {
		recursiveDirectoryLookupSpy: sinon.SinonSpy,
		writeBehaviorSpy: sinon.SinonSpy
	}
	const fakeFiles: {[key: string]: {template: string, expectedResult: string}} = {
		'test/test_folder/s0/test0.txt':  {template: `<%- CLI_VERSION %>`, expectedResult: `0.0.1`},
		'test/test_folder/s1/.sub/folder/test.elm': {template: elmTemplate, expectedResult: transformedElm},
		'test/test_folder/s1/sub/folder/test2.txt': {template: ` `, expectedResult: ` `},
		'test/test_folder/test3.txt': {template: ` `, expectedResult: ` `},
		'test/test_folder/test4.sub.txt': {template: ` `, expectedResult: ` `},
		'test/test_folder/test5': {template: ` `, expectedResult: ` `},
	}
	function fakeFileReader (file: string, done: (err: any, contents: string) => any) {
		return done(null, fakeFiles[file].template)
	}

	function fakeFileWriter (file: string, contents: string,  done: (err: any) => any) {
		return done(null)
	}
	beforeEach(() => {
		spies = {
			recursiveDirectoryLookupSpy: sinon.spy(),
			writeBehaviorSpy: sinon.spy()
		}
		options = {
			readBehavior: (fakeFileReader as any),
			writeBehavior:( (file: string, contents: string, done: (input: string) => any) => {
				done(null)
				spies.writeBehaviorSpy(file, contents)
			}) as any,
			mkdirBehavior: () => null as any,
			recursiveDirectoryLookup: ((dir: string, finishFiles: (error: any, files: string[]) => any) => {
				 finishFiles(null, Object.keys(fakeFiles))
				 spies.recursiveDirectoryLookupSpy(dir)
			}) as any,
			location: './',
			silent: true
		}
	})
	it('should call the recursiveDirectory function', () => {
		return generate('test', fakeVars, options)
		.then(() => expect(spies.recursiveDirectoryLookupSpy.calledOnce).to.be.true)
	})
	it('should call the write file function', () => {
		return generate('test', fakeVars, options)
		.then(() => expect(spies.writeBehaviorSpy.callCount).to.equal(Object.keys(fakeFiles).length))
	})
	describe('writeFile', () => {
		it('should make a direcotory', () => {
			const mkdirSpy = sinon.spy()
			return writeFile('test/test_folder/s0/test0.txt', ``, {mkdirBehavior: mkdirSpy, writeBehavior: fakeFileWriter as any})
			.then(() => expect(mkdirSpy.withArgs('-p', 'test/test_folder/s0').calledOnce).to.be.true)
		})
		it('should write a file to that directory', () => {
			const contentString = 'something silly'
			const contentFile = 'test/test_folder/s0/test0.txt'
			const writeSpy = sinon.spy()
			return writeFile(contentFile, contentString, {
				mkdirBehavior: () => null as any,
				writeBehavior: (file: string, content: string, done: Function) => {
					writeSpy(file, content)
					done()
				}
			})
			.then(() => expect(writeSpy.withArgs(contentFile, contentString).calledOnce).to.be.true)
		})
	})
	describe('processFile', () => {
		it('should make a read a file', () => {
			const mkdirSpy = sinon.spy()
			return processFile('test/test_folder/s0/test0.txt', ``, {
				readBehavior: ((file: string, callback: Function) => {
					mkdirSpy(file)
					callback(null, fakeFiles[file])
				}) as any
			})
			.then(() => expect(mkdirSpy.withArgs('test/test_folder/s0/test0.txt').calledOnce).to.be.true)
		})
		it('should process the file', () => {
			return Promise.all(Object.keys(fakeFiles)
				.map(
					(key) => processFile(key, fakeVars, {readBehavior: fakeFileReader as any})
						.then(contents => expect(contents).to.equal(fakeFiles[key].expectedResult))
				)
			)
		})
	})
})

