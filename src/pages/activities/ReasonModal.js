import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'

const ReasonModal = ({ isOpen, onClose, reason, onReject }) => {
  const [rejectReason, setRejectReason] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className="reason-modal"
      overlayClassName="overlay">
      <div>
        <div className="header-modal">
          <div className="flex items-center">
            <ErrorWarningLineIcon
              className="margin-l-10 margin-r-10"
              size={25}
              color="white"
            />
            <label className="header-modal-title">
              {reason ? 'Rejected' : 'Reject'}
            </label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        {!reason ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              overflowY: 'auto',
              overflowX: 'hidden',
              height: 250
            }}>
            <textarea
              value={rejectReason}
              style={{ width: 360, marginBottom: 0, marginTop: 20 }}
              className="text-field"
              placeholder="Reason"
              rows="10"
              cols="10"
              wrap="soft"
              onChange={(evt) => {
                setRejectReason(evt.target.value)
              }}
            />
            {rejectReason.length <= 0 && isSubmit ? (
              <div className="label-error">{`Reason is required.`}</div>
            ) : (
              <div />
            )}
            <Button
              value="Confirm Reject"
              onClick={() => {
                setIsSubmit(true)
                if (rejectReason.length > 0) {
                  onReject(rejectReason)
                }
              }}
              style={{
                backgroundColor: '#ff4d4f',
                width: 150,
                marginLeft: 5
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              overflowX: 'hidden',
              flexWrap: 'wrap',
              padding: 20,
              height: 250
            }}>
            <label
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginRight: 20,
                marginBottom: 4
              }}>
              Reason:
            </label>
            <label style={{ fontSize: 14 }}>{reason}</label>
          </div>
        )}
      </div>
    </ReactModal>
  )
}

ReasonModal.defaultProps = {
  isOpen: false,
  reason: ''
}

ReasonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  reason: PropTypes.string
}

export default ReasonModal
