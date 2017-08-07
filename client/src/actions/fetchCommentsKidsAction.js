import { apolloClient } from '../'

import storyCommentsQuery from '../queries/storyComments'

// constants ========
export const LOADING_COMMENTS_KIDS = 'LOADING_COMMENTS_KIDS'

export const FETCH_COMMENTS_KIDS_SUCCESS = 'FETCH_COMMENTS_KIDS_SUCCESS'
export const FETCH_COMMENTS_KIDS_FAIL = 'FETCH_COMMENTS_KIDS_FAIL'

// ==================
export default id => async dispatch => {
  dispatch({ type: LOADING_COMMENTS_KIDS, payload: { id } })

  try {
    const res = await apolloClient.query({
      query: storyCommentsQuery,
      variables: { id },
    })

    dispatch({
      type: FETCH_COMMENTS_KIDS_SUCCESS,
      payload: { id, data: res.data.storyComments },
    })
  } catch (error) {
    dispatch({ type: FETCH_COMMENTS_KIDS_FAIL, payload: { id } })
  }
}
