import { lazy } from 'react'

const Login = lazy(() => import('pages/auth/login'))
const Overview = lazy(() => import('pages/overview'))
// const Login = lazy(() => import(''))
// const Login = lazy(() => import(''))

const Routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
    hidden: false
  }
]

export default Routes
