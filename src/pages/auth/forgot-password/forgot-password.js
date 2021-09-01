import React from 'react'
import TextField from 'components/text-fields/TextField'
import Button from 'components/buttons/Button'
import { useHistory } from 'react-router-dom'

const ForgotPassword = () => {
  const history = useHistory()

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div>
          <div className="logo">
            <img className="logo-img" src="assets/icons/dog.png" />
            Dog Saver
          </div>
          <div className="form-item" style={{ width: 200 }}>
            <label style={{ textJustify: 'inter-word', textAlign: 'justify' }}>Forgot Password? Kindly put your email or phone number for us to send you the method on resetting your password?</label>
          </div>
          <TextField
            width={320}
            placeholder="Email or Phone"
            errorLabel="Please input your email or phone!"
          />
          <Button width={320} value="Send" />
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

export default ForgotPassword
