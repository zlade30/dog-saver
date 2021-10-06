import { firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  deconstructSagaPayload,
  dogFilterOptions,
  dogOptions,
  userSortOptions
} from 'utils/helpers'
import {
  createDogAction,
  createDogActionFailed,
  createDogActionSuccess,
  removeDogAction,
  removeDogActionFailed,
  removeDogActionSuccess,
  updateDogAction,
  updateDogActionFailed,
  updateDogActionSuccess,
  getDogsAction,
  getDogsActionFailed,
  getDogsActionSuccess,
  getDogBreedsActionSuccess,
  getDogBreedsActionFailed,
  getDogBreedsAction
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

const returnSelectedOptions = (data) => {
  let query = null
  if (data.emailOwner === 'admin@dogsaver.com') {
    query = firestore.collection('dogs')
  } else {
    query = firestore.collection('dogs').where('owner', '==', data?.emailOwner)
  }

  switch (data.filterBy) {
    case dogOptions[0].value:
      query = query.where('archive', '==', false)
      break
    case dogOptions[1].value:
      query = query.where('archive', '==', true)
      break
    case dogFilterOptions[0].value:
      query = query.where('status.value', '==', dogFilterOptions[0].value)
      break
    case dogFilterOptions[1].value:
      query = query.where('status.value', '==', dogFilterOptions[1].value)
      break
    case dogFilterOptions[2].value:
      query = query.where('status.value', '==', dogFilterOptions[2].value)
      break
    case dogFilterOptions[3].value:
      query = query.where('status.value', '==', dogFilterOptions[3].value)
      break
    case dogFilterOptions[4].value:
      query = query.where('status.value', '==', dogFilterOptions[4].value)
      break
  }

  if (data.sortBy === userSortOptions[0].value)
    query = query.orderBy('dateAdded', data.order)
  else {
    query = query.orderBy('name', data.order)
  }

  return query.get()
}

function* getDogs(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const response = yield call(getList, returnSelectedOptions(data))

  if (response?.isSuccess) {
    yield put(getDogsActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getDogsActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* getDogBreeds(action) {
  const { onSuccess, onFailure } = deconstructSagaPayload(action.payload)

  let query = firestore.collection('breed').get()
  const response = yield call(getList, query)

  if (response?.isSuccess) {
    yield put(getDogBreedsActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getDogBreedsActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* createDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(create, firestore.collection('dogs').add(data))
  if (response?.isSuccess) {
    yield put(createDogActionSuccess(response?.data))
    yield call(onSuccess, response?.data)
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
  if (response?.isSuccess) {
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
    takeLatest(getDogsAction.toString(), getDogs),
    takeLatest(getDogBreedsAction.toString(), getDogBreeds)
  ])
}
