import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/Loader.css'

import NewsList from './NewsList'
import topStoriesQuery from '../queries/topStories'

class NewsFeed extends Component {
  render() {
    const { loading, topStories, loadMoreStories } = this.props

    if (loading) {
      return <div className="loader" />
    }

    return (
      <div>
        <NewsList stories={topStories || []} />
        <div style={{ textAlign: 'center', padding: 15 }}>
          <button className="btn btn-primary" onClick={loadMoreStories}>
            Load more stories
          </button>
        </div>
      </div>
    )
  }
}

// ==================
export default graphql(topStoriesQuery, {
  options: () => ({
    variables: { first: 10, after: 0 },
  }),
  props({ data: { loading, topStories, fetchMore } }) {
    return {
      loading,
      topStories,
      loadMoreStories() {
        return fetchMore({
          variables: { after: topStories.length },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            ...previousResult,
            topStories: [
              ...previousResult.topStories,
              ...fetchMoreResult.topStories,
            ],
          }),
        })
      },
    }
  },
})(NewsFeed)
