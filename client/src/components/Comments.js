import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import './styles/Comments.css'

import fetchCommentsKids from '../actions/fetchCommentsKidsAction'
import storyCommentsQuery from '../queries/storyComments'
import { Loader, Reload, Error } from './common'

class Comments extends Component {
  render() {
    let { comments } = this.props

    const { data } = this.props
    if (data) {
      if (data.loading) return <Loader />
      else if (data.error) {
        return (
          <div>
            <Error>Error loading comments, please try again</Error>
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
    const { kids, loadingKids, error } = this.props.commentsKids

    if (error[comment.id]) {
      return (
        <div>
          <Error>Error loading more comments, please try again</Error>
          <Reload onClick={() => this.props.fetchCommentsKids(comment.id)} />
        </div>
      )
    }

    if (comment.comments) {
      return (
        <Comments
          commentsKids={this.props.commentsKids}
          fetchCommentsKids={this.props.fetchCommentsKids}
          comments={comment.comments}
        />
      )
    } else if (kids[comment.id]) {
      return (
        <Comments
          commentsKids={this.props.commentsKids}
          fetchCommentsKids={this.props.fetchCommentsKids}
          comments={kids[comment.id]}
        />
      )
    } else if (comment.hasKids) {
      if (loadingKids[comment.id]) return <Loader />

      return (
        <div>
          <button
            className="btn btn-default"
            onClick={() => this.props.fetchCommentsKids(comment.id)}
          >
            Load More
          </button>
        </div>
      )
    }
    return null
  }
}

// ==================
const mapStateToProps = ({ commentsKids }) => ({ commentsKids })

export default compose(
  graphql(storyCommentsQuery, {
    options: ({ storyId }) => ({
      variables: { id: storyId },
      notifyOnNetworkStatusChange: true,
    }),
  }),
  connect(mapStateToProps, { fetchCommentsKids }),
)(Comments)
