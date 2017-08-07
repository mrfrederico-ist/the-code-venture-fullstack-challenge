import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  createNetworkInterface,
  ApolloClient,
  ApolloProvider,
} from 'react-apollo'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import './index.css'

import reducers from './reducers'
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

export const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject,
})

const store = createStore(reducers, {}, applyMiddleware(thunk))

// ====================
ReactDOM.render(
  <ApolloProvider client={apolloClient} store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={requireAuth(App)} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

// ===================
registerServiceWorker()
