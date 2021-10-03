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
      return 'Error: email is invalid.'
    case 'auth/operation-not-allowed':
      return 'Error: operation is not allowed.'
    case 'auth/weak-password':
      return 'Error: password is too weak.'
    case 'auth/wrong-password':
      return 'Error: password is incorrect.'
    case 'auth/user-disabled':
      return 'Error: user is disabled.'
    case 'auth/user-not-found':
      return 'Error: user is not found.'
    default:
      return JSON.stringify(error)
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

export const userFilterOptions = [
  { label: 'Active Users', value: 'activeUsers' },
  { label: 'Archived Users', value: 'archivedUsers' }
]

export const userSortOptions = [
  { label: 'Date Added', value: 'dateAdded' },
  { label: 'Name', value: 'name' }
]

export const orderOptions = [
  { label: 'Desc', value: 'desc' },
  { label: 'Asc', value: 'asc' }
]

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    if (file) {
      reader.readAsDataURL(file)
    }
  })
}

export const selectStyles = {
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  control: (provided) => ({
    ...provided,
    borderRadius: '12px',
    borderColor: '#42C2D3',
    borderStyle: 'solid',
    fontFamily: 'Montserrat, sans-serif',
    outline: 'none',
    borderWidth: '1px',
    fontSize: 13,
    marginTop: 10,
    paddingLeft: 4
  }),
  indicatorSeparator: (_) => ({
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#42C2D3',
    padding: '0.375rem',
    transition: 'transform .25s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#4c8fca' : null,
      ':hover': {
        backgroundColor: '#2A70AD',
        color: '#ffffff'
      },
      cursor: 'pointer',
      fontSize: '0.75rem',
      minHeight: '33px',
      height: '33px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }
}
