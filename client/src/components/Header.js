import React, { Component } from 'react'

import './styles/Header.css'
import logo from '../res/hacker_news_logo.png'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default header-component ">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand text-uppercase navbar-link" href="/">
                <img src={logo} alt="logo" />
                Top Stories
              </a>
              <button
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
              <p className="navbar-text navbar-right actions">
                <a
                  className="navbar-link logout"
                  href="http://localhost:4000/logout"
                >
                  Log out
                </a>
              </p>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

// ==================
export default Header
