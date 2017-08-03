import React, { Component } from 'react'

import News from './News'

// constants =========
const title =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a ipsum consectetur purus mollis tincidunt vitaeut orci. Mauris efficitur.'
const numComments = 10000
const creationDate = '17 minutes ago'
const score = 60

class NewsList extends Component {
  render() {
    return (
      <News
        title={title}
        score={score}
        numComments={numComments}
        creationDate={creationDate}
      />
    )
  }
}

// ==================
export default NewsList
