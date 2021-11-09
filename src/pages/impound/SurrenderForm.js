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
import { selectStyles } from 'utils/helpers'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { getDogBreedsAction } from 'redux/actions/dog.action'

const SurrenderForm = ({
  isOpen,
  onClose,
  onSubmit,
  errorMsg,
  setErrorMsg,
  initialValues,
  setShowViewDogImagesModal,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4
}) => {
  const dispatch = useDispatch()

  const [breedList, setBreedList] = useState([])

  const schema = Yup.object().shape({
    profile: Yup.mixed().required('Required').nullable(),
    color: Yup.string().required('Required'),
    breed: Yup.string().required('Required'),
    gender: Yup.object().required('Required').nullable()
  })

  useEffect(() => {
    if (isOpen) {
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
          <h1>Surrender Dog</h1>
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
                  <div className="margin-b-10 cursor-pointer">
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
                        console.log(values?.profile[0])
                        setDogImage1(values?.profile[0])
                        setDogImage2(values?.profile[1])
                        setDogImage3(values?.profile[2])
                        setDogImage4(values?.profile[3])
                        setShowViewDogImagesModal(true)
                      }}>
                      <img
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 12,
                          objectFit: 'contain',
                          cursor: 'pointer'
                        }}
                        src={values?.profile[0]}
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
              <Button
                id="sign-up"
                type="submit"
                width={320}
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
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  setDogImage1: PropTypes.func.isRequired,
  setDogImage2: PropTypes.func.isRequired,
  setDogImage3: PropTypes.func.isRequired,
  setDogImage4: PropTypes.func.isRequired,
  setShowViewDogImagesModal: PropTypes.func.isRequired
}

export default SurrenderForm
