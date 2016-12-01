import {expect} from 'chai'
import * as sinon from 'sinon'
import cli from './cli'
var packageInfo = require('../package.json')

describe('cli', () => {
	describe('init', () => {
		let cliSpies: {
			init?: sinon.SinonSpy
		}
		beforeEach(() => {
			cliSpies = {
				init: sinon.spy()
			}
		})
		it('should call the init', () => {
			cli(cliSpies, {init: 'test'})
			expect(cliSpies.init.calledOnce).to.be.true
		})
		it('should call the init with default params', () => {
			cli(cliSpies, {init: 'test'})
			expect(cliSpies.init.calledOnce).to.be.true
			sinon.assert.calledWith(cliSpies.init, sinon.match('test'), sinon.match({silent: false, location: './'}))
		})
		it('should call the init with silent', () => {
			cli(cliSpies, {init: 'test', silent: true})
			expect(cliSpies.init.calledOnce).to.be.true
			sinon.assert.calledWith(cliSpies.init, sinon.match('test'), sinon.match({silent: true}))
		})
		it('should call the init with an different location', () => {
			cli(cliSpies, {init: 'test', location: 'somewhere/random'})
			expect(cliSpies.init.calledOnce).to.be.true
			sinon.assert.calledWith(cliSpies.init, sinon.match('test'), sinon.match({location: 'somewhere/random'}))
		})
	})
	describe('generate', () => {
		let cliSpies: {
			generate?: sinon.SinonSpy
		}
		beforeEach(() => {
			cliSpies = {
				generate: sinon.spy()
			}
		})
		it('should call generate', () => {
			cli(cliSpies, {generate: 'test'})
			expect(cliSpies.generate.calledOnce).to.be.true
			sinon.assert.calledWith(cliSpies.generate, sinon.match('test'), sinon.match({
				CLI_VERSION: packageInfo.version,
				CURRENT_DATE: new Date().toDateString(),
				MODULE_NAME: 'test'
			}), sinon.match({silent: false, location: './'}))
		})
	})
})
