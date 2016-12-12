import React, { Component } from 'react';
import WidgetLoader from '../widgetLoader'
export default class App extends Component {
  render() {
    return (
      <div>
	  	<WidgetLoader loadWidget={(cb) =>
			  require.ensure([], (require) =>
			  	cb(require('lodash')
			))} />
	  </div>
    );
  }
}
