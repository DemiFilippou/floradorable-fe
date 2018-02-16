import React, { Component } from 'react';
import './App.css';
import RegisterForm from '../components/RegisterForm'

class Register extends Component {
  render() {
    return (
      <div className="Register">
        <RegisterForm />
      </div>
    );
  }
}

export default Register;


