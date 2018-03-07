import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header'
import Main from '../routes.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
