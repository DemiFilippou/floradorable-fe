import React from 'react';
import FieldGroup from './FieldGroup';
import { Button } from 'react-bootstrap';
import './LoginForm.css';
import Api from '../api.js';
import { Redirect } from 'react-router-dom';
// TODO: Tell user when login fails

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
      redirectRegister: false
    };
  }

  getValidationState() {
    //const length = this.state.value.length;
    //if (length > 10) return 'success';
    //else if (length > 5) return 'warning';
    //else if (length > 0) return 'error';
    return null;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  async login(e) {
    let loginSuccess;
    try {
      loginSuccess = await Api.login({ user: this.state });
    } catch (err) {
      console.log(err);
    }
    if (loginSuccess) {
      console.log('Logged in');
      this.setState({ redirect: true });
    }
  }

  redirectToRegister() {
    this.setState({ redirectRegister: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (this.state.redirectRegister) {
      return <Redirect to={{ pathname: '/register' }} />;
    }
    return (
      <form>
        <FieldGroup
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleChange}
        />
        <FieldGroup
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleChange}
        />
        <Button onClick={this.login}>LOG IN</Button>
        <Button onClick={this.redirectToRegister.bind(this)}>REGISTER</Button>
      </form>
    );
  }
}

export default LoginForm;
