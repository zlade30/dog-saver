import React, { useContext, useEffect } from 'react'
import { auth } from 'firebase'
import { UserContext } from 'contexts/user.context'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUserAction } from 'redux/actions/user.action'

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(JSON.parse(JSON.stringify(authUser)))
        const currentUser = JSON.parse(JSON.stringify(authUser))
        // console.log(currentUser?.email)
        dispatch(
          getUserAction({
            data: { email: currentUser?.email },
            onSuccess: (response) => setUser(response),
            onFailure: (error) => console.log(error)
          })
        )

        localStorage.setItem('authUser', JSON.stringify(user))
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
