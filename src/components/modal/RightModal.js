import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import ErrorAlert from 'components/alerts/ErrorAlert'
import Button from 'components/buttons/Button'

const RightModal = ({
  isOpen,
  onClose,
  onSubmit,
  errorMsg,
  setErrorMsg,
  setProfile,
  initialValues,
  isUpdate
}) => {
  const schema = Yup.object().shape({
    email: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required')
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
          <h1>{isUpdate ? 'Update User' : 'New User'}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          validator={() => ({})}>
          {({ errors, touched }) => (
            <Form>
              <Field name="profile">
                {() => (
                  <AvatarSelection
                    src={initialValues?.profile}
                    setImg={setProfile}
                  />
                )}
              </Field>
              {errorMsg && (
                <ErrorAlert
                  message={errorMsg}
                  onClose={() => setErrorMsg('')}
                />
              )}
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="phone"
                name="phone"
                placeholder="Phone Number"
                type="number"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="address"
                name="address"
                placeholder="Address"
              />
              <Button
                id="sign-up"
                type="submit"
                width={320}
                value={`${isUpdate ? 'Update' : 'Create'}`}
              />
            </Form>
          )}
        </Formik>
      </div>
    </ReactModal>
  )
}

RightModal.defaultProps = {
  isOpen: false,
  initialValues: {
    email: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    address: '',
    role: 'user'
  },
  isUpdate: false
}

RightModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isUpdate: PropTypes.bool
}

export default RightModal
