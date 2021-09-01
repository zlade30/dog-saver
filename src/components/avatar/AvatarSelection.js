import React, { useState } from 'react'

const AvatarSelection = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const onHandleImage = (event) => {
    console.log(URL.createObjectURL(event.target.files[0]))
    if(event.target.files[0]) {
      setSelectedImg(URL.createObjectURL(event.target.files[0]))
      // setFormValue({
      //   ...formValue,
      //   image: URL.createObjectURL(event.target.files[0])
      // })
    }
  }

  return (
    <div className="profile-selection logo">
      <input id="file-input" style={{ display: 'none' }} type="file" accept="image/png, image/jpeg" onChange={onHandleImage}/>
      <label htmlFor="file-input">
        <img style={{ height: 100, width: 100, objectFit: 'cover', cursor: 'pointer', borderRadius: '100%' }} src={selectedImg || "assets/icons/profile.png"} />
      </label>
    </div>
  )
}

AvatarSelection.defaultProps = {}

AvatarSelection.propTypes = {}

export default AvatarSelection