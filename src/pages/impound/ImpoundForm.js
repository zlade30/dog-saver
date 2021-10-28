import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import ErrorAlert from 'components/alerts/ErrorAlert'
import Button from 'components/buttons/Button'
import { selectStyles } from 'utils/helpers'
import Select from 'react-select'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { getDogBreedsAction } from 'redux/actions/dog.action'
import { getPuroksAction } from 'redux/actions/user.action'
import { fire } from 'firebase'

const ImpoundForm = ({
  isOpen,
  onClose,
  onSubmit,
  errorMsg,
  setErrorMsg,
  initialValues,
  isUpdate
}) => {
  const dispatch = useDispatch()

  const [startDateCaught, setStartDateCaught] = useState(new Date())
  const [startEuthDate, setStartEuthDate] = useState(new Date())
  const [breedList, setBreedList] = useState([])
  const [purokList, setPurokList] = useState([])

  const schema = Yup.object().shape({
    profile: Yup.mixed().required('Required').nullable(),
    color: Yup.string().required('Required'),
    breed: Yup.string().required('Required'),
    gender: Yup.object().required('Required').nullable(),
    locationCaught: Yup.object().required('Required').nullable(),
    dateCaught: Yup.string().required('Required'),
    euthSched: Yup.string().required('Required')
  })

  useEffect(() => {
    if (isOpen) {
      console.log(initialValues)
      setStartDateCaught(initialValues?.dateCaught?.toDate())
      setStartEuthDate(initialValues?.euthSched?.toDate())
      dispatch(
        getDogBreedsAction({
          onSuccess: (payload) => {
            const list = payload?.map((item) => ({
              label: item?.name,
              value: item?.id
            }))
            setBreedList(list)
          },
          onFailure: (error) => {
            console.log(error)
          }
        })
      )

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
          <h1>{isUpdate ? 'Update Dog' : 'New Dog'}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
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
                  <div className="margin-b-10">
                    <AvatarSelection
                      src={initialValues?.profile}
                      setImg={(value) => setFieldValue('profile', value)}
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
                Location Caught
              </label>
              <Field
                id="locationCaught"
                name="locationCaught"
                render={() => (
                  <div className="margin-b-10">
                    <Select
                      options={purokList}
                      styles={selectStyles}
                      placeholder="Select Location Caught"
                      value={values.locationCaught}
                      onChange={(selected) =>
                        setFieldValue('locationCaught', selected)
                      }
                    />
                    {errors['locationCaught'] && touched['locationCaught'] && (
                      <div className="label-error">{`Location Caught is Required.`}</div>
                    )}
                  </div>
                )}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Date Caught
              </label>
              <Field
                id="dateCaught"
                name="dateCaught"
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
                      selected={startDateCaught}
                      dateFormat="MM/dd/yyyy"
                      onChange={(date) => {
                        setStartDateCaught(date)
                        setFieldValue(
                          'dateCaught',
                          fire.firestore.Timestamp.fromDate(date)
                        )
                      }}
                      onChangeRaw={(evt) => evt.preventDefault()}
                      placeholderText="Select Date Caught"
                    />
                    {errors['dateCaught'] && touched['dateCaught'] && (
                      <div className="label-error">{`Date Caught is required.`}</div>
                    )}
                  </div>
                )}
              />
              <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                Euthanize Schedule
              </label>
              <Field
                id="euthSched"
                name="euthSched"
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
                      selected={startEuthDate}
                      dateFormat="MM/dd/yyyy"
                      onChange={(date) => {
                        setStartEuthDate(date)
                        setFieldValue(
                          'euthSched',
                          fire.firestore.Timestamp.fromDate(date)
                        )
                      }}
                      onChangeRaw={(evt) => evt.preventDefault()}
                      placeholderText="Select Euthanize Schedule"
                      minDate={moment().toDate()}
                    />
                    {errors['euthSched'] && touched['euthSched'] && (
                      <div className="label-error">{`Euthanize Schedule is required.`}</div>
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

ImpoundForm.defaultProps = {
  isOpen: false,
  initialValues: {
    profile: '',
    color: '',
    breed: '',
    gender: '',
    locationCaught: '',
    dateCaught: '',
    euthSched: ''
  },
  isUpdate: false
}

ImpoundForm.propTypes = {
  isUpdate: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

export default ImpoundForm
