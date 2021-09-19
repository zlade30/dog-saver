import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="container">
      <div className="home">
        <h1>Dashboard</h1>
        <AnnouncementMessage />
      </div>
    </div>
  )
}

export default Dashboard
