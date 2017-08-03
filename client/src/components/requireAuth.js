import React from 'react'
import { graphql } from 'react-apollo'

import query from '../queries/currentUser'

export default WrappedComponent => {
  class RequireAuth extends React.Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user)
        this.props.history.push('/login')
    }

    render() {
      if (this.props.data.loading) return <div />

      return <WrappedComponent {...this.props} />
    }
  }
  return graphql(query)(RequireAuth)
}
