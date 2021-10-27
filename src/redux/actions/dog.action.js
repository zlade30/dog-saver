import { createAction } from 'redux-actions'

export const getDogsAction = createAction('dog/GET_DOGS_ACTION')
export const getDogsActionSuccess = createAction('dog/GET_DOGS_ACTION_SUCCESS')
export const getDogsActionFailed = createAction('dog/GET_DOGS_ACTION_FAILED')
export const createDogAction = createAction('dog/CREATE_DOG_ACTION')
export const createDogActionSuccess = createAction(
  'dog/CREATE_DOG_ACTION_SUCCESS'
)
export const createDogActionFailed = createAction(
  'dog/CREATE_DOG_ACTION_FAILED'
)
export const updateDogAction = createAction('dog/UPDATE_DOG_ACTION')
export const updateDogActionSuccess = createAction(
  'dog/UPDATE_DOG_ACTION_SUCCESS'
)
export const updateDogActionFailed = createAction(
  'dog/UPDATE_DOG_ACTION_FAILED'
)
export const removeDogAction = createAction('dog/REMOVE_DOG_ACTION')
export const removeDogActionSuccess = createAction(
  'dog/REMOVE_DOG_ACTION_SUCCESS'
)
export const removeDogActionFailed = createAction(
  'dog/REMOVE_DOG_ACTION_FAILED'
)
export const selEuthSched = createAction('dog/SELECT_EUTHANIZE_SCHEDULE_ACTION')
export const selEuthSchedSuccess = createAction(
  'dog/SELECT_EUTHANIZE_SCHEDULE_ACTION_SUCCESS'
)
export const selEuthSchedFailed = createAction(
  'dog/SELECT_EUTHANIZE_SCHEDULE_ACTION_FAILED'
)
export const getDogBreedsAction = createAction('dog/GET_DOG_BREEDS_ACTION')
export const getDogBreedsActionSuccess = createAction(
  'dog/GET_DOG_BREEDS_ACTION_SUCCESS'
)
export const getDogBreedsActionFailed = createAction(
  'dog/GET_DOG_BREEDS_ACTION_FAILED'
)

export const createDogImpoundAction = createAction(
  'dog/CREATE_DOG_IMPOUND_ACTION'
)
export const createDogImpoundActionSuccess = createAction(
  'dog/CREATE_DOG_IMPOUND_ACTION_SUCCESS'
)
export const createDogImpoundActionFailed = createAction(
  'dog/CREATE_DOG_IMPOUND_ACTION_FAILED'
)
export const getDogImpoundListAction = createAction(
  'dog/GET_DOG_IMPOUND_LIST_ACTION'
)
export const getDogImpoundListActionSuccess = createAction(
  'dog/GET_DOG_IMPOUND_LIST_ACTION_SUCCESS'
)
export const getDogImpoundListActionFailed = createAction(
  'dog/GET_DOG_IMPOUND_LIST_ACTION_FAILED'
)
export const updateDogImpoundAction = createAction(
  'dog/UPDATE_DOG_IMPOUND_ACTION'
)
export const updateDogImpoundActionSuccess = createAction(
  'dog/UPDATE_DOG_IMPOUND_ACTION_SUCCESS'
)
export const updateDogImpoundActionFailed = createAction(
  'dog/UPDATE_DOG_IMPOUND_ACTION_FAILED'
)
export const removeDogImpoundAction = createAction(
  'dog/REMOVE_DOG_IMPOUND_ACTION'
)
export const removeDogImpoundActionSuccess = createAction(
  'dog/REMOVE_DOG_IMPOUND_ACTION_SUCCESS'
)
export const removeDogImpoundActionFailed = createAction(
  'dog/REMOVE _DOG_IMPOUND_ACTION_FAILED'
)
