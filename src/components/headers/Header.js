import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  return (
    <div className="header header-title">
      <div className="header-panel">
        <img className="header-icon" src="assets/icons/dog.png" />
        Dog Saver
      </div>
      <div className="header-panel">
        <label onClick={() => history.push('/login')} className="header-txt">Sign In</label>
        <label className="header-txt">|</label>
        <label onClick={() => history.push('/register')} className="header-txt">Sign Up</label>
      </div>
    </div>
  )
}

export default Header
