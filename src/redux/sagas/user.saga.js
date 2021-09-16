import { auth, firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload, renderAuthErrorCode } from 'utils/helpers'
import {
  createAccountAction,
  createAccountActionFailed,
  createAccountActionSuccess,
  createUserAction,
  createUserActionFailed,
  createUserActionSuccess,
  getUserAction,
  getUserActionFailed,
  getUserActionSuccess,
  signInAction,
  signInActionFailed,
  signInActionSuccess
} from '../actions/user.action'

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

const create = async (payload) => {
  try {
    const result = await payload
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

export default function* root() {
  yield all([
    takeLatest(createUserAction.toString(), createUser),
    takeLatest(createAccountAction.toString(), createAccount),
    takeLatest(getUserAction.toString(), getUser),
    takeLatest(signInAction.toString(), signIn)
  ])
}
