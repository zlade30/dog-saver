import React from 'react'
import PropTypes from 'prop-types'

const Divider = ({ width, color }) => {
  return <div className="divider" style={{ width, backgroundColor: color }} />
}

Divider.defaultProps = {
  color: '#C5BFBF'
}

Divider.propTypes = {
  width: PropTypes.any,
  color: PropTypes.string
}

export default Divider
