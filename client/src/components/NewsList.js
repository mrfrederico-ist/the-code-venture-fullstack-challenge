import React, { Component } from 'react'

import News from './News'

class NewsList extends Component {
  render() {
    return (
      <div>
        {this.props.stories.map(
          ({ id, url, title, score, numComments, creationDate }) =>
            <News
              key={id}
              id={id}
              url={url}
              title={title}
              score={score}
              numComments={numComments}
              creationDate={creationDate}
            />,
        )}
      </div>
    )
  }
}

// ==================
export default NewsList
