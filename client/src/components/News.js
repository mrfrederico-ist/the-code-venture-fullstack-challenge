import React, { Component } from 'react'

import './styles/News.css'

class News extends Component {
  render() {
    return (
      <div className="container news-component">
        <div className="well well-sm news-well">
          <div className="row">
            <div className="col-sm-1 col-xs-2">
              <div className="row">
                <div className="col-md-12 news-score-container">
                  <span className="label label-default news-score">
                    {this.props.score}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-11 col-xs-10">
              <div className="row">
                <div className="col-xs-12">
                  <p className="news-title">
                    <a href={this.props.url}>
                      {this.props.title}
                    </a>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 col-sm-3 col-xs-6">
                  <p>
                    {this.props.numComments} comments
                  </p>
                </div>
                <div>
                  <p>
                    {this.props.creationDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// ==================
export default News
