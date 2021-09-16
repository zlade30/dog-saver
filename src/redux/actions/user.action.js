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
export const getUserAction = createAction('user/GET_USER_ACTION')
export const getUserActionSuccess = createAction('user/GET_USER_ACTION_SUCCESS')
export const getUserActionFailed = createAction('user/GET_USER_ACTION_FAILED')
export const signInAction = createAction('user/SIGN_IN_ACTION')
export const signInActionSuccess = createAction('user/SIGN_IN_ACTION_SUCCESS')
export const signInActionFailed = createAction('user/SIGN_IN_ACTION_FAILED')
