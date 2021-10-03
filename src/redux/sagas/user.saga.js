import { auth, firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload, orderOptions, renderAuthErrorCode, userFilterOptions, userSortOptions } from 'utils/helpers'
import {
  adminRemoveUserAction,
  adminRemoveUserActionFailed,
  adminRemoveUserActionSuccess,
  adminUpdateUserAction,
  adminUpdateUserActionFailed,
  adminUpdateUserActionSuccess,
  createAccountAction,
  createAccountActionFailed,
  createAccountActionSuccess,
  createUserAction,
  createUserActionFailed,
  createUserActionSuccess,
  getUserAction,
  getUserActionFailed,
  getUserActionSuccess,
  getUserListAction,
  getUserListActionFailed,
  getUserListActionSuccess,
  sendCredentialAction,
  sendCredentialActionFailed,
  sendCredentialActionSuccess,
  signInAction,
  signInActionFailed,
  signInActionSuccess
} from '../actions/user.action'
import emailjs from 'emailjs-com'
import { query } from 'firebase/firestore'

const get = async (payload) => {
  try {
    const result = await payload
    let snapshot = null
    result.forEach((doc) => (snapshot = doc.data()))
    return { isSuccess: true, data: snapshot }
  } catch (error) {
    return { isSuccess: false, data: error }
  }
}

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

const signUp = async (payload) => {
  try {
    const result = await payload
    console.log(result)
    return { isSuccess: true, data: result }
  } catch (error) {
    return {
      isSuccess: false,
      data: renderAuthErrorCode(error)
    }
  }
}

const returnSelectedOptions = (data) => {
  let query = firestore.collection('users').where('role', '==', 'user')

  if (data.filterBy === userFilterOptions[0].value)
    query = query.where('archive', '==', false)
  else query = query.where('archive', '==', true)

  if (data.sortBy === userSortOptions[0].value)
    query = query.orderBy('dateAdded', data.order)
  else {
    query = query
      .orderBy('firstName', data.order)
      .orderBy('lastName', data.order)
  }

  return query.get()
}

function* signIn(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const response = yield call(
    signUp,
    auth.signInWithEmailAndPassword(data?.email, data?.password)
  )

  if (response?.isSuccess) {
    yield put(signInActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(signInActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* getUser(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const response = yield call(
    get,
    firestore.collection('users').where('email', '==', data?.email).get()
  )

  if (response?.isSuccess) {
    yield put(getUserActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getUserActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* createAccount(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const response = yield call(
    signUp,
    auth.createUserWithEmailAndPassword(data?.email, data?.password)
  )

  if (response?.isSuccess) {
    yield put(createAccountActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(createAccountActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* createUser(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(create, firestore.collection('users').add(data))
  if (response) {
    yield put(createUserActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(createUserActionFailed('Error creating user'))
    yield call(onFailure, 'Error creating user!')
  }
}

function* updateUser(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    update,
    firestore.doc(`users/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(adminUpdateUserActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(adminUpdateUserActionFailed('Error updating user'))
    yield call(onFailure, 'Error updating user!')
  }
}

function* removeUser(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    update,
    firestore.doc(`users/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(adminRemoveUserActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(adminRemoveUserActionFailed('Error removing user'))
    yield call(onFailure, 'Error removing user!')
  }
}

function* sendCredential(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(send, data)
  if (response) {
    yield put(sendCredentialActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(sendCredentialActionFailed('Error sending credential'))
    yield call(onFailure, 'Error sending credential!')
  }
}

function* getUserList(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const response = yield call(getList, returnSelectedOptions(data))

  if (response?.isSuccess) {
    yield put(getUserListActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getUserListActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

export default function* root() {
  yield all([
    takeLatest(createUserAction.toString(), createUser),
    takeLatest(createAccountAction.toString(), createAccount),
    takeLatest(getUserAction.toString(), getUser),
    takeLatest(signInAction.toString(), signIn),
    takeLatest(adminUpdateUserAction.toString(), updateUser),
    takeLatest(adminRemoveUserAction.toString(), removeUser),
    takeLatest(sendCredentialAction.toString(), sendCredential),
    takeLatest(getUserListAction.toString(), getUserList)
  ])
}
