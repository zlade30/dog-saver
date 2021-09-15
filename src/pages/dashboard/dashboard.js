import React, { useContext, useEffect } from 'react'
import { auth } from 'firebase'
import { UserContext } from 'contexts/user.context'
import { useHistory } from 'react-router'

const Dashboard = () => {
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.parse(JSON.stringify(user)))
        setUser(JSON.parse(JSON.stringify(user)))
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
        history.push('/login')
      }
    })

    return () => listener?.()
  }, [])

  return <div>Dashboard</div>
}

export default Dashboard
