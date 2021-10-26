import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'

const DonateModal = ({ isOpen, onClose, content }) => {
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
            <label className="header-modal-title">Details</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-body">
          <label
            className="modal-body-text"
            style={{ fontWeight: 'normal', fontSize: 14 }}>
            {content}
          </label>
        </div>
        <div className="modal-footer">
          <Button onClick={onClose} value="Okay" width={60} />
        </div>
      </div>
    </ReactModal>
  )
}

DonateModal.defaultProps = {
  isOpen: false,
  content: ''
}

DonateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}

export default DonateModal
