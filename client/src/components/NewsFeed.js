import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/NewsFeed.css'

import NewsList from './NewsList'
import topStoriesQuery from '../queries/topStories'
import { Loader, Reload, Error } from './common'

class NewsFeed extends Component {
  render() {
    const { error, topStories } = this.props

    return (
      <div className="news-feed-component">
        {error ? <Error>Error connecting with server</Error> : null}
        <NewsList stories={topStories || []} />
        <div className="btn-container">
          {this._showLoadMore()}
        </div>
      </div>
    )
  }

  _showLoadMore = () => {
    const { loading, refetch, topStories, loadMoreStories } = this.props
    if (loading) return <Loader />
    else if (!topStories)
      return <Reload onClick={() => refetch({ forceFetch: true })} />
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
  props({ data: { loading, error, refetch, topStories, fetchMore } }) {
    return {
      loading,
      error,
      refetch,
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
