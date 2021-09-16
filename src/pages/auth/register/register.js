import React, { useContext, useState } from 'react'
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
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { UserContext } from 'contexts/user.context'

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { setUser } = useContext(UserContext)

  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()
  const [showLoader, setShowLoader] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const onCreateUpload = (values) => {
    dispatch(
      uploadUserImageAction({
        data: { file: profile },
        onSuccess: (response) => {
          dispatch(
            createUserAction({
              data: { ...values, profile: response?.data },
              onSuccess: () => {
                setShowLoader(false)
                setUser({ ...values, profile: response?.data })
                history.push('/')
              },
              onFailure: (error) => {
                setShowLoader(false)
                setErrorMsg(error)
              }
            })
          )
        },
        onFailure: (error) => {
          setShowLoader(false)
          setErrorMsg(error)
        }
      })
    )
  }

  const onCreateAccount = (values) => {
    dispatch(
      createUserAction({
        data: values,
        onSuccess: () => {
          setShowLoader(false)
          setUser(values)
          history.push('/')
        },
        onFailure: (error) => {
          console.log(error)
          setShowLoader(false)
          setErrorMsg(error)
        }
      })
    )
  }

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
                createAccountAction({
                  data: {
                    email: values?.email,
                    password: values?.password
                  },
                  onSuccess: () => {
                    delete values.password
                    if (profile) onCreateUpload(values)
                    else onCreateAccount(values)
                  },
                  onFailure: (error) => {
                    setErrorMsg(error)
                    setShowLoader(false)
                  }
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
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
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  type="number"
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

export default Register
