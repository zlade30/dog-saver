import React, { Suspense, useContext, useEffect } from 'react'
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

const AppRoutes = ({ history }) => {
  const isPublic = publicRoutes.includes(window.location.pathname)

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
        history.push('/dashboard')
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
    <div className="flex">
      {routes?.length && !isPublic && <Sidebar user={user} />}
      {routes?.length && isPublic ? (
        routes.map((route) => (
          <Suspense key={route.path} fallback={<div>Loading</div>}>
            <Routing {...route} />
          </Suspense>
        ))
      ) : (
        <Suspense fallback={<div>Loading</div>}>
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
