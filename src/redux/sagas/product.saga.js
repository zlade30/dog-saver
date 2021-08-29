import { all, put, takeLatest } from 'redux-saga/effects'
import {
  addProductAction,
  addProductActionFailed,
  addProductActionSuccess,
  removeProductAction,
  removeProductActionFailed,
  removeProductActionSuccess,
  searchProductAction,
  searchProductActionFailed,
  searchProductActionSuccess,
  updateProductAction,
  updateProductActionFailed,
  updateProductActionSuccess
} from '../actions/product.action'

function* addProduct(action) {
  try {
    yield put(addProductActionSuccess(action.payload))
  } catch (error) {
    yield put(addProductActionFailed(error))
  }
}

function* updateProduct(action) {
  try {
    yield put(updateProductActionSuccess(action.payload))
  } catch (error) {
    yield put(updateProductActionFailed(error))
  }
}

function* removeProduct(action) {
  try {
    yield put(removeProductActionSuccess(action.payload))
  } catch (error) {
    yield put(removeProductActionFailed(error))
  }
}

function* searchProduct(action) {
  try {
    yield put(searchProductActionSuccess(action.payload))
  } catch (error) {
    yield put(searchProductActionFailed(error))
  }
}

export default function* root() {
  yield all([
    takeLatest(addProductAction.toString(), addProduct),
    takeLatest(updateProductAction.toString(), updateProduct),
    takeLatest(removeProductAction.toString(), removeProduct),
    takeLatest(searchProductAction.toString(), searchProduct)
  ])
}
