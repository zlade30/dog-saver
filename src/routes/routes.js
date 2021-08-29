import { lazy } from 'react'

const Login = lazy(() => import('../pages/auth/login'))
// const Login = lazy(() => import(''))
// const Login = lazy(() => import(''))

const Routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: false
  }
]

export default Routes
