import { createAction } from 'redux-actions'

export const createActivityAction = createAction(
  'activity/CREATE_ACTIVITY_ACTION'
)
export const createActivityActionSuccess = createAction(
  'activity/CREATE_ACTIVITY_ACTION_SUCCESS'
)
export const createActivityActionFailed = createAction(
  'activity/CREATE_ACTIVITY_ACTION_FAILED'
)
export const updateActivityAction = createAction(
  'activity/UPDATE_ACTIVITY_ACTION'
)
export const updateActivityActionSuccess = createAction(
  'activity/UPDATE_ACTIVITY_ACTION_SUCCESS'
)
export const updateActivityActionFailed = createAction(
  'activity/UPDATE_ACTIVITY_ACTION_FAILED'
)
export const removeActivityAction = createAction(
  'activity/REMOVE_ACTIVITY_ACTION'
)
export const removeActivityActionSuccess = createAction(
  'activity/REMOVE_ACTIVITY_ACTION_SUCCESS'
)
export const removeActivityActionFailed = createAction(
  'activity/REMOVE_ACTIVITY_ACTION_FAILED'
)
export const getActivityListAction = createAction(
  'activity/GET_ACTIVITY_LIST_ACTION'
)
export const getActivityListActionSuccess = createAction(
  'activity/GET_ACTIVITY_LIST_ACTION_SUCCESS'
)
export const getActivityListActionFailed = createAction(
  'activity/GET_ACTIVITY_LIST_ACTION_FAILED'
)
