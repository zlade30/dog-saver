import React from 'react'
import Button from 'components/buttons/Button'

const Dashboard = () => {
  return (
    <div className="container">
      <div className="right-container">
        <div className="db-panel">
          {/* <img className="db-dog-bg" src="assets/icons/dog-bg.jpeg" /> */}
          <h1 className="db-title">Welcome!</h1>
          <h1 className="db-subtitle">Glad to see you here</h1>
          <div className="db-box-cont">
            <div className="db-box">
              <div className="db-box-header">
                <h2>Do you want to?</h2>
              </div>
              <img src="assets/icons/impound.png" width="200px" height="auto" />
              <Button height={35} fontWeight="bold" value="Visit Impound" />
            </div>
            <div className="db-box">
              <div className="db-box-header">
                <h2>Do you want to?</h2>
              </div>
              <img
                src="assets/icons/register.png"
                width="200px"
                height="auto"
              />
              <Button height={35} fontWeight="bold" value="Register" />
            </div>
            <div className="db-box">
              <div className="db-box-header">
                <h2>Do you want to?</h2>
              </div>
              <img
                src="assets/icons/dog-donation.png"
                width="100px"
                height="auto"
              />
              <Button height={35} fontWeight="bold" value="Donate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
