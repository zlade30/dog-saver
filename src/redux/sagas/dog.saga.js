import { firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload } from 'utils/helpers'
import {
  createDogAction,
  createDogActionFailed,
  createDogActionSuccess,
  removeDogAction,
  removeDogActionFailed,
  removeDogActionSuccess,
  selEuthSched,
  selEuthSchedFailed,
  selEuthSchedSuccess,
  updateDogAction,
  updateDogActionFailed,
  updateDogActionSuccess,
  getDogsAction,
  getDogsActionFailed,
  getDogsActionSuccess
} from '../actions/dog.action'

const getList = async (payload) => {
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

const create = async (payload) => {
  try {
    const result = await payload
    return { isSuccess: true, data: result.id }
  } catch (error) {
    return { isSuccess: false, data: error }
  }
}

const update = async (payload) => {
  try {
    const result = await payload
    return { isSuccess: true, data: result }
  } catch (error) {
    return { isSuccess: false, data: error }
  }
}

const send = async (payload) => {
  try {
    console.log(payload)
    const result = await emailjs.send(
      payload?.serviceID,
      payload?.templateID,
      payload?.templatePrams
    )
    return { isSuccess: true, data: result }
  } catch (error) {
    return { isSuccess: false, data: error }
  }
}

function* getDogs(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  let query = null

  if (data.emailOwner === 'admin@dogsaver.com') {
    query = firestore.collection('dogs').get()
  } else {
    query = firestore
      .collection('dogs')
      .where('owner', '==', data?.emailOwner)
      .get()
  }

  const response = yield call(getList, query)

  if (response?.isSuccess) {
    yield put(getDogsActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getDogsActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* createDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(create, firestore.collection('dogs').add(data))
  if (response) {
    yield put(createDogActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(createDogActionFailed('Error creating dog'))
    yield call(onFailure, 'Error creating dog!')
  }
}

function* updateDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    update,
    firestore.doc(`dogs/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(updateDogActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(updateDogActionFailed('Error updating dog'))
    yield call(onFailure, 'Error updating dog!')
  }
}

function* removeDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    update,
    firestore.doc(`dogs/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(removeDogActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(removeDogActionFailed('Error removing dog'))
    yield call(onFailure, 'Error removing dog!')
  }
}

export default function* root() {
  yield all([
    takeLatest(createDogAction.toString(), createDog),
    takeLatest(updateDogAction.toString(), updateDog),
    takeLatest(removeDogAction.toString(), removeDog),
    takeLatest(getDogsAction.toString(), getDogs)
  ])
}
