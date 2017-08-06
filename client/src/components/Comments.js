import React, { Component } from 'react'

import './styles/Comments.css'

class Comments extends Component {
  render() {
    return (
      <div className="comments-component">
        <span>
          {this.props.text}
        </span>
        {this.props.comments.map(comment =>
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
export default Comments
