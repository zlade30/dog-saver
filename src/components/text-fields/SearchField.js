import React from 'react'
import PropTypes from 'prop-types'

const SearchField = ({ width, placeholder, ...rest }) => {
  return (
    <div className="text-field-container margin-t-10">
      <input
        style={{ width }}
        className="text-field no-margin"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}

SearchField.defaultProps = {
  width: 200,
  placeholder: ''
}

SearchField.propTypes = {
  width: PropTypes.number,
  placeholder: PropTypes.string
}

export default SearchField
