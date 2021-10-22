import Button from 'components/buttons/Button'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="container">
      <div className="right-container">
        <h1>Welcome!</h1>
        <div className="db-panel">
          <div className="db-box">
            <div className="db-box-header">
              <h2>Do you want to?</h2>
            </div>
            <img src="assets/icons/claim.png" width="120px" height="auto" />
            <Button height={35} fontWeight="bold" value="Claim" />
          </div>
          <div className="db-box">
            <div className="db-box-header">
              <h2>Do you want to?</h2>
            </div>
            <img src="assets/icons/adopt.png" width="200px" height="auto" />
            <Button height={35} fontWeight="bold" value="Adopt" />
          </div>
          <div className="db-box">
            <div className="db-box-header">
              <h2>Do you want to?</h2>
            </div>
            <img src="assets/icons/impound.png" width="140px" height="auto" />
            <Button height={35} fontWeight="bold" value="Visit Impound" />
          </div>
          <div className="db-box">
            <div className="db-box-header">
              <h2>Do you want to?</h2>
            </div>
            <img src="assets/icons/register.png" width="140px" height="auto" />
            <Button height={35} fontWeight="bold" value="Register" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
