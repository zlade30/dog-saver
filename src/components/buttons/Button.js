import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, width, height, fontWeight, ...rest }) => {
  return (
    <button style={{ width, height, fontWeight }} {...rest} className="button">
      {value}
    </button>
  )
}

Button.defaultProps = {
  value: '',
  width: 200
}

Button.propTypes = {
  value: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontWeight: PropTypes.string
}

export default Button
