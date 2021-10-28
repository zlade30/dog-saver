import React, { useContext, useState } from 'react'
import Button from 'components/buttons/Button'
import MapPin from 'components/icons/MapPin'
import { useHistory } from 'react-router-dom'
import DonateModal from 'components/modal/DonateModal'
import { UserContext } from 'contexts/user.context'
import RegisterModal from 'components/modal/RegisterModal'

const Overview = () => {
  const history = useHistory()
  const [isOpenRegisterModal, setIsRegisterModal] = useState(false)
  const [isOpenDonateModal, setIsOpenDonateModal] = useState(false)

  const { user } = useContext(UserContext)

  return (
    <div className="container" style={{ overflow: 'hidden' }}>
      <RegisterModal
        content="Before you register a dog! Kindly login or create an account first if you wish to continue."
        isOpen={isOpenRegisterModal}
        onClose={() => setIsRegisterModal(false)}
        okay={() => setIsRegisterModal(false)}
      />
      <DonateModal
        content="We appreciate your kindness, if you want to donate. Kindly contact this number 09553144476 for more info."
        isOpen={isOpenDonateModal}
        onClose={() => setIsOpenDonateModal(false)}
      />
      <div className="right-container">
        <div className="db-panel">
          {/* <img className="db-dog-bg" src="assets/icons/dog-bg.jpeg" /> */}
          <h1 className="db-title">
            {user ? `Welcome, ${user?.firstName}!` : 'Welcome!'}
          </h1>
          <h1 className="db-subtitle">
            <strong>BARK</strong> is a dog impounding system.
          </h1>
          <span className="overview-location">
            <MapPin />
            Damilag Manolo Fortich Bukidnon, 8703
          </span>
          <div className="db-box-cont">
            <div className="db-box">
              <div className="db-box-header">
                <h2>Do you want to?</h2>
              </div>
              <img src="assets/icons/impound.png" width="200px" height="auto" />
              <Button
                onClick={() => history.push('/impound')}
                height={35}
                fontWeight="bold"
                value="Visit Impound"
              />
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
              <Button
                onClick={() => {
                  if (user) history.push('/dogs')
                  else setIsRegisterModal(true)
                }}
                height={35}
                fontWeight="bold"
                value="Register"
              />
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
              <Button
                onClick={() => setIsOpenDonateModal(true)}
                height={35}
                fontWeight="bold"
                value="Donate"
              />
            </div>
            <div className="db-box">
              <div className="db-box-header">
                <h2>Do you want to?</h2>
              </div>
              <img
                src="assets/icons/dog-about-us.png"
                width="180px"
                height="auto"
              />
              <Button
                onClick={() => history.push('/about-us')}
                height={35}
                fontWeight="bold"
                value="Know About Us"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
