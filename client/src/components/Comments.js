import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/Comments.css'

import storyCommentsQuery from '../queries/storyComments'

class Comments extends Component {
  render() {
    const { data } = this.props
    let { comments } = this.props || []

    if (data && data.loading) return <div className="loader" />
    else if (data) {
      if (data.error) {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: 15 }}>Error connecting with server</div>
            <a onClick={data.refetch()}>
              <i className="fa fa-refresh" style={{ fontSize: 50 }} />
            </a>
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
            {comment.comments && <Comments comments={comment.comments} />}
            {!comment.comments &&
              comment.hasKids &&
              <div>
                <button className="btn btn-default">Load More</button>
              </div>}
          </div>,
        )}
      </div>
    )
  }
}

// ==================
export default graphql(storyCommentsQuery, {
  options: ({ storyId }) => ({
    variables: { id: storyId },
    notifyOnNetworkStatusChange: true,
  }),
})(Comments)
