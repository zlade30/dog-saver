import Divider from 'components/divider/Divider'
import React from 'react'
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import PhoneLineIcon from 'remixicon-react/PhoneLineIcon'
import Home2LineIcon from 'remixicon-react/Home2LineIcon'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import RestartLineIcon from 'remixicon-react/RestartLineIcon'
import moment from 'moment'

const UserAvatarCard = ({
  value,
  onUpdate,
  onRemove,
  onRestore,
  isShowAction
}) => {
  return (
    <div className="user-card">
      <Avatar src={value?.profile} width={70} height={70} />
      <label className="user-card-name">{value?.firstName}</label>
      <label className="user-card-name">{value?.lastName}</label>
      <Divider width="100%" />
      {/* <div className="user-card-info">
        <div className="flex">
          <label className="user-card-label">Phone:</label>
          <label className="user-card-value">{value?.phone}</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Address:</label>
          <label className="user-card-value">{value?.address}</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Email:</label>
          <label className="user-card-value">{value?.email}</label>
        </div>
        <div className="flex">
          <label className="user-card-label">Date Added:</label>
          <label className="user-card-value">{value?.dateAdded}</label>
        </div>
      </div> */}
      <div className="user-card-info">
        <div className="flex">
          <div className="user-card-label">
            <PhoneLineIcon size={18} />
          </div>
          <label className="user-card-value">{value?.phone}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <Home2LineIcon size={18} />
          </div>
          <label className="user-card-value">{value?.address?.label}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <MailLineIcon size={18} />
          </div>
          <label className="user-card-value">{value?.email}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <CalendarLineIcon size={18} />
          </div>
          <label className="user-card-value">
            {moment(value?.dateAdded?.toDate()).format('L')}
          </label>
        </div>
      </div>
      {isShowAction ? (
        !value?.archive ? (
          <div className="card-btn-panel">
            <div onClick={onUpdate} className="card-btn-panel-l">
              <PencilLineIcon size={20} />
              <label className="cursor-pointer">Update</label>
            </div>
            <div onClick={onRemove} className="card-btn-panel-r">
              <DeleteBinLineIcon size={18} />
              <label className="cursor-pointer">Archive</label>
            </div>
          </div>
        ) : (
          <div className="card-btn-panel items-center justify-center">
            <div onClick={onRestore} className="card-btn-panel-m">
              <RestartLineIcon className="margin-r-10" size={18} />
              <label className="cursor-pointer">Restore</label>
            </div>
          </div>
        )
      ) : (
        <div />
      )}
    </div>
  )
}

UserAvatarCard.defaultProps = {
  isShowAction: true
}

UserAvatarCard.propTypes = {
  value: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRestore: PropTypes.func,
  isShowAction: PropTypes.bool
}

export default UserAvatarCard
