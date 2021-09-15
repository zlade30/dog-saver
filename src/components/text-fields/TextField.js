import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

const TextField = ({ errors, touched, width, placeholder, ...rest }) => {
  return (
    <div className="text-field-container">
      <Field
        style={{ width }}
        className={
          errors[rest.name] && touched[rest.name]
            ? 'text-field-error'
            : 'text-field'
        }
        placeholder={placeholder}
        {...rest}
      />
      {errors[rest.name] && touched[rest.name] && (
        <div className="label-error">{`${placeholder} is Required!`}</div>
      )}
    </div>
  )
}

TextField.defaultProps = {
  width: 200,
  placeholder: ''
}

TextField.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  width: PropTypes.number,
  placeholder: PropTypes.string
}

export default TextField
