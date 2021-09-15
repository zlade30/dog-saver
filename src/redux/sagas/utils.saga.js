import { storage } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { deconstructSagaPayload } from 'utils/helpers'
import {
  uploadUserImageAction,
  uploadUserImageActionFailed,
  uploadUserImageActionSuccess
} from '../actions/utils.action'

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

function* uploadUserImage(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  const ref = storage
    .ref()
    .child(`users/${(Math.random() + 1).toString(36).substring(2)}.jpeg`)
  const response = yield call(
    upload,
    ref.put(data?.file, { contentType: 'image/jpeg' })
  )

  if (response?.isSuccess) {
    yield put(uploadUserImageActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(uploadUserImageActionFailed('Error uploading image'))
    yield call(onFailure, 'Error uploading image!')
  }
}

export default function* root() {
  yield all([takeLatest(uploadUserImageAction.toString(), uploadUserImage)])
}
