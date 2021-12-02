import React, { useContext, useState } from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import ErrorAlert from 'components/alerts/ErrorAlert'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { signInAction } from 'redux/actions/user.action'
import { UserContext } from 'contexts/user.context'
import Overview from 'pages/overview'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const { setUser } = useContext(UserContext)

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
            BARK
          </div>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setShowLoader(true)
              dispatch(
                signInAction({
                  data: values,
                  onSuccess: (response) => {
                    if (response) {
                      console.log(response)
                      setShowLoader(false)
                      setUser(response)
                      localStorage.setItem('authUser', JSON.stringify(response))
                      history.push('/dashboard')
                    } else {
                      setShowLoader(false)
                      setErrorMsg(
                        'Account did not exist or password is incorrect.'
                      )
                    }
                    console.log(response)
                    // dispatch(
                    //   getUserAction({
                    //     data: { email: values?.email },
                    //     onSuccess: (response) => {
                    //       console.log(response)
                    //       setShowLoader(false)
                    //       setUser(response)
                    //       localStorage.setItem(
                    //         'authUser',
                    //         JSON.stringify(response)
                    //       )
                    //       if (response?.role === 'admin') history.push('/users')
                    //       else history?.push('/dogs')
                    //     },
                    //     onFailure: (error) => {
                    //       setShowLoader(false)
                    //       setErrorMsg(error)
                    //     }
                    //   })
                    // )
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
                <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Username
                </label>
                <div style={{ marginTop: 4 }} />
                <TextField
                  errors={errors}
                  touched={touched}
                  width={320}
                  id="username"
                  name="username"
                  placeholder="Username"
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
                <Button
                  id="sign-in"
                  type="submit"
                  width={320}
                  value="Sign In"
                />
                <div className="justify-center margin-t-20">
                  <label
                    onClick={() => history.push('/forgot-password')}
                    style={{ fontSize: 15 }}
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
            <label style={{ fontSize: 15 }}>Do not have an account yet?</label>
            <label
              onClick={() => history.push('/register')}
              style={{ fontSize: 15 }}
              className="register">
              Sign Up
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

export default Login
