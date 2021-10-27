import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'

const OptionModal = ({ isOpen, onClose, onClaim, onAdopt, onView }) => {
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
            <label className="header-modal-title">Select</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-option-body w-100">
          <Button onClick={onClaim} value="Claim" width={200} />
          <Button onClick={onAdopt} value="Adopt" width={200} />
          <Button onClick={onView} value="View" width={200} />
        </div>
      </div>
    </ReactModal>
  )
}

OptionModal.defaultProps = {
  isOpen: false
}

OptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClaim: PropTypes.func.isRequired,
  onAdopt: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
}

export default OptionModal
