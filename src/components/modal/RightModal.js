import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import ErrorAlert from 'components/alerts/ErrorAlert'
import Button from 'components/buttons/Button'
import { useDispatch } from 'react-redux'
import { getPuroksAction } from 'redux/actions/user.action'
import Select from 'react-select'
import { selectStyles } from 'utils/helpers'

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
  const dispatch = useDispatch()
  const [purokList, setPurokList] = useState([])

  const schema = Yup.object().shape({
    email: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.object().required('Required').nullable()
  })

  useEffect(() => {
    if (isOpen) {
      dispatch(
        getPuroksAction({
          onSuccess: (payload) => {
            const list = payload?.map((item) => ({
              label: `${item.name}`,
              value: item?.id
            }))
            setPurokList(() => list)
          },
          onFailure: (error) => {
            console.log(error)
          }
        })
      )
    }
  }, [isOpen])

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
          {({ errors, touched, values, setFieldValue }) => (
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
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={values?.email}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                First Name
              </label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.firstName &&
                  values?.firstName?.charAt(0)?.toUpperCase() +
                    values?.firstName?.slice(1)
                }
                id="firstName"
                name="firstName"
                placeholder="First Name"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Last Name
              </label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.lastName &&
                  values?.lastName?.charAt(0)?.toUpperCase() +
                    values?.lastName?.slice(1)
                }
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Middle Name
              </label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.middleName &&
                  values?.middleName?.charAt(0)?.toUpperCase() +
                    values?.middleName?.slice(1)
                }
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Phone</label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={values?.phone}
                id="phone"
                name="phone"
                type="number"
                placeholder="Phone"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Address</label>
              <Field
                id="address"
                name="address"
                render={() => (
                  <div className="margin-b-10" style={{ marginTop: 10 }}>
                    <Select
                      options={purokList}
                      styles={selectStyles}
                      placeholder="Select Address"
                      value={values.address}
                      onChange={(selected) =>
                        setFieldValue('address', selected)
                      }
                    />
                    {errors['address'] && touched['address'] && (
                      <div className="label-error">{`Address is Required.`}</div>
                    )}
                  </div>
                )}
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
