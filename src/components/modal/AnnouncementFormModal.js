/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'

const AnnouncementFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isUpdate
}) => {
  const schema = Yup.object().shape({
    title: Yup.string().required('Required').nullable(),
    content: Yup.string().required('Required').nullable()
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
          <h1>{isUpdate ? 'Update Announcement' : 'New Announcement'}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          validator={() => ({})}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <TextField
                errors={errors}
                touched={touched}
                width={320}
                value={
                  values.title.charAt(0).toUpperCase() + values.title.slice(1)
                }
                id="title"
                name="title"
                placeholder="Title"
              />
              <Field
                id="content"
                name="content"
                render={() => (
                  <div>
                    <textarea
                      value={
                        values.content.charAt(0).toUpperCase() +
                        values.content.slice(1)
                      }
                      style={{ width: 320, marginBottom: 0 }}
                      className="text-field"
                      placeholder="Content"
                      rows="14"
                      cols="10"
                      wrap="soft"
                      onChange={(evt) =>
                        setFieldValue('content', evt.target.value)
                      }
                    />
                    {errors['content'] && touched['content'] && (
                      <div className="label-error">{`Content is Required.`}</div>
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

AnnouncementFormModal.defaultProps = {
  isOpen: false,
  initialValues: {
    title: '',
    content: ''
  },
  isUpdate: false
}

AnnouncementFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  isUpdate: PropTypes.bool
}

export default AnnouncementFormModal
