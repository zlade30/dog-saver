import { handleActions } from 'redux-actions'
import { createAccountAction } from '../actions/user.action'

const defaultState = {
  user: {}
}

const reducer = handleActions(
  {
    [createAccountAction]: (state, { payload }) => {
      return {
        ...state,
        user: payload
      }
    }
  },
  defaultState
)

export default reducer
