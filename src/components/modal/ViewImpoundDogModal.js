import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'

const ViewImpoundDogModal = ({ isOpen, onClose }) => {
  const renderField = () => (
    <input style={{ fontWeight: 'normal', fontFamily: 'Montserrat' }} />
  )

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
            <label className="header-modal-title">Claim</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-footer" style={{ marginRight: 20 }}>
          <Button value="Send Form" width={60} />
        </div>
      </div>
    </ReactModal>
  )
}

ViewImpoundDogModal.defaultProps = {
  isOpen: false
}

ViewImpoundDogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ViewImpoundDogModal
