import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCxHvI4F9D6KuY9jZhBefw7mzPmf0Ldb0U',
  authDomain: 'dog-saver-248ac.firebaseapp.com',
  projectId: 'dog-saver-248ac',
  storageBucket: 'dog-saver-248ac.appspot.com',
  messagingSenderId: '738029908010',
  appId: '1:738029908010:web:636f9ddc4ab578f0ef5353',
  measurementId: 'G-Z39Q2CGL9X'
})

export const authRecaptcha = firebase.auth
export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()

export default app
