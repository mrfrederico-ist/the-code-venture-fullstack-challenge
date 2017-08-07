import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import moment from 'moment'

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
      <ul className="comments-component">
        {this._renderComments(comments)}
      </ul>
    )
  }

  _renderComments = comments =>
    comments.map(comment => {
      const { id, author, text } = comment

      const creationDate = moment
        .duration(new Date(comment.creationDate * 1000).getMinutes(), 'minutes')
        .humanize()

      return (
        <div key={id} className="comment">
          <div className="row">
            <div className="col-md-12 comment-author">
              <div className="label label-default">
                {`${author} ${creationDate}`}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <li>
                <p dangerouslySetInnerHTML={{ __html: text }} />
                {this._renderKids(comment)}
              </li>
            </div>
          </div>
        </div>
      )
    })

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
        <div className="row load-more">
          <div className="col-md-12" style={{ fontWeight: 'bold' }}>
            <a onClick={() => this.props.fetchCommentsKids(comment.id)}>
              {`load more comments (${comment.numKids} replies)`}
            </a>
          </div>
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
