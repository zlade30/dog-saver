import React, { useEffect, useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { auth } from 'firebase'
import ErrorAlert from 'components/alerts/ErrorAlert'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { toast } from 'react-toastify'
import Overview from 'pages/overview'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { adminUpdateUserAction, getUserAction } from 'redux/actions/user.action'

const ForgotPassword = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const schema = Yup.object().shape({
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required')
  })

  useEffect(() => {
    const email = new URLSearchParams(location.search).get('email')
    dispatch(
      getUserAction({
        data: { email },
        onSuccess: (response) => {
          setUser(response)
        },
        onFailure: (error) => {
          console.log(error)
        }
      })
    )
  }, [])

  return (
    <div className="auth-container">
      {showLoader && <LoadingOverlay />}
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            BARK
          </div>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: ''
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values)
              if (values?.password === values?.confirmPassword) {
                setShowLoader(true)
                dispatch(
                  adminUpdateUserAction({
                    data: {
                      id: user?.id,
                      values: {
                        password: values?.password
                      }
                    },
                    onSuccess: () => {
                      setShowLoader(false)
                      toast.success('Password changed successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    },
                    onFailure: () => {
                      toast.error('Something went wrong.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    }
                  })
                )
              } else {
                setErrorMsg('Error: Password should be match.')
              }
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
                  New Password
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Confirm Password
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <Button
                  id="sign-in"
                  type="submit"
                  width={320}
                  value="Change Password"
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
        <Overview />
      </div>
    </div>
  )
}

export default ForgotPassword
