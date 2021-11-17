import React, { useContext, useEffect, useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import {
  createAccountAction,
  createUserAction,
  getPuroksAction
} from 'redux/actions/user.action'
import { uploadUserImageAction } from 'redux/actions/utils.action'
import ErrorAlert from 'components/alerts/ErrorAlert'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { UserContext } from 'contexts/user.context'
import Select from 'react-select'
import { selectStyles } from 'utils/helpers'
import { fire } from 'firebase'
import Overview from 'pages/overview'
import PrivacyPolicyModal from 'components/modal/PrivacyPolicyModal'

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { setUser } = useContext(UserContext)

  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()
  const [showLoader, setShowLoader] = useState(false)
  const [purokList, setPurokList] = useState([])

  const [checkPP, setCheckPP] = useState(false)
  const [showPP, setShowPP] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string().notRequired(),
    username: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    middleName: Yup.string().notRequired(),
    suffix: Yup.string().notRequired(),
    phone: Yup.string().notRequired(),
    address: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required')
  })

  const onCreateUpload = (values) => {
    dispatch(
      uploadUserImageAction({
        data: { file: profile },
        onSuccess: (response) => {
          dispatch(
            createUserAction({
              data: {
                ...values,
                profile: response?.data,
                dateAdded: new Date(),
                archive: false
              },
              onSuccess: () => {
                setShowLoader(false)
                setUser({
                  ...values,
                  profile: response?.data,
                  dateAdded: fire.firestore.Timestamp.fromDate(new Date()),
                  archive: false
                })
                localStorage.setItem(
                  'authUser',
                  JSON.stringify({
                    ...values,
                    profile: response?.data,
                    dateAdded: fire.firestore.Timestamp.fromDate(new Date()),
                    archive: false
                  })
                )
                history.push('/dogs')
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
        data: {
          ...values,
          dateAdded: new Date(),
          archive: false
        },
        onSuccess: () => {
          setShowLoader(false)
          setUser({
            ...values,
            dateAdded: fire.firestore.Timestamp.fromDate(new Date()),
            archive: false
          })
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              ...values,
              dateAdded: fire.firestore.Timestamp.fromDate(new Date()),
              archive: false
            })
          )
          history.push('/dogs')
        },
        onFailure: (error) => {
          console.log(error)
          setShowLoader(false)
          setErrorMsg(error)
        }
      })
    )
  }

  useEffect(() => {
    dispatch(
      getPuroksAction({
        onSuccess: (payload) => {
          const list = payload?.map((item) => ({
            label: `${item.name}`,
            value: item?.id
          }))
          setPurokList(() => list)
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
      <PrivacyPolicyModal isOpen={showPP} onClose={() => setShowPP(false)} />
      <div className="auth-form" style={{ height: '500', overflow: 'auto' }}>
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            BARK
          </div>
          <Formik
            initialValues={{
              email: '',
              lastName: '',
              firstName: '',
              middleName: '',
              suffix: '',
              username: '',
              phone: '',
              address: '',
              password: '',
              confirmPassword: '',
              role: 'user'
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              if (checkPP) {
                setShowLoader(true)
                if (values?.password === values?.confirmPassword) {
                  if (values.email) {
                    dispatch(
                      createAccountAction({
                        data: {
                          email: values?.email,
                          password: values?.password
                        },
                        onSuccess: () => {
                          delete values.confirmPassword
                          if (profile)
                            onCreateUpload({
                              ...values,
                              phone: `0${values?.phone}`
                            })
                          else
                            onCreateAccount({
                              ...values,
                              phone: `0${values?.phone}`
                            })
                        },
                        onFailure: (error) => {
                          setErrorMsg(error)
                          setShowLoader(false)
                        }
                      })
                    )
                  } else {
                    delete values.confirmPassword
                    if (profile)
                      onCreateUpload({
                        ...values,
                        phone: `0${values?.phone}`
                      })
                    else
                      onCreateAccount({
                        ...values,
                        phone: `0${values?.phone}`
                      })
                  }
                } else {
                  setShowLoader(false)
                  setErrorMsg('Error: password should be match.')
                }
              } else {
                setErrorMsg('Error: Privacy policy must be check.')
              }
            }}
            validator={() => ({})}>
            {({ errors, touched, values }) => (
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
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Username
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={values?.username}
                  id="username"
                  name="username"
                  placeholder="Username"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  First Name
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={
                    values.firstName.charAt(0).toUpperCase() +
                    values.firstName.slice(1)
                  }
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Last Name
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={
                    values.lastName.charAt(0).toUpperCase() +
                    values.lastName.slice(1)
                  }
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Middle Name
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={
                    values.middleName.charAt(0).toUpperCase() +
                    values.middleName.slice(1)
                  }
                  id="middleName"
                  name="middleName"
                  placeholder="Middle Name"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Suffix
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={
                    values.suffix.charAt(0).toUpperCase() +
                    values.suffix.slice(1)
                  }
                  id="suffix"
                  name="suffix"
                  placeholder="Suffix"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Phone
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  type="number"
                  style={{ marginBottom: 4 }}
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Address
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  value={
                    values.address.charAt(0).toUpperCase() +
                    values.address.slice(1)
                  }
                  id="address"
                  name="address"
                  placeholder="Address"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Password
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  type="password"
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Confirm Password
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  type="password"
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <div className="flex items-center">
                  <input
                    checked={checkPP}
                    type="checkbox"
                    onChange={() => {
                      setCheckPP(!checkPP)
                      setShowPP(!checkPP)
                    }}
                  />
                  <label
                    onClick={() => {
                      setCheckPP(!checkPP)
                      setShowPP(!checkPP)
                    }}
                    className="register">
                    Privacy Policy
                  </label>
                </div>
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
        <div style={{ marginTop: 4 }}>
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

export default Register
