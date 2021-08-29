import React from 'react'
import { Route } from 'react-router-dom'

const Routing = (route) => {
  return (
    <>
      <Route
        path={route.path}
        exact
        render={props => {
          return <route.component props={props} routes={route.routes} />
        }}
      />
    </>
  )
}

export default Routing
