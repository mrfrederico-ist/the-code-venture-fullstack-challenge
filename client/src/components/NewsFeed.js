import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/NewsFeed.css'

import NewsList from './NewsList'
import topStoriesQuery from '../queries/topStories'

class NewsFeed extends Component {
  render() {
    const { error, topStories } = this.props

    return (
      <div className="news-feed-component">
        {error
          ? <div style={{ textAlign: 'center', padding: 15 }}>
              Error connecting with server
            </div>
          : null}
        <NewsList stories={topStories || []} />
        <div className="btn-container">
          {this._showLoadMore()}
        </div>
      </div>
    )
  }

  _showLoadMore = () => {
    const { loading, topStories, loadMoreStories } = this.props
    if (loading) return <div className="loader" />
    else if (!topStories) {
      return (
        <a href="/">
          <i className="fa fa-refresh" style={{ fontSize: '50' }} />
        </a>
      )
    }
    return (
      <button className="btn btn-load-more" onClick={loadMoreStories}>
        Load more stories
      </button>
    )
  }
}

// ==================
export default graphql(topStoriesQuery, {
  options: () => ({
    variables: { first: 10, after: 0, reload: true },
    notifyOnNetworkStatusChange: true,
  }),
  props({ data: { loading, error, topStories, fetchMore } }) {
    return {
      loading,
      error,
      topStories,
      loadMoreStories() {
        const after = topStories ? topStories.length : 0

        return fetchMore({
          variables: { after, reload: false },
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
