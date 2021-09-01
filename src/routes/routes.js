import { lazy } from 'react'

const Login = lazy(() => import('pages/auth/login'))
const Overview = lazy(() => import('pages/overview'))
const Register = lazy(() => import('pages/auth/register'))
const ForgotPassword = lazy(() => import('pages/auth/forgot-password'))
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
    path: '/register',
    name: 'Register',
    component: Register,
    hidden: true
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    hidden: true
  },
  {
    path: '/',
    name: 'Overview',
    component: Overview,
    hidden: false
  }
]

export default Routes
