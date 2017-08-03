import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import styled from 'styled-components'

import currentUserQuery from '../queries/currentUser'

import logo from '../res/hacker_news_logo.jpg'

class Login extends Component {
  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user)
      this.props.history.push('/')
  }

  render() {
    if (this.props.data.loading) {
      return <div />
    }

    return (
      <Container>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <Button
          href="http://localhost:4000/login"
          className="btn btn-primary btn-block"
          role="button">
          <i className="fa fa-github" /> Sign in with GitHub
        </Button>
      </Container>
    )
  }
}

// styles ===========
const Container = styled.div`
  max-width: 320px;
  width: 90%;
  background-color: #324659;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
`

const Logo = styled.div`
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
`

const Button = styled.a`
  color: #d0d8e1;
  background: #444;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;

  :active {
    transform: translateY(1px);
  }

  :hover,
  :focus,
  :active,
  :active:hover,
  :active:focus {
    background: #2b2b2b;
    outline: none;
  }

  > i {
    font-size: 18px;
    padding: 5px;
  }
`

// ==================
export default graphql(currentUserQuery)(Login)
