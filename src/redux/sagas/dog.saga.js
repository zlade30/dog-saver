import { firestore, storage } from 'firebase'
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
  getDogBreedsAction,
  createDogImpoundActionSuccess,
  createDogImpoundActionFailed,
  createDogImpoundAction,
  updateDogImpoundActionSuccess,
  updateDogImpoundActionFailed,
  updateDogImpoundAction,
  getDogImpoundListActionSuccess,
  getDogImpoundListActionFailed,
  getDogImpoundListAction,
  removeDogImpoundActionSuccess,
  removeDogImpoundActionFailed,
  removeDogImpoundAction
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
  console.log(data)
  let query = null
  if (data.emailOwner === 'admin@dogsaver.com') {
    query = firestore.collection('dogs')
  } else {
    query = firestore
      .collection('dogs')
      .where('owner.value.email', '==', data?.emailOwner)
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

const upload = async (payload) => {
  try {
    const result = await payload
    const url = await result.ref.getDownloadURL()
    console.log(url)
    return { isSuccess: true, data: url }
  } catch (error) {
    return { isSuccess: false, data: error }
  }
}

function* createDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  let profiles = []

  for (let i = 0; i < data?.profile?.length; i++) {
    let profile = data?.profile[i]
    if (typeof profile === 'string') {
      profiles = [...profiles, profile]
    } else {
      const ref = storage
        .ref()
        .child(`dogs/${(Math.random() + 1).toString(36).substring(2)}.jpeg`)
      const res = yield call(
        upload,
        ref.put(profile, { contentType: 'image/jpeg' })
      )
      profiles = [...profiles, res?.data]
    }
    console.log(profiles)
  }

  const response = yield call(
    create,
    firestore.collection('dogs').add({ ...data, profile: profiles })
  )
  if (response?.isSuccess) {
    yield put(createDogActionSuccess(response?.data))
    yield call(onSuccess, { id: response?.data, profile: profiles })
  } else {
    yield put(createDogActionFailed('Error creating dog'))
    yield call(onFailure, 'Error creating dog!')
  }
}

function* updateDog(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  let profiles = []

  for (let i = 0; i < data?.values?.profile?.length; i++) {
    let profile = data?.values?.profile[i]
    const ref = storage
      .ref()
      .child(`dogs/${(Math.random() + 1).toString(36).substring(2)}.jpeg`)
    let res = { data: '' }
    if (typeof profile !== 'string') {
      res = yield call(upload, ref.put(profile, { contentType: 'image/jpeg' }))
    }
    profiles = [...profiles, typeof profile === 'string' ? profile : res?.data]
  }

  console.log(profiles)

  const response = yield call(
    update,
    firestore
      .doc(`dogs/${data?.id}`)
      .update({ ...data?.values, profile: profiles })
  )
  if (response?.isSuccess) {
    yield put(updateDogActionSuccess(response))
    yield call(onSuccess, profiles)
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

function* createDogImpound(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  let profiles = []

  for (let i = 0; i < data?.profile?.length; i++) {
    let profile = data?.profile[i]
    if (typeof profile === 'string') {
      profiles = [...profiles, profile]
    } else {
      const ref = storage
        .ref()
        .child(`dogs/${(Math.random() + 1).toString(36).substring(2)}.jpeg`)
      const res = yield call(
        upload,
        ref.put(profile, { contentType: 'image/jpeg' })
      )
      profiles = [...profiles, res?.data]
    }
    console.log(profiles)
  }

  const response = yield call(
    create,
    firestore.collection('dog-impound').add({ ...data, profile: profiles })
  )
  if (response) {
    yield put(createDogImpoundActionSuccess(response))
    yield call(onSuccess, { id: response?.data, profile: profiles })
  } else {
    yield put(createDogImpoundActionFailed('Error creating dog!'))
    yield call(onFailure, 'Error creating dog!')
  }
}

function* updateDogImpound(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  let profiles = []

  for (let i = 0; i < data?.values?.profile?.length; i++) {
    let profile = data?.values?.profile[i]
    const ref = storage
      .ref()
      .child(`dogs/${(Math.random() + 1).toString(36).substring(2)}.jpeg`)
    let res = { data: '' }
    if (typeof profile !== 'string') {
      res = yield call(upload, ref.put(profile, { contentType: 'image/jpeg' }))
    }
    profiles = [...profiles, typeof profile === 'string' ? profile : res?.data]
  }

  console.log(profiles)

  const response = yield call(
    update,
    firestore
      .doc(`dog-impound/${data?.id}`)
      .update({ ...data?.values, profile: profiles })
  )
  if (response) {
    yield put(updateDogImpoundActionSuccess(response))
    yield call(onSuccess, profiles)
  } else {
    yield put(updateDogImpoundActionFailed('Error updating dog!'))
    yield call(onFailure, 'Error updating dog!')
  }
}

const handleGetDogImpoundListQuery = (data) => {
  let query = firestore
    .collection('dog-impound')
    .where('archive', '==', data.archive)
  return query.get()
}

function* getDogImpoundList(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const getDogImpoundListCall = async (payload) => {
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
    getDogImpoundListCall,
    handleGetDogImpoundListQuery(data)
  )
  if (response) {
    yield put(getDogImpoundListActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(getDogImpoundListActionFailed('Error fetching dog list!'))
    yield call(onFailure, 'Error fetching dog list!')
  }
}

function* removeDogImpound(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const removeDogImpoundCall = async (payload) => {
    try {
      const result = await payload
      return { isSuccess: true, data: result }
    } catch (error) {
      return { isSuccess: false, data: error }
    }
  }
  const isArchive = data?.values?.archive

  const response = yield call(
    removeDogImpoundCall,
    firestore.doc(`dog-impound/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(removeDogImpoundActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(
      removeDogImpoundActionFailed(
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
    takeLatest(createDogAction.toString(), createDog),
    takeLatest(updateDogAction.toString(), updateDog),
    takeLatest(removeDogAction.toString(), removeDog),
    takeLatest(getDogsAction.toString(), getDogs),
    takeLatest(getDogBreedsAction.toString(), getDogBreeds),
    takeLatest(updateDogImpoundAction.toString(), updateDogImpound),
    takeLatest(createDogImpoundAction.toString(), createDogImpound),
    takeLatest(getDogImpoundListAction.toString(), getDogImpoundList),
    takeLatest(removeDogImpoundAction.toString(), removeDogImpound)
  ])
}
