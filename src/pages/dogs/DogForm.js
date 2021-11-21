import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import ImageAddLineIcon from 'remixicon-react/ImageAddLineIcon'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import ErrorAlert from 'components/alerts/ErrorAlert'
import Button from 'components/buttons/Button'
import Switch from 'react-switch'
import {
  orderOptions,
  selectStyles,
  userFilterOptions,
  userSortOptions
} from 'utils/helpers'
import Select from 'react-select'
import ReactDatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import { getUserListAction } from 'redux/actions/user.action'
import { fire } from 'firebase'
import { UserContext } from 'contexts/user.context'

const DogForm = ({
  isOpen,
  onClose,
  onSubmit,
  errorMsg,
  setErrorMsg,
  initialValues,
  isUpdate,
  setShowDogImagesModal,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4,
  checkPP,
  setCheckPP,
  setShowPP
}) => {
  const dispatch = useDispatch()

  const [startVaccineDate, setStartVaccineDate] = useState(new Date())
  const [userList, setUserList] = useState([])

  const { user } = useContext(UserContext)

  const schema = Yup.object().shape({
    owner: Yup.object().required('Required').nullable(),
    ownerAddress: Yup.string(),
    profile: Yup.array().required('Required').nullable(),
    name: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    breed: Yup.string().required('Required'),
    gender: Yup.object().required('Required').nullable(),
    spayed: Yup.boolean().required('Required'),
    vaccineReceived: Yup.string('').notRequired(),
    vaccineDate: Yup.string('').notRequired(),
    birthday: Yup.string().required('Required')
  })

  useEffect(() => {
    if (isOpen) {
      setStartVaccineDate(initialValues?.vaccineDate?.toDate())
      setErrorMsg('')

      if (user?.role === 'admin') {
        dispatch(
          getUserListAction({
            data: {
              filterBy: userFilterOptions[0].value,
              sortBy: userSortOptions[0].value,
              order: orderOptions[0].value
            },
            onSuccess: (payload) => {
              const list = payload?.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item
              }))
              console.log(list)
              setUserList(list)
            },
            onFailure: (error) => {
              console.log(error)
            }
          })
        )
      }
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
      <div style={{ overflow: 'auto', overflowX: 'hidden', maxHeight: 900 }}>
        <div className="w-full justify-center">
          <h1>{isUpdate ? 'Update Dog' : 'Register Dog'}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            if (checkPP || isUpdate) {
              onSubmit({ ...values, profile: initialValues?.profile })
            } else {
              setErrorMsg('Error: Privacy policy must be check.')
            }
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
              <Field
                id="profile"
                name="profile"
                render={() => (
                  <div className="margin-b-10 cursor-pointer">
                    {initialValues?.profile?.length > 0 ? (
                      <div
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                        onClick={() => {
                          console.log(initialValues?.profile[0])
                          setDogImage1(initialValues?.profile[0])
                          setDogImage2(initialValues?.profile[1])
                          setDogImage3(initialValues?.profile[2])
                          setDogImage4(initialValues?.profile[3])
                          setShowDogImagesModal(true)
                        }}>
                        <img
                          style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 12,
                            objectFit: 'contain',
                            cursor: 'pointer'
                          }}
                          src={
                            typeof initialValues?.profile[0] !== 'string'
                              ? URL.createObjectURL(initialValues?.profile[0])
                              : initialValues?.profile[0]
                          }
                        />
                        <div
                          style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1,
                            position: 'absolute'
                          }}
                        />
                        <label
                          style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'white',
                            position: 'absolute',
                            zIndex: 2
                          }}>{`+3`}</label>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => {
                          setDogImage1()
                          setDogImage2()
                          setDogImage3()
                          setDogImage4()
                          setShowDogImagesModal(true)
                        }}>
                        <ImageAddLineIcon
                          className="cursor-pointer"
                          size={100}
                        />
                      </div>
                    )}
                    {touched['profile'] && initialValues?.profile?.length <= 0 && (
                      <div
                        className="label-error"
                        style={{
                          width: '100%',
                          textAlign: 'center'
                        }}>{`Profile Images are Required.`}</div>
                    )}
                  </div>
                )}
              />
              {user?.role === 'admin' ? (
                <div>
                  <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                    Owner
                  </label>
                  <Field
                    id="owner"
                    name="owner"
                    render={() => (
                      <div className="margin-b-10">
                        <Select
                          options={userList}
                          styles={selectStyles}
                          placeholder="Select Owner"
                          value={values.owner}
                          onChange={(selected) =>
                            setFieldValue('owner', selected)
                          }
                        />
                        {errors['owner'] && touched['owner'] && (
                          <div className="label-error">{`Owner is Required.`}</div>
                        )}
                      </div>
                    )}
                  />
                </div>
              ) : (
                <div />
              )}
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Dog Name
              </label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.name &&
                  values?.name?.charAt(0)?.toUpperCase() +
                    values?.name?.slice(1)
                }
                id="name"
                name="name"
                placeholder="Dog Name"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Color</label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.color &&
                  values?.color?.charAt(0)?.toUpperCase() +
                    values?.color?.slice(1)
                }
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
                value={
                  values?.breed &&
                  values?.breed?.charAt(0)?.toUpperCase() +
                    values?.breed?.slice(1)
                }
                id="breed"
                name="breed"
                placeholder="Breed"
                style={{ marginTop: 10 }}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>Gender</label>
              <Field
                id="gender"
                name="gender"
                render={() => (
                  <div className="margin-b-10">
                    <Select
                      options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' }
                      ]}
                      styles={selectStyles}
                      placeholder="Select Gender"
                      value={values.gender}
                      onChange={(selected) => setFieldValue('gender', selected)}
                    />
                    {errors['gender'] && touched['gender'] && (
                      <div className="label-error">{`Gender is Required.`}</div>
                    )}
                  </div>
                )}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Birthday
              </label>
              <Field
                id="birthday"
                name="birthday"
                render={() => (
                  <div
                    className="margin-b-10 relative"
                    style={{ marginTop: 10 }}>
                    <CalendarLineIcon
                      size={18}
                      style={{
                        position: 'absolute',
                        right: 0,
                        zIndex: 10,
                        marginTop: 10,
                        marginRight: 10
                      }}
                    />
                    <ReactDatePicker
                      className="text-field w-320"
                      selected={values?.birthday?.toDate()}
                      dateFormat="MM/dd/yyyy"
                      onChange={(date) => {
                        setFieldValue(
                          'birthday',
                          fire.firestore.Timestamp.fromDate(date)
                        )
                      }}
                      onChangeRaw={(evt) => evt.preventDefault()}
                      placeholderText="Select Birthday"
                    />
                    {errors['birthday'] && touched['birthday'] && (
                      <div className="label-error">{`Birthday is required.`}</div>
                    )}
                  </div>
                )}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Vaccine Received
              </label>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values?.vaccineReceived &&
                  values?.vaccineReceived?.charAt(0)?.toUpperCase() +
                    values?.vaccineReceived?.slice(1)
                }
                id="vaccineReceived"
                name="vaccineReceived"
                placeholder="Vaccine Received"
                style={{ marginTop: 10 }}
              />
              {values?.vaccineReceived && (
                <div>
                  <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                    Vaccine Date
                  </label>
                  <Field
                    id="vaccineDate"
                    name="vaccineDate"
                    render={() => (
                      <div
                        className="margin-b-10 relative"
                        style={{ marginTop: 10 }}>
                        <CalendarLineIcon
                          size={18}
                          style={{
                            position: 'absolute',
                            right: 0,
                            zIndex: 10,
                            marginTop: 10,
                            marginRight: 10
                          }}
                        />
                        <ReactDatePicker
                          className="text-field w-320"
                          selected={startVaccineDate}
                          dateFormat="MM/dd/yyyy"
                          onChange={(date) => {
                            setStartVaccineDate(date)
                            setFieldValue(
                              'vaccineDate',
                              fire.firestore.Timestamp.fromDate(date)
                            )
                          }}
                          onChangeRaw={(evt) => evt.preventDefault()}
                          placeholderText="Select Vaccine Date"
                        />
                        {errors['vaccineDate'] && touched['vaccineDate'] && (
                          <div className="label-error">{`Vaccine Date is required.`}</div>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 10
                }}>
                <label
                  style={{ fontWeight: 'bold', fontSize: 14, marginRight: 4 }}>
                  Spayed or Neutered
                </label>
                <Field
                  id="spayed"
                  name="spayed"
                  render={() => (
                    <div className="relative" style={{ marginLeft: 10 }}>
                      <Switch
                        checked={values?.spayed}
                        onChange={(checked) => setFieldValue('spayed', checked)}
                        onColor="#42C2D3"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={40}
                      />
                      {errors['spayed'] && touched['spayed'] && (
                        <div className="label-error">{`Spayed or Neutered is required.`}</div>
                      )}
                    </div>
                  )}
                />
              </div>
              {!isUpdate ? (
                <div className="flex items-center">
                  <input
                    checked={checkPP}
                    type="checkbox"
                    onChange={() => {
                      setCheckPP(!checkPP)
                      setShowPP(!checkPP)
                    }}
                  />
                  <label
                    onClick={() => {
                      setCheckPP(!checkPP)
                      setShowPP(!checkPP)
                    }}
                    className="register">
                    Privacy Policy
                  </label>
                </div>
              ) : (
                <div />
              )}
              <Button
                id="sign-up"
                type="submit"
                width={320}
                value={`${isUpdate ? 'Update' : 'Register'}`}
              />
            </Form>
          )}
        </Formik>
      </div>
    </ReactModal>
  )
}

DogForm.defaultProps = {
  isOpen: false,
  initialValues: {
    owner: '',
    ownerAddress: '',
    name: '',
    profile: '',
    color: '',
    breed: '',
    gender: '',
    spayed: false,
    vaccineReceived: '',
    birthday: new Date(),
    vaccineDate: new Date()
  },
  isUpdate: false
}

DogForm.propTypes = {
  isUpdate: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  setShowDogImagesModal: PropTypes.func.isRequired,
  setDogImage1: PropTypes.func.isRequired,
  setDogImage2: PropTypes.func.isRequired,
  setDogImage3: PropTypes.func.isRequired,
  setDogImage4: PropTypes.func.isRequired,
  checkPP: PropTypes.bool,
  setCheckPP: PropTypes.func,
  setShowPP: PropTypes.func
}

export default DogForm
