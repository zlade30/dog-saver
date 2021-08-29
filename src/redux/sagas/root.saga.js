import { all, fork } from 'redux-saga/effects'

import product from './product.saga'

export default function* root() {
  yield all([fork(product)])
}
