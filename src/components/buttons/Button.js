import React from 'react'
import PropTypes from 'prop-types'
import PrinterLineIcon from 'remixicon-react/PrinterLineIcon'

const Button = ({ value, width, height, fontWeight, showIcon, ...rest }) => {
  return (
    <button
      style={{
        width,
        height,
        fontWeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: rest.disabled ? 'gray' : '',
        cursor: rest.disabled ? 'default' : 'pointer'
      }}
      {...rest}
      className="button">
      {value}
      {showIcon && (
        <PrinterLineIcon size={20} className="margin-l-10 cursor-pointer" />
      )}
    </button>
  )
}

Button.defaultProps = {
  value: '',
  width: 200,
  showIcon: false
}

Button.propTypes = {
  value: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontWeight: PropTypes.string,
  showIcon: PropTypes.bool
}

export default Button
