import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'

const ViewDogImagesModal = ({
  isOpen,
  onClose,
  dogImage1,
  dogImage2,
  dogImage3,
  dogImage4
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className="dog-info-modal"
      overlayClassName="overlay">
      <div>
        <div className="header-modal">
          <div className="flex items-center">
            <ErrorWarningLineIcon
              className="margin-l-10 margin-r-10"
              size={25}
              color="white"
            />
            <label className="header-modal-title">Dog Images</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-body">
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <img
                style={{
                  width: 500,
                  height: 300,
                  borderRadius: 12,
                  objectFit: 'contain'
                }}
                src={dogImage1}
              />
              <h1>Front</h1>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <img
                style={{
                  width: 500,
                  height: 300,
                  borderRadius: 12,
                  objectFit: 'contain'
                }}
                src={dogImage2}
              />
              <h1>Back</h1>
            </div>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <img
                style={{
                  width: 500,
                  height: 300,
                  borderRadius: 12,
                  objectFit: 'contain'
                }}
                src={dogImage3}
              />
              <h1>Right View</h1>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <img
                style={{
                  width: 500,
                  height: 300,
                  borderRadius: 12,
                  objectFit: 'contain'
                }}
                src={dogImage4}
              />
              <h1>Left View</h1>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

ViewDogImagesModal.defaultProps = {
  isOpen: false,
  dogImage1: null,
  dogImage2: null,
  dogImage3: null,
  dogImage4: null
}

ViewDogImagesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  dogImage1: PropTypes.any.isRequired,
  dogImage2: PropTypes.any.isRequired,
  dogImage3: PropTypes.any.isRequired,
  dogImage4: PropTypes.any.isRequired
}

export default ViewDogImagesModal
