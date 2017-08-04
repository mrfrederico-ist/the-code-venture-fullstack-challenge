import React, { Component } from 'react'

import Header from './Header'
import NewsList from './NewsList'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NewsList first={10} after={0} reload={true} />
      </div>
    )
  }
}

// ==================
export default App
