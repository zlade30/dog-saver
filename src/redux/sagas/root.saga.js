import { all, fork } from 'redux-saga/effects'

import dog from './dog.saga'
import user from './user.saga'
import utils from './utils.saga'

export default function* root() {
  yield all([fork(user), fork(utils), fork(dog)])
}
