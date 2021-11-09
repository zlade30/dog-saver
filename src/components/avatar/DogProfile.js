import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ImageAddLineIcon from 'remixicon-react/ImageAddLineIcon'

const DogProfile = ({ name, width, setImg, height, src }) => {
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
    <div>
      <input
        id={name}
        style={{ display: 'none' }}
        type="file"
        accept="image/png, image/jpeg"
        onChange={onHandleImage}
      />
      <label htmlFor={name}>
        {!selectedImg ? (
          <div
            style={{
              width,
              height,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
            <ImageAddLineIcon className="cursor-pointer" size={100} />
          </div>
        ) : (
          <img
            style={{
              width,
              height,
              borderRadius: 12,
              objectFit: 'contain',
              cursor: 'pointer'
            }}
            src={
              typeof selectedImg !== 'string'
                ? URL.createObjectURL(selectedImg)
                : selectedImg
            }
          />
        )}
      </label>
    </div>
  )
}

DogProfile.defaultProps = {
  width: '100%',
  height: 200,
  src: null,
  setImg: () => {}
}

DogProfile.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.any,
  name: PropTypes.string.isRequired,
  setImg: PropTypes.func
}

export default DogProfile
