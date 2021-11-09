import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import DogProfile from 'components/avatar/DogProfile'

const DogImagesModal = ({
  isOpen,
  onClose,
  onSave,
  dogImage1,
  dogImage2,
  dogImage3,
  dogImage4,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4
}) => {
  const [showError, setShowError] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setShowError(false)
    }
  }, [isOpen])

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      className="claim-modal"
      overlayClassName="overlay">
      <div>
        <div className="header-modal">
          <div className="flex items-center">
            <ErrorWarningLineIcon
              className="margin-l-10 margin-r-10"
              size={25}
              color="white"
            />
            <label className="header-modal-title">Dog Images</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="modal-body">
          <label>{`Please select 4 images for your dog's profile`}</label>
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 14 }}>
            <DogProfile
              setImg={setDogImage1}
              src={dogImage1}
              name="key1"
              width={500}
              height={300}
            />
            <DogProfile
              setImg={setDogImage2}
              src={dogImage2}
              name="key2"
              width={500}
              height={300}
            />
          </div>
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 14 }}>
            <DogProfile
              setImg={setDogImage3}
              src={dogImage3}
              name="key3"
              width={500}
              height={300}
            />
            <DogProfile
              setImg={setDogImage4}
              src={dogImage4}
              name="key4"
              width={500}
              height={300}
            />
          </div>
        </div>
        <div className="modal-footer">
          {showError && (
            <label style={{ color: 'red', marginRight: 20 }}>
              Images selected should be 4
            </label>
          )}
          <Button
            onClick={() => {
              console.log(dogImage1)
              if (dogImage1 && dogImage2 && dogImage3 && dogImage4) {
                onSave()
              } else {
                setShowError(true)
              }
            }}
            value="Save"
            width={60}
          />
        </div>
      </div>
    </ReactModal>
  )
}

DogImagesModal.defaultProps = {
  isOpen: false,
  setDogImage1: () => {},
  setDogImage2: () => {},
  setDogImage3: () => {},
  setDogImage4: () => {},
  onSave: () => {},
  dogImage1: null,
  dogImage2: null,
  dogImage3: null,
  dogImage4: null
}

DogImagesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  dogImage1: PropTypes.any.isRequired,
  dogImage2: PropTypes.any.isRequired,
  dogImage3: PropTypes.any.isRequired,
  dogImage4: PropTypes.any.isRequired,
  setDogImage1: PropTypes.func,
  setDogImage2: PropTypes.func,
  setDogImage3: PropTypes.func,
  setDogImage4: PropTypes.func,
  onSave: PropTypes.func
}

export default DogImagesModal
