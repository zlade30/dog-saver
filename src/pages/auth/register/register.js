import React from 'react'
import PasswordField from 'components/text-fields/PasswordField'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import AvatarSelection from 'components/avatar/AvatarSelection'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            Dog Saver
          </div>
          <AvatarSelection />
          <TextField
            width={320}
            placeholder="Email or Phone"
            errorLabel="Please input your email or phone!"
          />
          <TextField
            width={320}
            placeholder="Last Name"
            errorLabel="Please input your last name!"
          />
          <TextField
            width={320}
            placeholder="First Name"
            errorLabel="Please input your first name!"
          />
          <TextField
            width={320}
            placeholder="Middle Name"
            errorLabel="Please input your middle name!"
          />
          <TextField
            width={320}
            placeholder="Address"
            errorLabel="Please input your address!"
          />
          <PasswordField
            width={320}
            placeholder="Password"
            errorLabel="Please input your password!"
          />
          <Button width={320} value="Sign Up" />
        </div>
        <div>
          <span>
            <label>Already have an account?</label>
            <label onClick={() => history.push('/login')} className="register">Sign In</label>
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
