import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/NewsList.css'

import News from './News'
import topStoriesQuery from '../queries/topStories'

class NewsList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loader">Loading...</div>
    }
    return (
      <div>
        {this.props.data.topStories.map(
          ({ id, title, score, numComments, creationDate }) =>
            <News
              key={id}
              title={title}
              score={score}
              numComments={numComments}
              creationDate={creationDate}
            />,
        )}
      </div>
    )
  }
}

// ==================
export default graphql(topStoriesQuery, {
  options: { variables: { first: 10, after: 0 } },
})(NewsList)
