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
      snackMessage: ''
    };
  }

  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = {...this.state};
    if (password !== confirmPassword) {
      this.setState({
        open: true,
        snackMessage: "Passwords don't match"
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
      .then((json) => {
        window.location = "/login";
      })
      .catch((error) => {
        this.setState({
          open: true,
          snackMessage: error.msg
        });
      });
  }
  
  onStaticFocus = field => (e) => {
    if (field === 'name') {
      this.textName.focus();
    }
    if (field === 'email') {
      this.textEmail.focus();
    }
    if (field === 'password') {
      this.textPassword.focus();
    }
    if (field === 'confirmPassword') {
      this.textConfirmPassword.focus();
    }
  }
  
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render = () => {
    return (
      <div className="card">
        <h4 className="l-login">Register
          <div className="msg">Register a new membership</div>
        </h4>
        <form className="col-md-12" id="" onSubmit={this.handleSubmit}>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.name)})}>
              <input 
                type="text" 
                className="form-control" 
                value={this.state.name}
                ref={(input) => { this.textName = input; }}
                onClick={this.onStaticFocus('name')}
                onChange={this.onStaticChange('name')}
                name="name"/>
              <label 
                onClick={this.onStaticFocus('name')}
                className="form-label">Name Surname</label>
            </div>
          </div>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.email)})}>
              <input 
                type="email" 
                className="form-control" 
                value={this.state.email}
                ref={(input) => { this.textEmail = input; }}
                onClick={this.onStaticFocus('email')}
                onChange={this.onStaticChange('email')}
                name="email"/>
              <label 
                onClick={this.onStaticFocus('email')}
                className="form-label">Email Address</label>
            </div>
          </div>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.password)})}>
              <input 
                type="password" 
                className="form-control"
                value={this.state.password}
                ref={(input) => { this.textPassword = input; }}
                onClick={this.onStaticFocus('password')}
                onChange={this.onStaticChange('password')}
                name="password"/>
              <label 
                onClick={this.onStaticFocus('password')}
                className="form-label">Password</label>
            </div>
          </div>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.confirmPassword)})}>
              <input 
                type="password" 
                value={this.state.confirmPassword}
                ref={(input) => { this.textConfirmPassword = input; }}
                onClick={this.onStaticFocus('confirmPassword')}
                onChange={this.onStaticChange('confirmPassword')}
                className="form-control"/>
              <label 
                onClick={this.onStaticFocus('confirmPassword')}
                className="form-label">Confirm Password</label>
            </div>
          </div>
          <div className="text-left"> 
            <a
              onClick={this.handleSubmit}
              href="#signup" className="btn btn-raised waves-effect bg-red" type="submit">SIGN UP</a> 
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
    );
  }
}
