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

const DogRightModal = ({
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
    owner: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    breed: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    euthSched: Yup.string().required('Required')
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
          <h1>{isUpdate ? 'Update Dog' : 'New Dog'}</h1>
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
                id="owner"
                name="owner"
                placeholder="Owner"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="name"
                name="name"
                placeholder="Dog Name"
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
                id="breed"
                name="breed"
                placeholder="Breed"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="status"
                name="status"
                placeholder="Status"
              />
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                id="schedule"
                name="schedule"
                placeholder="Schedule"
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

DogRightModal.defaultProps = {
  isOpen: false,
  initialValues: {
    owner: '',
    name: '',
    breed: '',
    status: '',
    euthSched: '',
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
  isUpdate: PropTypes.bool
}

export default DogRightModal
