import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const AvatarSelection = ({ width, height, setImg, isClickable, src }) => {
  const [selectedImg, setSelectedImg] = useState(src)

  const onHandleImage = (event) => {
    if (event.target.files[0]) {
      setImg(event.target.files[0])
      setSelectedImg(URL.createObjectURL(event.target.files[0]))
    }
  }

  useEffect(() => {
    setSelectedImg(src)
  }, [src])

  return (
    <div
      className={`${!isClickable ? 'no-margin' : ''} profile-selection logo `}>
      <input
        id={`${isClickable ? 'file-input' : ''}`}
        style={{ display: 'none' }}
        type="file"
        accept="image/png, image/jpeg"
        onChange={onHandleImage}
      />
      <label htmlFor="file-input">
        <img
          style={{
            height,
            width,
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: '100%'
          }}
          src={selectedImg || 'assets/icons/profile.png'}
        />
      </label>
    </div>
  )
}

AvatarSelection.defaultProps = {
  setImg: () => {},
  width: 100,
  height: 100,
  isClickable: true
}

AvatarSelection.propTypes = {
  setImg: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  isClickable: PropTypes.bool,
  src: PropTypes.string
}

export default AvatarSelection
