import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, width }) => {
  return (
    <button style={{ width }} className="button">
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
  width: PropTypes.number
}

export default Button
