import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import logo from '../res/logo.svg'

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Logo src={logo} alt="logo" />
          <h2>Welcome to React</h2>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
        <a href="http://localhost:4000/login">Login with GitHub</a>
      </Container>
    )
  }
}

// styles ===========
const Container = styled.div`text-align: center;`

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`

const logoSpin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Logo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`

const Intro = styled.p`font-size: large;`

// ==================
export default App
