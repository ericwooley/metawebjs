import generate, {IGenerateOptions} from './generate'
import * as sinon from 'sinon'
import {merge} from 'lodash'
import {expect} from 'chai'
describe('generate', () => {
	let options: IGenerateOptions
	let spies: {
		recursiveDirectoryLookupSpy: sinon.SinonSpy,
		writeBehaviorSpy: sinon.SinonSpy
	}
	const vars = {
		CLI_VERSION: '0.0.1',
		CURRENT_DATE: new Date().toDateString(),
		MODULE_NAME: 'test_module'
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
		return generate('test', vars, options)
		.then(() => expect(spies.recursiveDirectoryLookupSpy.calledOnce).to.be.true)
	})
	it('should call the write file function', () => {
		return generate('test', vars, options)
		.then(() => expect(spies.writeBehaviorSpy.callCount).to.equal(Object.keys(fakeFiles).length))
	})
})

const fakeFiles: {[key: string]: string} = {
	'test/test_folder/s0/test0.txt':  ``,
	'test/test_folder/s1/.sub/folder/test1.txt': ``,
	'test/test_folder/s1/sub/folder/test2.txt': ``,
	'test/test_folder/test3.txt': ``,
	'test/test_folder/test4.sub.txt': ``,
	'test/test_folder/test5': ``,
}

function fakeFileReader (file: string, done: (err: any, contents: string) => any) {
	return done(null, fakeFiles[file])
}
