import React, { useContext, useEffect } from 'react'
import { auth } from 'firebase'
import { UserContext } from 'contexts/user.context'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUserAction } from 'redux/actions/user.action'
import Divider from 'components/divider/Divider'
import AvatarSelection from 'components/avatar/AvatarSelection'
import LogoutBoxRLineIcon from 'remixicon-react/LogoutBoxRLineIcon'

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

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo margin-b-20">
          <img className="logo-img" src="assets/icons/dog.png" />
          Dog Saver
        </div>
        <Divider width={340} />
        <div className="user-info-cont">
          <AvatarSelection
            width={60}
            height={60}
            src={user?.profile}
            isClickable={false}
          />
          <div className="user-info">
            <label className="bold">{`${user?.firstName} ${user?.lastName}`}</label>
            <label>User</label>
          </div>
        </div>
        <div onClick={() => auth.signOut()} className="logout-cont cursor-pointer">
          <label className="margin-r-10 cursor-pointer">Logout</label>
          <LogoutBoxRLineIcon size={15} />
        </div>
        <Divider width={340} />
      </div>
      <div className="home" />
    </div>
  )
}

export default Dashboard
