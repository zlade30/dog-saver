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
    username: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().notRequired(),
    suffix: Yup.string().notRequired(),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: isUpdate
      ? Yup.string().notRequired()
      : Yup.string().required('Required')
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
      <div style={{ height: 900, overflow: 'auto' }}>
        <div className="w-full justify-center">
          <h1>{isUpdate ? 'Update User' : 'New User'}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          validator={() => ({})}>
          {({ errors, touched, values }) => (
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
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Email</label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Username
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={values?.username}
                id="username"
                name="username"
                placeholder="Username"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                First Name
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.firstName?.charAt(0)?.toUpperCase() +
                  values?.firstName?.slice(1)
                }
                id="firstName"
                name="firstName"
                placeholder="First Name"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Last Name
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.lastName?.charAt(0)?.toUpperCase() +
                  values?.lastName?.slice(1)
                }
                id="lastName"
                name="lastName"
                placeholder="Last Name"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Middle Name
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.middleName?.charAt(0)?.toUpperCase() +
                    values?.middleName?.slice(1) || ''
                }
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Suffix</label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.suffix?.charAt(0)?.toUpperCase() +
                    values?.suffix?.slice(1) || ''
                }
                id="suffix"
                name="suffix"
                placeholder="Suffix"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Phone</label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="phone"
                name="phone"
                placeholder="Phone Number"
                type="number"
                style={{ marginBottom: 4 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Address
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.address?.charAt(0)?.toUpperCase() +
                    values?.address?.slice(1) || ''
                }
                id="address"
                name="address"
                placeholder="Address"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Password
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                type="password"
                errors={errors}
                touched={touched}
                width={320}
                id="password"
                name="password"
                placeholder="Password"
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Confirm Password
              </label>
              <div style={{ marginTop: 4 }} />
              <TextField
                type="password"
                errors={errors}
                touched={touched}
                width={320}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
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
    suffix: '',
    username: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    archive: false
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
