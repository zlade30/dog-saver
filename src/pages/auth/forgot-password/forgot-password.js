import React, { useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { auth } from 'firebase'
import ErrorAlert from 'components/alerts/ErrorAlert'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string().required('Required')
  })

  return (
    <div className="auth-container">
      {showLoader && <LoadingOverlay />}
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            BARK
          </div>
          <div className="form-item" style={{ width: 200 }}>
            <label style={{ textJustify: 'inter-word', textAlign: 'justify' }}>
              Forgot Password? Kindly put your email for us to send you the
              method on resetting your password?
            </label>
          </div>
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values)
              setShowLoader(true)
              auth
                .sendPasswordResetEmail(values?.email)
                .then(() => {
                  setShowLoader(false)
                  toast.success(
                    'Link sent successfully. Kindly check your email.',
                    {
                      position: 'bottom-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined
                    }
                  )
                })
                .catch(() => {
                  setShowLoader(false)
                  setErrorMsg('Error: something went wrong.')
                })
            }}
            validator={() => ({})}>
            {({ errors, touched }) => (
              <Form>
                {errorMsg && (
                  <ErrorAlert
                    message={errorMsg}
                    onClose={() => setErrorMsg('')}
                  />
                )}
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Email
                </label>
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
                <Button
                  id="sign-in"
                  type="submit"
                  width={320}
                  value="Reset Password"
                />
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <span>
            <label>Already have an account?</label>
            <label onClick={() => history.push('/login')} className="register">
              Sign In
            </label>
          </span>
        </div>
      </div>
      <div className="auth-content">
        <img src="assets/icons/auth-img.png" />
      </div>
    </div>
  )
}

export default ForgotPassword
