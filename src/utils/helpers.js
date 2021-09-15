export const deconstructSagaPayload = (payload) => {
  return {
    ...payload,
    onSuccess: payload.onSuccess,
    onFailure: payload.onFailure
  }
}

export const renderAuthErrorCode = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Error: email is already in use.'
    case 'auth/invalid-email':
      return 'Error: email is invalid'
    case 'auth/operation-not-allowed':
      return 'Error: operation is not allowed'
    case 'auth/weak-password':
      return 'Error: password is too weak.'
    default:
      return ''
  }
}

export const validateEmail = (value) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (value.match(regexEmail)) {
    return true
  } else {
    return false
  }
}
