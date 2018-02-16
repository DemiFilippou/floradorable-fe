import React from 'react';
import FieldGroup from './FieldGroup'
import { Button } from 'react-bootstrap';
import './LoginForm.css'
import Api from '../api.js'
import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this)

    this.state = {
      email: '',
      password: '',
      redirect: ''
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
    console.log(Api)
    let loginSuccess;
    try {
      loginSuccess = await Api.login({ user: this.state });
    } catch(err) {
      console.log(err);
    }
    if (loginSuccess) {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/'}} />;
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
        <Button>REGISTER</Button>
      </form>
    );
  }
}

export default LoginForm;
