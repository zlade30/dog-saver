import React, { useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import {
  createAccountAction,
  createUserAction
} from 'redux/actions/user.action'
import { uploadUserImageAction } from 'redux/actions/utils.action'
import ErrorAlert from 'components/alerts/ErrorAlert'
import UserProvider from 'contexts/user.context'
import { validateEmail } from 'utils/helpers'
import { authRecaptcha } from 'firebase'

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()

  const schema = Yup.object().shape({
    username: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const onCreateUpload = (values) => {
    dispatch(
      uploadUserImageAction({
        data: { file: profile },
        onSuccess: (response) => {
          console.log('upload', response)
          console.log(values)
          dispatch(
            createUserAction({
              data: { ...values, profile: response?.data },
              onSuccess: (response) => console.log(response),
              onFailure: (error) => setErrorMsg(error)
            })
          )
        },
        onFailure: (error) => setErrorMsg(error)
      })
    )
  }

  const onCreateAccount = (values) => {
    dispatch(
      createUserAction({
        data: values,
        onSuccess: (response) => console.log(response),
        onFailure: (error) => setErrorMsg(error)
      })
    )
  }

  return (
    <UserProvider>
      <div className="auth-container">
        <div className="auth-form">
          <div>
            <div className="logo">
              <img className="logo-img" src="assets/icons/dog.png" />
              Dog Saver
            </div>
            <Formik
              initialValues={{
                username: '',
                lastName: '',
                firstName: '',
                middleName: '',
                address: '',
                password: ''
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                let appVerifier = null
                if (
                  !validateEmail(values?.username) &&
                  !isNaN(values?.username)
                ) {
                  window.recaptchaVerifier = new authRecaptcha.RecaptchaVerifier(
                    'sign-up',
                    {
                      size: 'invisible'
                    }
                  )
                  appVerifier = window.recaptchaVerifier
                }

                dispatch(
                  createAccountAction({
                    data: {
                      username: values?.username,
                      password: values?.password,
                      isEmail: validateEmail(values?.username),
                      appVerifier
                    },
                    onSuccess: () => {
                      delete values.password
                      if (profile) onCreateUpload(values)
                      else onCreateAccount(values)
                    },
                    onFailure: (error) => setErrorMsg(error)
                  })
                )
              }}
              validator={() => ({})}>
              {({ errors, touched }) => (
                <Form>
                  <Field name="profile">
                    {() => <AvatarSelection setImg={setProfile} />}
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
                    id="username"
                    name="username"
                    placeholder="Email/Phone"
                  />
                  <TextField
                    errors={errors}
                    touched={touched}
                    width={320}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
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
                    id="middleName"
                    name="middleName"
                    placeholder="Middle Name"
                  />
                  <TextField
                    errors={errors}
                    touched={touched}
                    width={320}
                    id="address"
                    name="address"
                    placeholder="Address"
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
                    id="sign-up"
                    type="submit"
                    width={320}
                    value="Sign Up"
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <span>
              <label>Already have an account?</label>
              <label
                onClick={() => history.push('/login')}
                className="register">
                Sign In
              </label>
            </span>
          </div>
        </div>
        <div className="auth-content">
          <img src="assets/icons/auth-img.png" />
        </div>
      </div>
    </UserProvider>
  )
}

export default Register
