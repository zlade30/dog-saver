import React from 'react'
import Header from 'components/headers/Header'
import Button from 'components/buttons/Button'
import MapPin from 'components/icons/MapPin'

const Overview = () => {
  return (
    <>
      <Header />
      <div className="overview">
        <img className="overview-icon" src="assets/icons/dog-overview.png" />
        <span className="overview-location">
          <MapPin />
          Damilag Manolo Fortich Bukidnon, 8703
        </span>
        <span className="overview-btn-container">
          <Button value="Would you like to register your dog?" />
          <Button value="Visit impounding" />
        </span>
      </div>
    </>
  )
}

export default Overview
