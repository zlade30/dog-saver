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
      className="claim-modal"
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
            <img
              style={{
                width: 500,
                height: 300,
                borderRadius: 12,
                objectFit: 'contain'
              }}
              src={dogImage1}
            />
            <img
              style={{
                width: 500,
                height: 300,
                borderRadius: 12,
                objectFit: 'contain',
              }}
              src={dogImage2}
            />
          </div>
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 14 }}>
            <img
              style={{
                width: 500,
                height: 300,
                borderRadius: 12,
                objectFit: 'contain'
              }}
              src={dogImage3}
            />
            <img
              style={{
                width: 500,
                height: 300,
                borderRadius: 12,
                objectFit: 'contain'
              }}
              src={dogImage4}
            />
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
