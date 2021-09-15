import { createAction } from 'redux-actions'

export const createAccountAction = createAction('user/CREATE_ACCOUNT_ACTION')
export const createAccountActionSuccess = createAction(
  'user/CREATE_ACCOUNT_ACTION_SUCCESS'
)
export const createAccountActionFailed = createAction(
  'user/CREATE_ACCOUNT_ACTION_FAILED'
)
export const createUserAction = createAction('user/CREATE_USER_ACTION')
export const createUserActionSuccess = createAction(
  'user/CREATE_USER_ACTION_SUCCESS'
)
export const createUserActionFailed = createAction(
  'user/CREATE_USER_ACTION_FAILED'
)
