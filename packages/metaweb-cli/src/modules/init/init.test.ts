import {expect} from 'chai'
import * as fs from 'fs'
import init from './init'
import * as path from 'path'
import * as shelljs from 'shelljs'
const currentPath = shelljs.pwd()
const testDir = 'test_output'
const testDirPath = path.join('./', testDir)
function clearOldTestDir () {
	try {
		shelljs.cd(currentPath)
		shelljs.rm('-rf', testDirPath)
	} catch (e) {
		console.log('error: ', e) //it may not exist
	}
}
describe('init', () => {
	beforeEach(clearOldTestDir)
	afterEach(clearOldTestDir)
	it('should create a new directory', () => {
		try {
			init(testDir, {silent: false})
		} catch (e) {

		}
		const dir = fs.lstatSync(testDirPath)
		expect(dir.isDirectory()).to.be.true
	})
	it('should throw an error when the directory already exists', () => {
		fs.mkdirSync(testDirPath)
		expect(() => {init(testDir, {silent: false})}).to.throw(`${testDir} already exists`)
	})
})
