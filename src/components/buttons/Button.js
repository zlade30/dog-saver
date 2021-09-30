import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, width, height, ...rest }) => {
  return (
    <button style={{ width, height }} {...rest} className="button">
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
  height: PropTypes.number
}

export default Button
