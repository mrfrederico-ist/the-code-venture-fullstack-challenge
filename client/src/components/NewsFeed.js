import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/NewsFeed.css'
import './styles/Loader.css'

import NewsList from './NewsList'
import topStoriesQuery from '../queries/topStories'

class NewsFeed extends Component {
  render() {
    const { loading, topStories, loadMoreStories } = this.props

    return (
      <div className="news-feed-component">
        <NewsList stories={topStories || []} />
        <div className="btn-container">
          {loading ? <div className="loader" /> : null}
          <button className="btn btn-load-more" onClick={loadMoreStories}>
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
    variables: { first: 10, after: 0, reload: true },
    notifyOnNetworkStatusChange: true,
  }),
  props({ data: { loading, topStories, fetchMore } }) {
    return {
      loading,
      topStories,
      loadMoreStories() {
        return fetchMore({
          variables: { after: topStories.length, reload: false },
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
