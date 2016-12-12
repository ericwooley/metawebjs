import React, { Component } from 'react';
import WidgetLoader from '../widgetLoader'
export default class App extends Component {
  render() {
    return (
      <div>
	  	<WidgetLoader widget='lodash' />
	  </div>
    );
  }
}
