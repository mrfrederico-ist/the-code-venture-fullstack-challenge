import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import currentUserQuery from '../queries/currentUser'

import './styles/Login.css'
import logo from '../res/hacker_news_logo.png'

class Login extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user)
      this.props.history.push('/')
  }

  render() {
    return (
      <div className="login login-component">
        <div className="illustration">
          <img src={logo} alt="logo" />
        </div>
        <a
          className="btn btn-primary btn-block"
          role="button"
          href="http://localhost:4000/login"
        >
          <i className="fa fa-github" /> Sign in with GitHub
        </a>
      </div>
    )
  }
}

// ==================
export default graphql(currentUserQuery)(Login)
