/* eslint-disable react/display-name */
import React, { useContext, useEffect, useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { getUserListAction } from 'redux/actions/user.action'
import {
  dogFilterOptions,
  orderOptions,
  selectStyles,
  userFilterOptions,
  userSortOptions
} from 'utils/helpers'
import Select from 'react-select'
import { getDogBreedsAction } from 'redux/actions/dog.action'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { UserContext } from 'contexts/user.context'
import { fire } from 'firebase'

const DogRightModal = ({
  isOpen,
  onClose,
  onSubmit,
  errorMsg,
  setErrorMsg,
  setProfile,
  initialValues,
  isUpdate,
  setEuthSched
}) => {
  const dispatch = useDispatch()
  const [userList, setUserList] = useState([])
  const [breedList, setBreedList] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [selectedStatus, setSelectedStatus] = useState('')
  const { user } = useContext(UserContext)

  const schema = Yup.object().shape({
    owner: Yup.object().required('Required').nullable(),
    name: Yup.string().required('Required'),
    breed: Yup.object().required('Required').nullable(),
    status: Yup.object().required('Required').nullable()
  })

  const statusOption = dogFilterOptions
    .filter((item) => item.label !== 'All')
    .filter((item) => item.label !== 'Archive')

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(initialValues?.status?.value)
      setEuthSched(initialValues?.euthSched || fire.firestore.Timestamp.now())
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
                value: item?.email
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

      dispatch(
        getDogBreedsAction({
          onSuccess: (payload) => {
            const list = payload?.map((item) => ({
              label: item?.name,
              value: item?.id
            }))
            console.log(list)
            setBreedList(list)
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
              {user?.role === 'admin' ? (
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
              ) : (
                <div />
              )}
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values.name.charAt(0).toUpperCase() + values.name.slice(1)
                }
                id="name"
                name="name"
                placeholder="Dog Name"
                style={{ marginBottom: 0 }}
              />
              <Field
                id="breed"
                name="breed"
                render={() => (
                  <div className="margin-b-10">
                    <Select
                      options={breedList}
                      styles={selectStyles}
                      placeholder="Select Breed"
                      value={values.breed}
                      onChange={(selected) => setFieldValue('breed', selected)}
                    />
                    {errors['breed'] && touched['breed'] && (
                      <div className="label-error">{`Breed is Required.`}</div>
                    )}
                  </div>
                )}
              />
              <Field
                id="status"
                name="status"
                render={() => (
                  <div className="margin-b-10">
                    <Select
                      options={statusOption}
                      styles={selectStyles}
                      placeholder="Select Status"
                      value={values.status}
                      onChange={(selected) => {
                        setFieldValue('status', selected)
                        setSelectedStatus(selected.value)
                      }}
                    />
                    {errors['status'] && touched['status'] && (
                      <div className="label-error">{`Status is Required.`}</div>
                    )}
                  </div>
                )}
              />
              {selectedStatus === 'Euthanasia' && (
                <Field
                  id="euthSched"
                  name="euthSched"
                  render={() => (
                    <div className="margin-b-10 relative">
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
                        selected={startDate}
                        dateFormat="MM/dd/yyyy"
                        onChange={(date) => {
                          setStartDate(date)
                          setEuthSched(fire.firestore.Timestamp.fromDate(date))
                        }}
                        onChangeRaw={(evt) => evt.preventDefault()}
                        placeholderText="Select euthanize schedule"
                        minDate={moment().toDate()}
                      />
                      {errors['euthSched'] && touched['euthSched'] && (
                        <div className="label-error">{`Schedule is Required.`}</div>
                      )}
                    </div>
                  )}
                />
              )}
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

DogRightModal.defaultProps = {
  isOpen: false,
  initialValues: {
    owner: '',
    name: '',
    breed: '',
    status: '',
    archive: false
  },
  isUpdate: false
}

DogRightModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isUpdate: PropTypes.bool,
  setEuthSched: PropTypes.func
}

export default DogRightModal
