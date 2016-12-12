import React, { Component } from 'react';
import {Link} from 'react-router'
export default function Layout  (props) {
	return (
	  <div>
	  	<div className='nav'>
		  <Link to='/wherever1'>nav1</Link>
		  <Link to='/wherever2'>nav2</Link>
		  <Link to='/wherever3'>nav3</Link>
		</div>
		<div className='main'>
			{props.children}
		</div>
	  </div>
	)
}

Layout.propTypes = {
	children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
}

