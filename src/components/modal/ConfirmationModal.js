import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'

const ConfirmationModal = ({ isOpen, onClose, onYes, content }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className="middle-modal"
      overlayClassName="overlay">
      <div>
        <div className="header-modal">
          <div className="flex items-center">
            <ErrorWarningLineIcon
              className="margin-l-10 margin-r-10"
              size={25}
              color="white"
            />
            <label className="header-modal-title">Confirmation</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-body">
          <label className="modal-body-text">{content}</label>
        </div>
        <div className="modal-footer">
          <label
            onClick={onClose}
            className="margin-r-20 margin-t-10 cursor-pointer">
            No
          </label>
          <Button onClick={onYes} value="Yes" width={60} />
        </div>
      </div>
    </ReactModal>
  )
}

ConfirmationModal.defaultProps = {
  isOpen: false,
  content: ''
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}

export default ConfirmationModal
