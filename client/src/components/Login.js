import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../res/hacker_news_logo.png'

class Login extends Component {
  render() {
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
  background-color: #3d5368;
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
export default Login