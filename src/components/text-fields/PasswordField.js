import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ width, placeholder, onChange, errorLabel, type }) => {
  const [value, setValue] = useState('')
  const [isBlur, setIsBlur] = useState(false)

  const showError = () => {
    if (!value && isBlur)
      return <label className="text-field-error">{errorLabel}</label>
    else return <div />
  }

  return (
    <div className="text-field-container">
      <input
        type={type}
        style={{ width }}
        className={!value && isBlur ? 'text-field-empty' : 'text-field'}
        placeholder={placeholder}
        onChange={(evt) => {
          setIsBlur(true)
          onChange(evt)
          setValue(evt.target.value)
        }}
      />
      {showError()}
    </div>
  )
}

TextField.defaultProps = {
  width: 200,
  type: 'password',
  placeholder: '',
  onChange: () => {},
  errorLabel: 'Field is empty!'
}

TextField.propTypes = {
  width: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorLabel: PropTypes.string
}

export default TextField
