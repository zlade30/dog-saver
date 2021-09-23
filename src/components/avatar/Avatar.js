import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ width, height, src }) => {
  return (
    <div className={`no-margin profile-selection logo`}>
      <img
        style={{
          height,
          width,
          objectFit: 'cover',
          cursor: 'pointer',
          borderRadius: '50%',
          marginBottom: 12
        }}
        src={src || 'assets/icons/profile.png'}
      />
    </div>
  )
}

Avatar.defaultProps = {
  width: 100,
  height: 100
}

Avatar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string
}

export default Avatar
