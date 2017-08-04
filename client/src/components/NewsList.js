import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/NewsList.css'

import News from './News'
import topStoriesQuery from '../queries/topStories'

class NewsList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loader" />
    }
    return (
      <div>
        {this.props.data.topStories.map(
          ({ id, url, title, score, numComments, creationDate }) =>
            <News
              key={id}
              url={url}
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
  options: ({ first, after, reload }) => ({
    variables: { first, after, reload },
  }),
})(NewsList)
