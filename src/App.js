import './App.css';

import React, { Component } from 'react';

export default class App extends Component {
    date = '20-01-2022'
    render() {
      return <div>
        Hello My First Class Based Component developed on {this.date}
    </div>;
  }
}

