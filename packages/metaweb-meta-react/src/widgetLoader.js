import React, {Component} from 'react'
import Loader from 'react-loader'
export default class WidgetLoader extends Component {
	constructor () {
		super()
		this.state = {}
	}
	componentDidMount () {
		debugger
		require([this.props.widget], (Widget) => {
			this.setState({Widget})
		})
	}
	render () {
		return (
			<Loader loaded={this.state.Widget}>
				<div><h1>LOADED DIV YAY</h1></div>
			</Loader>
		)
	}
}
