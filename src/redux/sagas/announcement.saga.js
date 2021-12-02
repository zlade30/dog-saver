import { firestore } from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  addAnnouncementAction,
  addAnnouncementActionFailed,
  addAnnouncementActionSuccess,
  getAnnouncementsAction,
  getAnnouncementsActionFailed,
  getAnnouncementsActionSuccess,
  removeAnnouncementAction,
  removeAnnouncementActionFailed,
  removeAnnouncementActionSuccess,
  updateAnnouncementAction,
  updateAnnouncementActionFailed,
  updateAnnouncementActionSuccess
} from 'redux/actions/announcement.action'
import { deconstructSagaPayload } from 'utils/helpers'

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

function* getAnnouncements(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)

  console.log(data)

  const response = yield call(
    getList,
    firestore
      .collection('announcements')
      .where('archive', '==', data.filterBy ? data.filterBy : false)
      .get()
  )

  if (response?.isSuccess) {
    yield put(getAnnouncementsActionSuccess(response))
    yield call(onSuccess, response?.data)
  } else {
    yield put(getAnnouncementsActionFailed(response))
    yield call(onFailure, response?.data)
  }
}

function* addAnnouncement(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    create,
    firestore.collection('announcements').add(data)
  )
  if (response?.isSuccess) {
    yield put(addAnnouncementActionSuccess(response?.data))
    yield call(onSuccess, response?.data)
  } else {
    yield put(addAnnouncementActionFailed('Error creating announcement'))
    yield call(onFailure, 'Error creating announcement!')
  }
}

function* updateAnnouncement(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  delete data.dateAdded
  const response = yield call(
    update,
    firestore.doc(`announcements/${data?.id}`).update(data)
  )
  if (response?.isSuccess) {
    yield put(updateAnnouncementActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(updateAnnouncementActionFailed('Error updating announcement'))
    yield call(onFailure, 'Error updating announcement!')
  }
}

function* removeAnnouncement(action) {
  const { onSuccess, onFailure, data } = deconstructSagaPayload(action.payload)
  const response = yield call(
    update,
    firestore.doc(`announcements/${data?.id}`).update(data?.values)
  )
  if (response) {
    yield put(removeAnnouncementActionSuccess(response))
    yield call(onSuccess, response)
  } else {
    yield put(removeAnnouncementActionFailed('Error removing announcement'))
    yield call(onFailure, 'Error removing announcement!')
  }
}

export default function* root() {
  yield all([
    takeLatest(addAnnouncementAction.toString(), addAnnouncement),
    takeLatest(updateAnnouncementAction.toString(), updateAnnouncement),
    takeLatest(removeAnnouncementAction.toString(), removeAnnouncement),
    takeLatest(getAnnouncementsAction.toString(), getAnnouncements)
  ])
}
