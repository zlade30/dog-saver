import { createAction } from 'redux-actions'

export const uploadUserImageAction = createAction(
  'utils/UPLOAD_USER_IMAGE_ACTION'
)
export const uploadUserImageActionSuccess = createAction(
  'utils/UPLOAD_USER_IMAGE_ACTION_SUCCESS'
)
export const uploadUserImageActionFailed = createAction(
  'utils/UPLOAD_USER_IMAGE_ACTION_FAILED'
)
export const uploadDogImageAction = createAction(
  'utils/UPLOAD_DOG_IMAGE_ACTION'
)
export const uploadDogImageActionSuccess = createAction(
  'utils/UPLOAD_DOG_IMAGE_ACTION_SUCCESS'
)
export const uploadDogImageActionFailed = createAction(
  'utils/UPLOAD_DOG_IMAGE_ACTION_FAILED'
)
