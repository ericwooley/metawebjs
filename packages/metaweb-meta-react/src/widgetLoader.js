import React, {Component} from 'react'
import Loader from 'react-loader'
import {debounce} from 'lodash'
export default class WidgetLoader extends Component {
	constructor () {
		super()
		this.state = {}
	}
	componentDidMount () {
		this.props.loadWidget((Widget) => {
			this.setState({Widget})
		})
		// require.ensure(['lodash'], (require) => {
		// 	const Widget = require(module)
		// 	this.setState({Widget})
		// })
	}
	render () {
		return (
			<Loader loaded={!!this.state.Widget}>
				<div><h1>LOADED DIV YAY</h1></div>
			</Loader>
		)
	}
}
