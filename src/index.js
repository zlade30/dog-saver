import '../scss/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'redux/store'
import { AppRoutes } from 'app-routes'
import { initializeApp } from 'firebase/app';

// Use your config values here.
initializeApp({
  apiKey: "AIzaSyCxHvI4F9D6KuY9jZhBefw7mzPmf0Ldb0U",
  authDomain: "dog-saver-248ac.firebaseapp.com",
  projectId: "dog-saver-248ac",
  storageBucket: "dog-saver-248ac.appspot.com",
  messagingSenderId: "738029908010",
  appId: "1:738029908010:web:636f9ddc4ab578f0ef5353",
  measurementId: "G-Z39Q2CGL9X"
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
