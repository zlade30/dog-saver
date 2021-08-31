import React from 'react'
import PasswordField from 'components/text-fields/PasswordField'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'

const Login = () => {
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
            <label className="checkbox">
              Remember Me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="forgot-password">Forgot Password?</label>
          </div>
          <Button width={320} value="Sign In" />
        </div>
        <div>
          <span>
            <label>Do not have an account yet?</label>
            <label className="register">Sign Up</label>
          </span>
        </div>
      </div>
      <div className="auth-content"></div>
    </div>
  )
}

export default Login
