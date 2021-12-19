import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'components/divider/Divider'
import moment from 'moment'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'
import RestartLineIcon from 'remixicon-react/RestartLineIcon'

const AnnouncementMessage = ({ item, onArchive, onUpdate, role, onRestore }) => {
  const HornIcon = ({ color = '#334D67' }) => (
    <svg
      className="sidebar-menu-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 9.78125V5.03125C20 4.75 19.7812 4 19 4C18.75 4 18.5312 4.09375 18.375 4.25L15.6875 6.375C14.375 7.4375 12.6875 8 11 8H5C3.875 8 3 8.90625 3 10V13C3 14.125 3.875 15 5 15L4.96875 16C4.96875 17.25 5.25 18.4375 5.78125 19.4688C5.9375 19.8125 6.28125 20 6.65625 20H9.96875C10.7812 20 11.2812 19.0938 10.7812 18.4375C10.2812 17.75 9.96875 16.9375 9.96875 16C9.96875 15.6562 10.0312 15.3438 10.0938 15H11C12.6875 15 14.375 15.5938 15.6875 16.6562L18.375 18.7812C18.5312 18.9375 18.75 19 18.9688 19C19.75 19 19.9688 18.3125 19.9688 18V13.25C20.5938 12.9062 20.9688 12.25 20.9688 11.5312C21 10.7812 20.5938 10.125 20 9.78125ZM6.96875 18.5C6.625 17.7188 6.46875 16.875 6.46875 16C6.46875 15.5625 6.53125 15.2188 6.5625 15H8.59375C8.5 15.3438 8.46875 15.6875 8.46875 16C8.46875 16.9062 8.6875 17.75 9.0625 18.5H6.96875ZM10.5 13.5H5C4.71875 13.5 4.5 13.2812 4.5 13V10C4.5 9.75 4.71875 9.5 5 9.5H10.5V13.5ZM18.5 16.9688L16.625 15.5C15.3125 14.4375 13.6875 13.7812 12 13.5938V9.4375C13.6875 9.25 15.3125 8.59375 16.625 7.53125L18.5 6.0625V16.9688Z"
        fill={color}
      />
    </svg>
  )

  return (
    <div className="announcement-message mb-10" style={{ paddingTop: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#a1d3da' }}>
      <img src="assets/icons/bg.png" style={{ position: 'absolute', left: 600, width: 150, height: 100, bottom: 0, zIndex: 0 }} />
      <div className="ancmnt-msg-header" style={{ zIndex: 2 }}>
        <div className="ancmnt-msg-header-icon">
          <div className="flex items-center">
            <HornIcon />
            <h1>{item?.title}</h1>
          </div>
          {role === 'admin' ? (
            !item?.archive ? (
              <div className="flex items-center">
                <div onClick={onUpdate} className="flex items-center update">
                  <PencilLineIcon size={20} />
                  <label className="cursor-pointer">Update</label>
                </div>
                <div
                  onClick={onArchive}
                  className="flex items-center archive"
                  style={{ marginLeft: 12 }}>
                  <DeleteBinLineIcon size={18} />
                  <label className="cursor-pointer">Archive</label>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div onClick={onRestore} className="flex items-center update">
                  <RestartLineIcon size={20} style={{ marginRight: 10 }} />
                  <label className="cursor-pointer">Restore</label>
                </div>
              </div>
            )
          ) : (
            <div />
          )}
        </div>
        <Divider width="95%" color="black" />
      </div>
      <div className="ancmnt-msg-content">
        <label style={{ zIndex: 2 }}>{item?.content}</label>
      </div>
      <label className="ancmnt-date" style={{ zIndex: 2 }}>
        {moment(item?.dateAdded?.toDate()).format('L')}
      </label>
    </div>
  )
}

AnnouncementMessage.defaultProps = {
  item: {}
}

AnnouncementMessage.propTypes = {
  item: PropTypes.object.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
}

export default AnnouncementMessage
