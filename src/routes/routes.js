import { lazy } from 'react'

const Login = lazy(() => import('pages/auth/login'))
const Overview = lazy(() => import('pages/overview'))
const Dashboard = lazy(() => import('pages/dashboard'))
const Register = lazy(() => import('pages/auth/register'))
const Users = lazy(() => import('pages/users'))
const Dogs = lazy(() => import('pages/dogs'))
const Announcements = lazy(() => import('pages/announcements'))
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
    path: '/overview',
    name: 'Overview',
    component: Overview,
    hidden: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    hidden: false
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    hidden: true
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: Dogs,
    hidden: false
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: Announcements,
    hidden: false
  }
]

export default Routes
