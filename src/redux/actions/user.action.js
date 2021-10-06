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
export const adminCreateAccountAction = createAction(
  'user/ADMIN_CREATE_ACCOUNT_ACTION'
)
export const adminCreateAccountActionSuccess = createAction(
  'user/ADMIN_CREATE_ACCOUNT_ACTION_SUCCESS'
)
export const adminCreateAccountActionFailed = createAction(
  'user/ADMIN_CREATE_ACCOUNT_ACTION_FAILED'
)
export const adminUpdateUserAction = createAction(
  'user/ADMIN_UPDATE_USER_ACTION'
)
export const adminUpdateUserActionSuccess = createAction(
  'user/ADMIN_UPDATE_USER_ACTION_SUCCESS'
)
export const adminUpdateUserActionFailed = createAction(
  'user/ADMIN_UPDATE_USER_ACTION_FAILED'
)
export const adminRemoveUserAction = createAction(
  'user/ADMIN_REMOVE_USER_ACTION'
)
export const adminRemoveUserActionSuccess = createAction(
  'user/ADMIN_REMOVE_USER_ACTION_SUCCESS'
)
export const adminRemoveUserActionFailed = createAction(
  'user/ADMIN_REMOVE_USER_ACTION_FAILED'
)
export const changePasswordAction = createAction('user/CHANGE_PASSWORD_ACTION')
export const changePasswordActionSuccess = createAction(
  'user/CHANGE_PASSWORD_ACTION_SUCCESS'
)
export const changePasswordActionFailed = createAction(
  'user/CHANGE_PASSWORD_ACTION_FAILED'
)
export const sendCredentialAction = createAction('user/SEND_CREDENTIAL_ACTION')
export const sendCredentialActionSuccess = createAction(
  'user/SEND_CREDENTIAL_ACTION_SUCCESS'
)
export const sendCredentialActionFailed = createAction(
  'user/SEND_CREDENTIAL_ACTION_FAILED'
)
export const getUserListAction = createAction('user/GET_USER_LIST_ACTION')
export const getUserListActionSuccess = createAction(
  'user/GET_USER_LIST_ACTION_SUCCESS'
)
export const getUserListActionFailed = createAction(
  'user/GET_USER_LIST_ACTION_FAILED'
)
export const getPuroksAction = createAction('GET_PUROKS_ACTION')
export const getPuroksActionSuccess = createAction('GET_PUROKS_ACTION_SUCCESS')
export const getPuroksActionFailed = createAction('GET_PUROKS_ACTION_FAILED')
