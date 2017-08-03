import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  createNetworkInterface,
  ApolloClient,
  ApolloProvider,
} from 'react-apollo'

import requireAuth from './components/requireAuth'
import App from './components/App'
import Login from './components/Login'

import registerServiceWorker from './utils/registerServiceWorker'

const dataIdFromObject = obj => {
  if (obj.__typename) {
    if (obj.id !== undefined) {
      return `${obj.__typename}:${obj.id}`
    }
  }
  return null
}

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
  opts: { credentials: 'include' },
})

const client = new ApolloClient({ networkInterface, dataIdFromObject })

// ====================
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={requireAuth(App)} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

registerServiceWorker()
