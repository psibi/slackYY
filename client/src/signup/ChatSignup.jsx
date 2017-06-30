import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { checkStatus } from '../helpers/utils';

export default class ChatSignup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      open: false,
      snackMessage: '',
    };
  }

  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = { ...this.state };
    if (password !== confirmPassword) {
      this.setState({
        open: true,
        snackMessage: "Passwords don't match",
      });
      return;
    }
    const requestData = {
      name,
      email,
      password,
    };
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(() => {
        window.location = '/login';
      })
      .catch((error) => {
        this.setState({
          open: true,
          snackMessage: error.msg,
        });
      });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render = () => (
    <div className="card">
      <h4 className="l-login">Register
        <div className="msg">Register a new membership</div>
      </h4>
      <form className="col-md-12" id="" onSubmit={this.handleSubmit}>
        <div className="form-group form-float">
          <div className={classNames('form-line', { focused: !_.isEmpty(this.state.name) })}>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onStaticChange('name')}
              name="name"
              id="textName"
            />
            <label
              htmlFor="textName"
              className="form-label"
            >Name Surname
            </label>
          </div>
        </div>
        <div className="form-group form-float">
          <div className={classNames('form-line', { focused: !_.isEmpty(this.state.email) })}>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onStaticChange('email')}
              name="email"
              id="textEmail"
            />
            <label
              htmlFor="textEmail"
              className="form-label"
            >Email Address</label>
          </div>
        </div>
        <div className="form-group form-float">
          <div className={classNames('form-line', { focused: !_.isEmpty(this.state.password) })}>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onStaticChange('password')}
              name="password"
              id="textPassword"
            />
            <label
              htmlFor="textPassword"
              className="form-label"
            >Password</label>
          </div>
        </div>
        <div className="form-group form-float">
          <div className={classNames('form-line', { focused: !_.isEmpty(this.state.confirmPassword) })}>
            <input
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onStaticChange('confirmPassword')}
              className="form-control"
              id="textConfirmPassword"
            />
            <label
              htmlFor="textConfirmPassword"
              className="form-label"
            >Confirm Password</label>
          </div>
        </div>
        <div className="text-left">
          <a
            onClick={this.handleSubmit}
            href="#signup"
            className="btn btn-raised waves-effect bg-red"
            type="submit"
          >SIGN UP</a>
        </div>
        <div className="m-t-10 m-b--5"> <a href="/login">You already have a membership?</a> </div>
      </form>
      <MuiThemeProvider>
        <Snackbar
          open={this.state.open}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </MuiThemeProvider>
    </div>
  )
}
