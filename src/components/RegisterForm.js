import React from 'react';
import FieldGroup from './FieldGroup';
import { Button, HelpBlock } from 'react-bootstrap';
import './LoginForm.css';
import Api from '../api.js';
import { Redirect } from 'react-router-dom';

// TODO: actually tell user about validation errors.

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      redirect: false
    };
  }

  validateForm() {
    return (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password_confirmation
    );
  }

  getValidationState() {
    if (this.state.password_confirmation === '') {
      return null;
    }
    if (this.state.password !== this.state.password_confirmation) {
      return 'error';
    }
    return 'success';
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

  async register(e) {
    let validConfirmation =
      this.state.password === this.state.password_confirmation;
    let validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      this.state.email
    );

    if (validEmail && validConfirmation) {
      try {
        await Api.register({ user: this.state });
      } catch (err) {
        return alert(JSON.stringify(err));
      }
      this.registerDevice();
    }
  }

  async registerDevice() {
    try {
      const deviceToken = await window.Pushy.register({
        appId: '5aa2f8a1e1fd879101a7cfd0'
      });
      console.log('Pushy device token: ' + deviceToken);
      // Send the token to server
      await Api.registerDevice(deviceToken);
      this.setState({ redirect: true });
    } catch (err) {
      // Handle registration errors
      console.error(err);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/home' }} />;
    }
    return (
      <form>
        <FieldGroup
          id="name"
          type="text"
          placeholder="Name"
          name="name"
          onChange={this.handleChange}
        />
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
        <FieldGroup
          id="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          name="password_confirmation"
          onChange={this.handleChange}
          validationState={this.getValidationState()}
        />
        <Button disabled={!this.validateForm()} onClick={this.register}>
          SIGN UP
        </Button>
      </form>
    );
  }
}

export default RegisterForm;
