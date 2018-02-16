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

      /*
      <div className="App">
        <Header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Floradorable</h1>
        </Header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      */
    );
  }
}

export default App;
