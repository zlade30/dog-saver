import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import ErrorAlert from 'components/alerts/ErrorAlert'
import Button from 'components/buttons/Button'
import { selectStyles } from 'utils/helpers'
import Select from 'react-select'

const SurrenderForm = ({
  isOpen,
  onClose,
  onSubmit,
  dogList,
  errorMsg,
  setErrorMsg
}) => {
  const [selected, setSelected] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [formValues, setFormValues] = useState({
    profile: '',
    color: '',
    breed: '',
    gender: ''
  })

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="right-modal"
      overlayClassName="overlay">
      <div className="flex justify-end w-full">
        <CloseLineIcon className="cursor-pointer" onClick={onClose} />
      </div>
      <div>
        <div className="w-full justify-center">
          <h1>Surrender Dog</h1>
        </div>
        <Formik
          initialValues={{
            surrender: ''
          }}
          validator={() => ({})}>
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              {errorMsg && (
                <ErrorAlert
                  message={errorMsg}
                  onClose={() => setErrorMsg('')}
                />
              )}
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Select a dog to surrender
              </label>
              <Field
                id="surrender"
                name="surrender"
                render={() => (
                  <div className="margin-b-10">
                    <Select
                      options={dogList.map((item) => ({
                        label: item?.name,
                        value: item
                      }))}
                      styles={selectStyles}
                      placeholder="Select a dog to surrender"
                      value={selected}
                      onChange={(selected) => {
                        setFormValues(selected?.value)
                        setSelected(selected)
                      }}
                    />
                    {!Object?.keys(selected).length && isSubmit ? (
                      <div className="label-error">{`Dog is Required.`}</div>
                    ) : (
                      <div />
                    )}
                  </div>
                )}
              />
              <div style={{ marginBottom: 40 }} />
              <Field
                id="profile"
                name="profile"
                render={() => (
                  <div className="margin-b-10">
                    <AvatarSelection
                      src={formValues?.profile}
                      setImg={(value) => setFieldValue('profile', value)}
                      isClickable={false}
                    />
                    {errors['profile'] && touched['profile'] && (
                      <div
                        className="label-error"
                        style={{
                          width: '100%',
                          textAlign: 'center'
                        }}>{`Profile Image is Required.`}</div>
                    )}
                  </div>
                )}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Color</label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  formValues?.color &&
                  formValues?.color?.charAt(0)?.toUpperCase() +
                    formValues?.color?.slice(1)
                }
                disabled
                id="color"
                name="color"
                placeholder="Color"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Breed</label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                disabled
                value={
                  formValues?.breed &&
                  formValues?.breed?.charAt(0)?.toUpperCase() +
                    formValues?.breed?.slice(1)
                }
                id="breed"
                name="breed"
                placeholder="Breed"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Gender</label>
              <TextField
                disabled
                errors={errors}
                touched={touched}
                width={320}
                value={
                  formValues?.gender?.label &&
                  formValues?.gender?.label.charAt(0)?.toUpperCase() +
                    formValues?.gender?.label?.slice(1)
                }
                id="gender"
                name="gender"
                placeholder="Gender"
                style={{ marginTop: 10 }}
              />
              <Button
                id="sign-up"
                type="submit"
                width={320}
                onClick={() => {
                  setIsSubmit(true)
                  if (Object?.keys(selected).length > 0) {
                    onSubmit(formValues)
                  }
                }}
                value="Surrender Dog"
              />
            </Form>
          )}
        </Formik>
      </div>
    </ReactModal>
  )
}

SurrenderForm.defaultProps = {
  isOpen: false,
  initialValues: {
    profile: '',
    color: '',
    breed: '',
    gender: ''
  }
}

SurrenderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dogList: PropTypes.array.isRequired,
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  onSurrender: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

export default SurrenderForm
