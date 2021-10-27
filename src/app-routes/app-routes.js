import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Routing from 'routes/routing'
import { publicRoutes } from 'utils/constants'
import { routes } from 'routes'
import { useDispatch } from 'react-redux'
import { UserContext } from 'contexts/user.context'
import { auth } from 'firebase'
import { getUserAction } from 'redux/actions/user.action'
import Sidebar from 'components/sidebar/Sidebar'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'

const AppRoutes = ({ history }) => {
  const isPublic = publicRoutes.includes(window.location.pathname)

  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const savedUser = localStorage.getItem('authUser')
  const path = history?.location?.pathname

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(JSON.parse(JSON.stringify(authUser)))
        const currentUser = JSON.parse(JSON.stringify(authUser))
        // console.log(currentUser?.email)
        if (!currentUser) {
          dispatch(
            getUserAction({
              data: { email: currentUser?.email },
              onSuccess: (response) => setUser(response),
              onFailure: (error) => console.log(error)
            })
          )
          if (
            path === '/login' ||
            path === '/register' ||
            path === '/forgot-password' ||
            path === '/'
          )
            history.push('/dashboard')
          localStorage.setItem('authUser', JSON.stringify(user))
        }

        if (path === '/') {
          dispatch(
            getUserAction({
              data: { email: currentUser?.email },
              onSuccess: (response) => {
                setUser(response)
                history.push('/dashboard')
              },
              onFailure: (error) => console.log(error)
            })
          )
        }
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
        if (path === '/') history.push('/login')
        else if (path === '/about-us') history?.push('/about-us')
        else if (path === '/impound') history?.push('/impound')
        else history.push('/login')
      }
    })

    return () => listener?.()
  }, [])

  const onLogout = () => {
    setShowLoader(true)
    setTimeout(() => {
      auth.signOut()
      setUser(null)
      setShowLoader(false)
      history.push('/login')
      localStorage.removeItem('authUser')
    }, 1000)
  }

  return (
    <div className="flex">
      {showLoader && <LoadingOverlay />}
      {routes?.length && !isPublic && savedUser && (
        <Sidebar onLogout={onLogout} user={user} />
      )}
      {routes?.length && isPublic ? (
        routes.map((route) => (
          <Suspense key={route.path} fallback={<LoadingOverlay />}>
            <Routing {...route} />
          </Suspense>
        ))
      ) : (
        <Suspense fallback={<LoadingOverlay />}>
          <Switch>
            {routes &&
              routes.length &&
              routes.map((route) => <Routing key={route.path} {...route} />)}
          </Switch>
        </Suspense>
      )}
    </div>
  )
}
AppRoutes.defaultProps = {
  location: {}
}

AppRoutes.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(AppRoutes)
