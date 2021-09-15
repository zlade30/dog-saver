import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const payload = {
    user,
    setUser
  }

  return <UserContext.Provider value={payload}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  user: PropTypes.string,
  setUser: PropTypes.func,
  children: PropTypes.object
}

export default UserProvider
