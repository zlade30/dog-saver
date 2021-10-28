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
  initialValues
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
  initialValues: PropTypes.object.isRequired
}

export default SurrenderForm
