import { combineReducers } from 'redux'

import fetchCommentsKidsReducer from './fetchCommentsKidsReducer'

export default combineReducers({
  commentsKids: fetchCommentsKidsReducer,
})
