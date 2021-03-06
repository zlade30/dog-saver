import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import MenLineIcon from 'remixicon-react/MenLineIcon'
import WomenLineIcon from 'remixicon-react/WomenLineIcon'
import PaintFillIcon from 'remixicon-react/PaintFillIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import PhoneLineIcon from 'remixicon-react/PhoneLineIcon'
import Button from 'components/buttons/Button'
import Chat1LineIcon from 'remixicon-react/Chat1LineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import moment from 'moment'

const DogIcon = ({ color = '#334D67' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 35 28"
    fill="none"
    style={{ width: 35, height: 45, marginRight: 0, marginLeft: 15 }}
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 7.25C21 6.5625 20.4375 6 19.75 6H18.1875V5.96875C17.9062 5.40625 17.3125 5 16.625 5H14.25C14.2188 5 14.2188 5.03125 14.1875 5.03125V5L13.3438 4.15625C13.0312 3.84375 12.5 4.0625 12.5 4.5V10H8.75C7.75 10 6.875 10.4062 6.21875 11H5.75C5.03125 11 4.5 10.4688 4.5 9.75C4.5 9.34375 4.15625 9 3.75 9C3.3125 9 3 9.34375 3 9.75C3 11.0938 3.96875 12.2188 5.21875 12.4688C5.0625 12.875 5 13.3125 5 13.75V19C5 19.5625 5.4375 20 6 20H8.5C9.03125 20 9.5 19.5625 9.5 19V16H13.5V19C13.5 19.5625 13.9375 20 14.5 20H17C17.5312 20 18 19.5625 18 19V11.5H18.25C19.75 11.5 20.9688 10.2812 21 8.75V7.25ZM16.5 12.4062V18.5H15V14.5H8V18.5H6.5V13.75C6.5 12.5312 7.5 11.5312 8.75 11.5H12.9062L16.5 12.4062ZM19.5 7.5V8.75C19.5 9.46875 18.9375 10 18.25 10H16.5V10.875L14 10.25V6.75C14 6.625 14.0938 6.5 14.25 6.5H16.625C16.7188 6.5 16.8125 6.5625 16.8438 6.65625L17.2812 7.5H19.5ZM16.5 7.5C16.5 7.25 16.25 7 16 7C15.7188 7 15.5 7.25 15.5 7.5C15.5 7.78125 15.7188 8 16 8C16.25 8 16.5 7.78125 16.5 7.5Z"
      fill={color}
    />
  </svg>
)

const SurrenderDogModal = ({
  role,
  isOpen,
  onClose,
  values,
  onApprove,
  onReject,
  setShowViewDogImagesModal,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4
}) => {
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
            <label className="header-modal-title">Dog Information</label>
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
          <div
            style={{
              width: '80%',
              height: 200,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onClick={() => {
              console.log(values)
              setDogImage1(values?.dog?.profile[0])
              setDogImage2(values?.dog?.profile[1])
              setDogImage3(values?.dog?.profile[2])
              setDogImage4(values?.dog?.profile[3])
              setShowViewDogImagesModal(true)
            }}>
            <img
              style={{
                width: '100%',
                height: 200,
                borderRadius: 12,
                objectFit: 'contain',
                cursor: 'pointer'
              }}
              src={values?.dog?.profile[0]}
            />
            <div
              style={{
                width: '100%',
                height: 200,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1,
                position: 'absolute'
              }}
            />
            <label
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                zIndex: 2
              }}>{`+3`}</label>
          </div>
          <div className="flex items-center w-full">
            <PaintFillIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Color:
            </label>
            <label style={{ fontSize: 14 }}>{values?.dog?.color || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <DogIcon />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Breed:
            </label>
            <label style={{ fontSize: 14 }}>{values?.dog?.breed || ''}</label>
          </div>
          <div className="flex items-center w-full">
            {values?.dog?.gender?.label === 'Male' ? (
              <MenLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            ) : (
              <WomenLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            )}
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Gender:
            </label>
            <label style={{ fontSize: 14 }}>
              {values?.dog?.gender?.label || ''}
            </label>
          </div>
          <div className="flex items-center w-full">
            <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Owner Name:
            </label>
            <label style={{ fontSize: 14 }}>
              {`${values?.user?.firstName} ${values?.user?.lastName}` || ''}
            </label>
          </div>
          <div className="flex items-center w-full">
            <CalendarLineIcon
              style={{ margin: 10, marginLeft: 20 }}
              size={20}
            />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Birthday:
            </label>
            <label style={{ fontSize: 14 }}>
              {values?.dog?.birthday
                ? moment(values?.dog?.birthday?.toDate()).format('ll')
                : ''}
            </label>
          </div>
          <div className="flex items-center w-full">
            <PhoneLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Owner Contact:
            </label>
            <label style={{ fontSize: 14 }}>{values?.user?.phone || ''}</label>
          </div>
          <div className="flex items-center w-full">
            <Chat1LineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
            <label
              style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
              Owner Reason:
            </label>
            <label style={{ fontSize: 14 }}>{values?.reason || ''}</label>
          </div>
          {values?.status === 'pending' && role === 'admin' ? (
            <div
              className="flex items-center"
              style={{ justifyContent: 'space-between', marginTop: 20 }}>
              <Button
                value="Approve"
                onClick={onApprove}
                style={{
                  backgroundColor: '#42C2D3',
                  width: 150,
                  marginRight: 5
                }}
              />
              <Button
                value="Reject"
                onClick={onReject}
                style={{
                  backgroundColor: '#ff4d4f',
                  width: 150,
                  marginLeft: 5
                }}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </ReactModal>
  )
}

SurrenderDogModal.defaultProps = {
  isOpen: false,
  values: {
    profile: ''
  },
  role: 'admin'
}

SurrenderDogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setDogImage1: PropTypes.func.isRequired,
  setDogImage2: PropTypes.func.isRequired,
  setDogImage3: PropTypes.func.isRequired,
  setDogImage4: PropTypes.func.isRequired,
  setShowViewDogImagesModal: PropTypes.func.isRequired
}

export default SurrenderDogModal
