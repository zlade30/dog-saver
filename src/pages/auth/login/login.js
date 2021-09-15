import React from 'react'
import PasswordField from 'components/text-fields/PasswordField'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import Checkbox from 'components/checkboxes/Checkbox'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

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
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            Dog Saver
          </div>
          <TextField
            width={320}
            placeholder="Email or Phone"
            errorLabel="Please input your email or phone!"
          />
          <PasswordField
            width={320}
            placeholder="Password"
            errorLabel="Please input your password!"
          />
          <div className="checkbox-container form-item justify-between">
            <Checkbox value="Remember Me" />
            <label
              onClick={() => history.push('/forgot-password')}
              className="forgot-password">
              Forgot Password?
            </label>
          </div>
          <Button width={320} value="Sign In" />
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
