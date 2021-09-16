import React, { useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import ErrorAlert from 'components/alerts/ErrorAlert'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { signInAction } from 'redux/actions/user.action'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  // useEffect(() => {
  //   const signIn = async () => {
  //     try {
  //       const res = await auth.signInWithEmailAndPassword(
  //         'sample@gmail.com',
  //         '123123'
  //       )
  //       console.log(res)
  //     } catch (err) {
  //       console.error(err)
  //       alert(err.message)
  //     }
  //   }
  //   signIn()
  // }, [])

  return (
    <div className="auth-container">
      {showLoader && <LoadingOverlay />}
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            Dog Saver
          </div>
          <Formik
            initialValues={{
              email: '',
              lastName: '',
              firstName: '',
              middleName: '',
              phone: '',
              address: '',
              password: ''
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setShowLoader(true)
              dispatch(
                signInAction({
                  data: values,
                  onSuccess: () => {
                    setShowLoader(false)
                    history.push('/')
                  },
                  onFailure: (error) => {
                    setShowLoader(false)
                    setErrorMsg(error)
                  }
                })
              )
              // dispatch(
              //   createAccountAction({
              //     data: {
              //       email: values?.email,
              //       password: values?.password
              //     },
              //     onSuccess: () => {
              //       delete values.password
              //       if (profile) onCreateUpload(values)
              //       else onCreateAccount(values)
              //     },
              //     onFailure: (error) => {
              //       setErrorMsg(error)
              //       setShowLoader(true)
              //     }
              //   })
              // )
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
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <TextField
                  type="password"
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <Button
                  id="sign-in"
                  type="submit"
                  width={320}
                  value="Sign In"
                />
                <div className="justify-center margin-t-20">
                  <label
                    onClick={() => history.push('/forgot-password')}
                    className="forgot-password">
                    Forgot Password?
                  </label>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <span>
            <label>Do not have an account yet?</label>
            <label
              onClick={() => history.push('/register')}
              className="register">
              Sign Up
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

export default Login
