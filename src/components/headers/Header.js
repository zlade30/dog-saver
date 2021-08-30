import React from 'react'

const Header = () => {
  return (
    <div className="header header-title">
      <div className="header-panel">
        <img className="header-icon" src="assets/icons/dog.png" />
        Dog Saver
      </div>
      <div className="header-panel">
        <label className="header-txt">Login</label>
        <label className="header-txt">|</label>
        <label className="header-txt">Register</label>
      </div>
    </div>
  )
}

export default Header
