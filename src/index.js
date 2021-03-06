import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Chart from 'chart.js/auto'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'redux/store'
import { AppRoutes } from 'app-routes'
import UserProvider from 'contexts/user.context'
import { init } from 'emailjs-com'
import '../scss/main.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import { ToastContainer } from 'react-toastify'

const defaults = Chart.defaults
defaults.font.family = 'Montserrat'

init('user_65vfAkMVOcGJOobP11WVD')

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <UserProvider>
          <ToastContainer toastClassName="toast-style" />
          <AppRoutes />
        </UserProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
