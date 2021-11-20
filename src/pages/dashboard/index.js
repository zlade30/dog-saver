import React, { useContext } from 'react'
import { UserContext } from 'contexts/user.context'
import AdminDashboard from './dashboardv2'
import UserDashboard from './dashboard'

const Dashboard = () => {
  const { user } = useContext(UserContext)

  return user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
