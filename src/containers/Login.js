import React, { Component } from 'react';
import './App.css';
import LoginForm from '../components/LoginForm'

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <LoginForm />
      </div>
    );
  }
}

export default Login;

