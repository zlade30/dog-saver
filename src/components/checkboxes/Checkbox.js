import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ value }) => {
  return (
    <label className="checkbox">
      {value}
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
  )
}

Checkbox.defaultProps = {
  value: '',
}

Checkbox.propTypes = {
  value: PropTypes.string,
}

export default Checkbox
