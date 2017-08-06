import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import './styles/Comments.css'

import storyCommentsQuery from '../queries/storyComments'
import { Loader, Reload, Error } from './common'

class Comments extends Component {
  render() {
    const { data } = this.props
    let { comments } = this.props || []

    if (data && data.loading) return <Loader />
    else if (data) {
      if (data.error) {
        return (
          <div>
            <Error>Error loading comments</Error>
            <Reload onClick={data.refetch} />
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
