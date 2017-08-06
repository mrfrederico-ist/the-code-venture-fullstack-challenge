import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'

import './styles/Comments.css'

import storyCommentsQuery from '../queries/storyComments'
import { Loader, Reload, Error } from './common'

class Comments extends Component {
  state = { kids: {}, loadingKids: {} }

  render() {
    const { data } = this.props
    let { comments } = this.props

    if (data && data.loading) return <Loader />
    else if (data) {
      if (data.error) {
        return (
          <div>
            <Error>Error loading comments</Error>
            <Reload onClick={() => data.refetch({ forceFetch: true })} />
          </div>
        )
      }
      comments = data.storyComments
    }
    return (
      <div className="comments-component">
        {comments.map(comment =>
          <div key={comment.id} className="comment">
            <span>
              {comment.text}
            </span>
            {this._renderKids(comment)}
          </div>,
        )}
      </div>
    )
  }

  _renderKids = comment => {
    const { kids, loadingKids } = this.state

    if (comment.comments) {
      return <Comments client={this.props.client} comments={comment.comments} />
    } else if (kids[comment.id]) {
      return <Comments client={this.props.client} comments={kids[comment.id]} />
    } else if (comment.hasKids) {
      if (loadingKids[comment.id]) return <Loader />

      return (
        <div>
          <button
            className="btn btn-default"
            onClick={() => this._fetchKids(comment.id)}
          >
            Load More
          </button>
        </div>
      )
    }
    return null
  }

  _fetchKids = async id => {
    const { client } = this.props

    this._loadingKids(id, true)

    const res = await client.query({
      query: storyCommentsQuery,
      variables: { id },
    })

    this._loadingKids(id, false, res.data.storyComments)
  }

  _loadingKids = (id, isLoading, newKids) => {
    const { loadingKids, kids } = this.state

    loadingKids[id] = isLoading
    kids[id] = newKids

    this.setState({ loadingKids, kids })
  }
}

// ==================
export default graphql(storyCommentsQuery, {
  options: ({ storyId }) => ({
    variables: { id: storyId },
    notifyOnNetworkStatusChange: true,
  }),
})(withApollo(Comments))
