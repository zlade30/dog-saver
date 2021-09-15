import { all, fork } from 'redux-saga/effects'

import user from './user.saga'
import utils from './utils.saga'

export default function* root() {
  yield all([fork(user), fork(utils)])
}
