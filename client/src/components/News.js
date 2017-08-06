import React, { Component } from 'react'
import Modal from 'react-modal'
import { withApollo } from 'react-apollo'
import moment from 'moment'

import './styles/News.css'

import storyCommentsQuery from '../queries/storyComments'
import Comments from './Comments'

class News extends Component {
  state = { modalIsOpen: false, loadingComments: false, comments: [] }

  render() {
    const { score, url, title, numComments, creationDate } = this.props
    const date = moment
      .duration(new Date(creationDate * 1000).getMinutes(), 'minutes')
      .humanize()

    return (
      <div>
        <div className="container news-component">
          <div className="well well-sm news-well">
            <div className="row">
              <div className="col-sm-1 col-xs-2">
                <div className="row">
                  <div className="col-md-12 news-score-container">
                    <span className="label label-default news-score">
                      {score}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-11 col-xs-10">
                <div className="row">
                  <div className="col-xs-12">
                    <p className="news-title">
                      <a href={url}>
                        {title}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 col-sm-3 col-xs-6">
                    <p className="news-comments">
                      <a onClick={() => this._openModal()}>
                        {numComments} comments
                      </a>
                    </p>
                  </div>
                  <div>
                    <p>
                      {date} ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this._renderModal()}
      </div>
    )
  }

  _renderModal = () => {
    const { modalIsOpen, loadingComments } = this.state
    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={this._fetchComments}
        contentLabel="Stories Comments Modal"
        style={{ content: { backgroundColor: '#3d5368' } }}
      >
        <bottom className="btn btn-default" onClick={this._closeModal}>
          Close
        </bottom>
        {loadingComments ? <div className="loader" /> : this._renderComments()}
      </Modal>
    )
  }

  _openModal = () => {
    this.setState({ modalIsOpen: true, loadingComments: true })
  }

  _closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  _fetchComments = async () => {
    const { client, id } = this.props

    this.setState({ loadingComments: true })

    const res = await client.query({
      query: storyCommentsQuery,
      variables: { id },
    })

    this.setState({ loadingComments: false, comments: res.data.storyComments })
  }

  _renderComments = () => {
    const { comments } = this.state
    return comments.map(comment =>
      <Comments
        key={comment.id}
        text={comment.text}
        comments={comment.comments}
      />,
    )
  }
}

// ==================
export default withApollo(News)
