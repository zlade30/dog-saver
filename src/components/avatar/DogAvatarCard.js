import Divider from 'components/divider/Divider'
import React from 'react'
import Avatar from './Avatar'

const DogAvatarCard = () => {
  return (
    <div className="user-card">
      <Avatar width={70} height={70} />
      <label className="user-card-name">Dog Name</label>
      <Divider width="100%" />
      <div className="user-card-info">
        <div className="flex">
          <label className="user-card-label">Owner:</label>
          <label className="user-card-value">Owner Name</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Breed:</label>
          <label className="user-card-value">Akinu</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Gender:</label>
          <label className="user-card-value">Male</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Status:</label>
          <label className="user-card-value">Surrendered</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Date Added:</label>
          <label className="user-card-value">08/24/2021</label>
        </div>
      </div>
    </div>
  )
}

export default DogAvatarCard
