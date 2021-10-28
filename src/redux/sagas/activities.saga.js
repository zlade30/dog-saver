import { firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload } from 'utils/helpers'
import {
  createActivityAction,
  createActivityActionFailed,
  createActivityActionSuccess,
  getActivityListAction,
  getActivityListActionFailed,
  getActivityListActionSuccess,
  removeActivityAction,
  removeActivityActionFailed,
  removeActivityActionSuccess,
  updateActivityAction,
  updateActivityActionFailed,
  updateActivityActionSuccess
} from '../actions/activities.action'

function* createActivity(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const createActivityCall = async (payload) => {
    try {
      const result = await payload
      return { isSuccess: true, data: result.id }
    } catch (error) {
      return { isSuccess: false, data: error }
    }
  }

  const response = yield call(
    createActivityCall,
    firestore.collection('activities').add(data)
  )
  if (response) {
    yield put(createActivityActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(createActivityActionFailed('Error creating activity!'))
    yield call(onFailure, 'Error creating activity!')
  }
}

function* updateActivity(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const updateActivityCall = async (payload) => {
    try {
      const result = await payload
      return { isSuccess: true, data: result }
    } catch (error) {
      return { isSuccess: false, data: error }
    }
  }

  const response = yield call(
    updateActivityCall,
    firestore.doc(`activities/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(updateActivityActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(updateActivityActionFailed('Error updating activity!'))
    yield call(onFailure, 'Error updating activity!')
  }
}

const handleGetActivityListQuery = (data) => {
  let query = null
  if (data.emailOwner === 'admin@dogsaver.com') {
    query = firestore.collection('activities')
  } else {
    query = firestore
      .collection('activities')
      .where('user.email', '==', data?.emailOwner)
  }
  query = query.where('archive', '==', data.archive)
  return query.get()
}

function* getActivityList(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const getActivityListCall = async (payload) => {
    try {
      const result = await payload
      return {
        isSuccess: true,
        data: result.docs.map((item) => ({ ...item.data(), id: item.id }))
      }
    } catch (error) {
      return { isSuccess: false, data: error }
    }
  }

  const response = yield call(
    getActivityListCall,
    handleGetActivityListQuery(data)
  )
  if (response) {
    yield put(getActivityListActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(getActivityListActionFailed('Error fetching activity list!'))
    yield call(onFailure, 'Error fetching activity list!')
  }
}

function* removeActivity(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const removeActivityCall = async (payload) => {
    try {
      const result = await payload
      return { isSuccess: true, data: result }
    } catch (error) {
      return { isSuccess: false, data: error }
    }
  }
  const isArchive = data?.values?.archive

  const response = yield call(
    removeActivityCall,
    firestore.doc(`activities/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(removeActivityActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(
      removeActivityActionFailed(
        `Error ${isArchive ? 'removing' : 'restoring'} a dog!`
      )
    )
    yield call(
      onFailure,
      `Error ${isArchive ? 'removing' : 'restoring'} a dog!`
    )
  }
}

export default function* root() {
  yield all([
    takeLatest(createActivityAction.toString(), createActivity),
    takeLatest(updateActivityAction.toString(), updateActivity),
    takeLatest(removeActivityAction.toString(), removeActivity),
    takeLatest(getActivityListAction.toString(), getActivityList)
  ])
}
