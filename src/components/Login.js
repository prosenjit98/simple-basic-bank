import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
import { initiateLogin } from '../actions/auth'
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMsg: ''
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }
  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const fieldToValidate = [{ email }, { password }]
    const allFieldEntered = validateFields(fieldToValidate)

    if (!allFieldEntered) {
      this.setState({
        errorMsg: {
          signin_error: "Please enter all fields"
        }
      })
    } else {
      this.setState({
        errorMsg: {
          signin_error: ''
        }
      });
      this.props.dispatch(initiateLogin(email, password));
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="login-page">
        <h1>Banking Application</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register" className="btn btn-secondary">
                Create account
              </Link>
            </div>
          </Form>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Login);

