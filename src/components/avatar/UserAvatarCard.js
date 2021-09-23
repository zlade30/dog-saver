import Divider from 'components/divider/Divider'
import React from 'react'
import Avatar from './Avatar'

const UserAvatarCard = () => {
  return (
    <div className="user-card">
      <Avatar width={70} height={70} />
      <label className="user-card-name">First Name</label>
      <label className="user-card-name">Lastname</label>
      <Divider width="100%" />
      <div className="user-card-info">
        <div className="flex">
          <label className="user-card-label">Phone:</label>
          <label className="user-card-value">09350042268</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Address:</label>
          <label className="user-card-value">Purok PCH2</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Email:</label>
          <label className="user-card-value">sample@gmail.com</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Gender:</label>
          <label className="user-card-value">Male</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Date Added:</label>
          <label className="user-card-value">09/12/2021</label>
        </div>
      </div>
    </div>
  )
}

export default UserAvatarCard
