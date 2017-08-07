import React, { Component } from 'react'
import Modal from 'react-modal'
import { withApollo } from 'react-apollo'
import moment from 'moment'

import './styles/News.css'
import storyCommentsQuery from '../queries/storyComments'
import Comments from './Comments'

class News extends Component {
  state = { modalIsOpen: false }

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
                      {numComments > 0
                        ? <a
                            onClick={() => this._openModal()}
                            onMouseOver={this._preFetchComments}
                          >
                            {numComments} comments
                          </a>
                        : 'no comments'}
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
    const { modalIsOpen } = this.state
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this._closeModal}
        contentLabel="Stories Comments Modal"
        style={{ content: { backgroundColor: '#3d5368' } }}
      >
        <div className="modal-component">
          <div className="row">
            <div className="col-xs-10">
              <a href={this.props.url}>
                <h4 style={{ fontWeight: 'bold' }}>
                  {this.props.title}
                </h4>
              </a>
            </div>
            <div
              className="col-xs-2 text-right"
              style={{ fontSize: 'x-large' }}
            >
              <a onClick={this._closeModal}>
                <i className="fa fa-close" />
              </a>
            </div>
          </div>
        </div>
        <Comments storyId={this.props.id} />
      </Modal>
    )
  }

  _openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  _closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  _preFetchComments = async () => {
    const { client, id } = this.props

    const res = await client.query({
      query: storyCommentsQuery,
      variables: { id },
    })
    client.writeQuery({
      query: storyCommentsQuery,
      data: res.data,
    })
  }
}

// ==================
export default withApollo(News)
