import '../scss/main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'redux/store'
import { AppRoutes } from 'app-routes'
import UserProvider from 'contexts/user.context'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
