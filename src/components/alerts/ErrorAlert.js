import React from 'react'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import PropTypes from 'prop-types'

const ErrorAlert = ({ onClose, message }) => {
  return (
    <div className="error-alert justify-between">
      <div className="align-center">
        <ErrorWarningLineIcon color="white" size={20} />
        <label className="alert-message">{message}</label>
      </div>
      <div className="align-center">
        <CloseLineIcon
          onClick={onClose}
          className="cursor-pointer"
          color="white"
          size={20}
        />
      </div>
    </div>
  )
}

ErrorAlert.defaultProps = {
  onClose: () => '',
  message: ''
}

ErrorAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default ErrorAlert
