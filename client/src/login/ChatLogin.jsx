import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { checkStatus } from '../helpers/utils';

export default class ChatLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      open: false,
      snackMessage: ''
    };
  }

  onStaticChange = field => (e) => {
    this.setState({ [field]: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = {...this.state};
    const requestData = { 
      email,
      password,
    };
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(requestData),
      credentials: 'include',
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        if (json.user === false) {
          this.setState({
            open: true,
            snackMessage: json.message
          });
          return;
        }
        window.location = "/chat";
      })
      .catch(() => {
        this.setState({
          open: true,
          snackMessage: 'Login failed'
        });
      });
  }
  
  onStaticFocus = field => (e) => {
    if (field === 'email') {
      this.textEmail.focus();
    }
    if (field === 'password') {
      this.textPassword.focus();
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
        <h4 className="l-login">Login</h4>
        <form className="col-md-12" id="sign_in" onSubmit={this.handleSubmit} action="/login" method="POST">
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.email)})}>
              <input 
                type="email" 
                onClick={this.onStaticFocus('email')}
                onChange={this.onStaticChange('email')}
                value={this.state.email}
                ref={(input) => { this.textEmail = input; }}
                className="form-control" value={this.state.email}/>
              <label 
                onClick={this.onStaticFocus('email')}
                className="form-label">Email</label>
            </div>
          </div>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.password)})}>
              <input 
                type="password" 
                onClick={this.onStaticFocus('password')}
                onChange={this.onStaticChange('password')}
                ref={(input) => { this.textPassword = input; }}
                value={this.state.password}
                className="form-control" value={this.state.password}/>
              <label 
                onClick={this.onStaticFocus('password')}
                className="form-label">Password</label>
            </div>
          </div>
          <a href="#signin" onClick={this.handleSubmit} className="btn btn-raised waves-effect bg-red" type="submit">SIGN IN</a> 
          <a href="/signup" className="btn btn-raised waves-effect">SIGN UP</a>
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
