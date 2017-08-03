import React, { Component } from 'react'

import Header from './Header'
import NewsList from './NewsList'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NewsList />
      </div>
    )
  }
}

// ==================
export default App
