import React, { Suspense } from 'react'
import { Redirect, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Routing from 'routes/routing'
import { publicRoutes } from 'utils/constants'
import { routes } from 'routes'

const AppRoutes = () => {
  const isPublic = publicRoutes.includes(window.location.pathname)

  return routes && routes.length && isPublic ? (
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
        <Redirect from="/" to="/login" />
      </Switch>
    </Suspense>
  )
}
AppRoutes.defaultProps = {
  location: {}
}

AppRoutes.propTypes = {
  location: PropTypes.object
}

export default withRouter(AppRoutes)
