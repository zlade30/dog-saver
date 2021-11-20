import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import moment from 'moment'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import Avatar from 'components/avatar/Avatar'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import PhoneLineIcon from 'remixicon-react/PhoneLineIcon'

const ViewUserModal = ({ isOpen, onClose, values }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className="view-dog-modal"
      overlayClassName="overlay">
      <div>
        <div className="header-modal">
          <div className="flex items-center">
            <ErrorWarningLineIcon
              className="margin-l-10 margin-r-10"
              size={25}
              color="white"
            />
            <label className="header-modal-title">User Information</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: 40
          }}>
          <Avatar src={values?.profile} width={100} height={100} />
          <div className="flex items-center w-full">
            <MailLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Email:
            </label>
            <label style={{ fontSize: 14 }}>{values?.email || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Username:
            </label>
            <label style={{ fontSize: 14 }}>{values?.username || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              First Name:
            </label>
            <label style={{ fontSize: 14 }}>{values?.firstName || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Last Name:
            </label>
            <label style={{ fontSize: 14 }}>{values?.lastName || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Middle Name:
            </label>
            <label style={{ fontSize: 14 }}>{values?.middleName || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Suffix:
            </label>
            <label style={{ fontSize: 14 }}>{values?.suffix || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <PhoneLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Phone:
            </label>
            <label style={{ fontSize: 14 }}>{values?.phone || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <CalendarLineIcon
              style={{ margin: 10, marginLeft: 20 }}
              size={20}
            />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Date Added:
            </label>
            <label style={{ fontSize: 14 }}>
              {moment(values?.dateAdded?.toDate()).format('ll')}
            </label>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

ViewUserModal.defaultProps = {
  isOpen: false,
  values: {
    profile: ''
  }
}

ViewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
}

export default ViewUserModal
