import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, width, onClick }) => {
  return (
    <button onClick={onClick} style={{ width }} className="button">
      {value}
    </button>
  )
}

Button.defaultProps = {
  value: '',
  width: 200,
  onClick: () => ''
}

Button.propTypes = {
  value: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func
}

export default Button
