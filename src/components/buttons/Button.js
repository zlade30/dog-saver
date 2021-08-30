import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value }) => {
  return <button className="button">{value}</button>
}

Button.defaultProps = {
  value: ''
}

Button.propTypes = {
  value: PropTypes.string
}

export default Button
