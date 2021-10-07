import Divider from 'components/divider/Divider'
import React from 'react'
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import RestartLineIcon from 'remixicon-react/RestartLineIcon'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import BubbleChartLineIcon from 'remixicon-react/BubbleChartLineIcon'
import SyringeLineIcon from 'remixicon-react/SyringeLineIcon'

import moment from 'moment'

const DogIcon = ({ color = '#334D67' }) => (
  <svg
    className="sidebar-menu-icon"
    width="24"
    height="24"
    viewBox="0 0 35 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 7.25C21 6.5625 20.4375 6 19.75 6H18.1875V5.96875C17.9062 5.40625 17.3125 5 16.625 5H14.25C14.2188 5 14.2188 5.03125 14.1875 5.03125V5L13.3438 4.15625C13.0312 3.84375 12.5 4.0625 12.5 4.5V10H8.75C7.75 10 6.875 10.4062 6.21875 11H5.75C5.03125 11 4.5 10.4688 4.5 9.75C4.5 9.34375 4.15625 9 3.75 9C3.3125 9 3 9.34375 3 9.75C3 11.0938 3.96875 12.2188 5.21875 12.4688C5.0625 12.875 5 13.3125 5 13.75V19C5 19.5625 5.4375 20 6 20H8.5C9.03125 20 9.5 19.5625 9.5 19V16H13.5V19C13.5 19.5625 13.9375 20 14.5 20H17C17.5312 20 18 19.5625 18 19V11.5H18.25C19.75 11.5 20.9688 10.2812 21 8.75V7.25ZM16.5 12.4062V18.5H15V14.5H8V18.5H6.5V13.75C6.5 12.5312 7.5 11.5312 8.75 11.5H12.9062L16.5 12.4062ZM19.5 7.5V8.75C19.5 9.46875 18.9375 10 18.25 10H16.5V10.875L14 10.25V6.75C14 6.625 14.0938 6.5 14.25 6.5H16.625C16.7188 6.5 16.8125 6.5625 16.8438 6.65625L17.2812 7.5H19.5ZM16.5 7.5C16.5 7.25 16.25 7 16 7C15.7188 7 15.5 7.25 15.5 7.5C15.5 7.78125 15.7188 8 16 8C16.25 8 16.5 7.78125 16.5 7.5Z"
      fill={color}
    />
  </svg>
)

const DogAvatarCard = ({
  value,
  onUpdate,
  onRemove,
  onRestore,
  isShowAction
}) => {
  return (
    <div className="user-card">
      <Avatar src={value?.profile} width={70} height={70} />
      <label className="user-card-name">{value?.name}</label>
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
            <User3LineIcon size={18} />
          </div>
          <label className="user-card-value">{value?.owner?.label}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <DogIcon />
          </div>
          <label className="user-card-value">{value?.breed?.label}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <BubbleChartLineIcon size={18} />
          </div>
          <label className="user-card-value">{value?.status?.label}</label>
        </div>
        <div className="flex">
          <div className="user-card-label">
            <CalendarLineIcon size={18} />
          </div>
          <label className="user-card-value">
            {moment(value?.dateAdded?.toDate()).format('L')}
          </label>
        </div>
        {value?.euthSched && value?.status?.value === 'Euthanasia' ? (
          <div className="flex">
            <div className="user-card-label">
              <SyringeLineIcon size={18} />
            </div>
            <label className="user-card-value">
              {moment(value?.euthSched?.toDate()).format('L')}
            </label>
          </div>
        ) : (
          <div />
        )}
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

DogAvatarCard.defaultProps = {
  isShowAction: true
}

DogAvatarCard.propTypes = {
  value: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRestore: PropTypes.func,
  isShowAction: PropTypes.bool
}

export default DogAvatarCard
