import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBT2kqnxIlgApTb0oPjOE5Hp7eSKO-D25E',
  authDomain: 'dog-saver-727aa.firebaseapp.com',
  projectId: 'dog-saver-727aa',
  storageBucket: 'dog-saver-727aa.appspot.com',
  messagingSenderId: '965457119439',
  appId: '1:965457119439:web:8d92083202e0fc8572cfba',
  measurementId: 'G-TKHDMZDKWV'
})

export const authRecaptcha = firebase.auth
export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
export const fire = firebase

export default app
