import { createAction } from 'redux-actions'

export const addAnnouncementAction = createAction(
  'announcement/ADD_ANNOUNCEMENT_ACTION'
)
export const addAnnouncementActionSuccess = createAction(
  'announcement/ADD_ANNOUNCEMENT_ACTION_SUCCESS'
)
export const addAnnouncementActionFailed = createAction(
  'announcement/ADD_ANNOUNCEMENT_ACTION_FAILED'
)
export const removeAnnouncementAction = createAction(
  'announcement/REMOVE_ANNOUNCEMENT_ACTION'
)
export const removeAnnouncementActionSuccess = createAction(
  'announcement/REMOVE_ANNOUNCEMENT_ACTION_SUCCESS'
)
export const removeAnnouncementActionFailed = createAction(
  'announcement/REMOVE_ANNOUNCEMENT_ACTION_FAILED'
)
export const updateAnnouncementAction = createAction(
  'announcement/UPDATE_ANNOUNCEMENT_ACTION'
)
export const updateAnnouncementActionSuccess = createAction(
  'announcement/UPDATE_ANNOUNCEMENT_ACTION_SUCCESS'
)
export const updateAnnouncementActionFailed = createAction(
  'announcement/UPDATE_ANNOUNCEMENT_ACTION_FAILED'
)
export const getAnnouncementsAction = createAction(
  'announcement/GET_ANNOUNCEMENTS_ACTION'
)
export const getAnnouncementsActionSuccess = createAction(
  'announcement/GET_ANNOUNCEMENTS_ACTION_SUCCESS'
)
export const getAnnouncementsActionFailed = createAction(
  'announcement/GET_ANNOUNCEMENTS_ACTION_FAILED'
)
