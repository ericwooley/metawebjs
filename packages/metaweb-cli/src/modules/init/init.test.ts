import {expect} from 'chai'
import * as fs from 'fs'
import init from './init'
import * as path from 'path'
import * as shelljs from 'shelljs'
import * as os from 'os'
const currentPath = shelljs.pwd()
const testDir = 'test_output'
const tempDir = os.tmpdir()
const testDirPath = path.join(tempDir, testDir)
function clearOldTestDir () {
	try {
		shelljs.cd(currentPath)
		shelljs.rm('-rf', testDirPath)
	} catch (e) {
		console.log('error: ', e) //it may not exist
	}
}
describe('init', () => {
	clearOldTestDir()
	afterEach(clearOldTestDir)
	it('should create a new directory', () => {
		init(testDir, {silent: true, location: tempDir})
		const dir = fs.lstatSync(testDirPath)
		expect(dir.isDirectory()).to.be.true
	})
	it('should initialize lerna', () => {
		init(testDir, {silent: true, location: tempDir})
		const filesInPath = shelljs.ls('-A', testDirPath)
		expect(filesInPath.slice()).to.eql([ '.git', 'lerna.json', 'package.json', 'packages'])
	})
	it('should throw an error when the directory already exists', () => {
		fs.mkdirSync(testDirPath)
		expect(() => {init(testDir, {silent: true, location: tempDir})}).to.throw(`${testDir} already exists`)
	})
})
