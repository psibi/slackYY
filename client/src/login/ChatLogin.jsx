import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { checkStatus } from '../helpers/utils';

export default class ChatLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((json) => {
        console.log('resp', json);
      })
      .catch((error) => {
        console.log('error', error);
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

  render = () => {
    return (
      <div className="card">
        <h4 className="l-login">Login</h4>
        <form className="col-md-12" id="sign_in" onSubmit={this.handleSubmit}>
          <div className="form-group form-float">
            <div className={classNames('form-line', {focused: !_.isEmpty(this.state.email)})}>
              <input 
                type="email" 
                onClick={this.onStaticFocus('email')}
                onChange={this.onStaticChange('email')}
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
                className="form-control" value={this.state.password}/>
              <label 
                onClick={this.onStaticFocus('password')}
                className="form-label">Password</label>
            </div>
          </div>
          <a href="/login" className="btn btn-raised waves-effect bg-red" type="submit">SIGN IN</a> 
          <a href="/signup" className="btn btn-raised waves-effect" type="submit">SIGN UP</a>
        </form>
      </div>
    );
  }
}
