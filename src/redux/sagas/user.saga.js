import { auth, firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload, renderAuthErrorCode } from 'utils/helpers'
import {
  createAccountAction,
  createAccountActionFailed,
  createAccountActionSuccess,
  createUserAction,
  createUserActionFailed,
  createUserActionSuccess
} from '../actions/user.action'

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

function* createAccount(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  let response = null
  if (data?.isEmail) {
    response = yield call(
      signUp,
      auth.createUserWithEmailAndPassword(data.username, data.password)
    )
  } else {
    response = yield call(
      signUp,
      auth.signInWithPhoneNumber(
        `+639${data?.username?.slice('2')}`,
        data?.appVerifier
      )
    )
  }

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
    takeLatest(createAccountAction.toString(), createAccount)
  ])
}
