import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../res/hacker_news_logo.jpg'

class Header extends Component {
  render() {
    return (
      <Nav className="navbar navbar-default">
        <div className="container">
          <NavBrand
            className="navbar-brand text-uppercase navbar-link"
            href="/"
          >
            <img src={logo} alt="logo" />
            Hacker News
          </NavBrand>

          <NavToggle
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <IconBar className="icon-bar" />
            <IconBar className="icon-bar" />
            <IconBar className="icon-bar" />
          </NavToggle>

          <NavCollapsed className="collapse navbar-collapse" id="navcol-1">
            <p className="navbar-text navbar-right">
              <Action
                className="navbar-link"
                href="http://localhost:4000/logout"
              >
                Log out
              </Action>
            </p>
          </NavCollapsed>
        </div>
      </Nav>
    )
  }
}

// styles ===========
const Nav = styled.nav`
  background: #324659;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #d0d8e1;
  border-radius: 0;
  box-shadow: none;
  border: none;
  margin-bottom: 0;
`

const NavToggle = styled.button`border: none;`

const IconBar = styled.span`
  background-color: red;

  :hover,
  :focus {
    background: none;
  }
`

const NavCollapsed = styled.div`border-top-color: #3d5368;`

const Action = styled.a`
  margin-right: 7px;
  text-decoration: none;
  color: #d0d8e1;
`

const NavBrand = styled.a`
  font-weight: bold;
  color: inherit;

  :hover {
    color: #b4b8be;
  }

  > img {
    height: 100%;
    display: inline-block;
    margin-right: 10px;
    width: auto;
  }
`

// ==================
export default Header
