import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import moment from 'moment'

const AdoptModal = ({ isOpen, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    occupation: '',
    adoptADog: {
      spouse: false,
      children: false,
      pet: false,
      deceased: false,
      gift: false,
      others: { isChecked: false, value: '' }
    },
    isYourHome: {
      house: false,
      apartment: false,
      condo: false,
      others: { isChecked: false, value: '' }
    },
    doYouRent: {
      rented: false,
      owned: false
    },
    doYouFence: {
      yes: false,
      no: false
    },
    doYouVet: {
      yes: false,
      no: false
    },
    neutered: {
      yes: false,
      no: false
    },
    vaccination: {
      yes: false,
      no: false
    },
    vetExpenses: {
      yes: false,
      no: false
    },
    ifYes: {
      yes: false,
      no: false
    },
    circumstances: {
      pregnancy: false,
      dogBites: false,
      dogDestroys: false,
      behavioral: false,
      conflict: false,
      untrainable: false,
      dogDisabled: false,
      others: { isChecked: false, value: '' }
    },
    iCertify: false
  })

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
            <label className="header-modal-title">Adoption</label>
          </div>
          <CloseLineIcon
            onClick={onClose}
            className="margin-r-10 cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 740
          }}>
          <div
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 50,
              paddingRight: 50,
              paddingTop: 10
            }}>
            <img src="assets/icons/damilag.png" style={{ width: 80 }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <label style={{ fontSize: 14, color: '#437ba3' }}>
                Republic of the Philippines
              </label>
              <label style={{ fontSize: 14, color: '#437ba3' }}>
                Province of Bukidnon
              </label>
              <label
                style={{ fontWeight: 'bold', color: '#437ba3', fontSize: 14 }}>
                Municipality of Manolo Fortich
              </label>
              <label
                style={{ fontWeight: 'bold', fontSize: 14, color: '#437ba3' }}>
                Barangay Damilag
              </label>
            </div>
            <img src="assets/icons/sk.png" style={{ width: 100 }} />
          </div>
          <div
            style={{
              width: '95%',
              borderBottom: '1px solid #437ba3',
              height: 10
            }}
          />
          <label
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: '#437ba3',
              marginTop: 8
            }}>
            damilagbc@gmail.com Globe/TM 09177988897 Smart/Sun 09338248944
          </label>
          <label
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              marginTop: 20,
              marginBottom: 20
            }}>
            DOG ADOPTION QUESTIONNAIRE
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>1.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>Name:</label>
            <input
              name="occupation"
              value={formValues?.name}
              onChange={(evt) =>
                setFormValues({ ...formValues, name: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>2.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Occupation:
            </label>
            <input
              name="occupation"
              value={formValues?.occupation}
              onChange={(evt) =>
                setFormValues({ ...formValues, occupation: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>3.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Address:
            </label>
            <input
              name="address"
              value={formValues?.address}
              onChange={(evt) =>
                setFormValues({ ...formValues, address: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>4.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Mobile Number:
            </label>
            <input
              name="mobileNumber"
              value={formValues?.mobileNumber}
              type="number"
              onChange={(evt) =>
                setFormValues({ ...formValues, mobileNumber: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>5.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Email Address:
            </label>
            <input
              name="email"
              value={formValues?.email}
              onChange={(evt) =>
                setFormValues({ ...formValues, email: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>6.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Name of Spouse / Significant Other:
            </label>
            <input
              name="spouse"
              value={formValues?.spouse}
              onChange={(evt) =>
                setFormValues({ ...formValues, spouse: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>7.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Name of children and their ages:
            </label>
            <input
              name="children"
              value={formValues?.children}
              onChange={(evt) =>
                setFormValues({ ...formValues, children: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>8.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              List of any additional people in the household:
            </label>
            <input
              name="household"
              value={formValues?.household}
              onChange={(evt) =>
                setFormValues({ ...formValues, household: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>9.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Who will be responsible in feeding and taking care of the dog:
            </label>
            <input
              name="responsible"
              value={formValues?.responsible}
              onChange={(evt) =>
                setFormValues({ ...formValues, responsible: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>10.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Has anyone in your family / household experienced allergies or
              asthma?
            </label>
            <input
              name="allergies"
              value={formValues?.allergies}
              onChange={(evt) =>
                setFormValues({ ...formValues, allergies: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>11.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Who will provide your pet in the event that you become ill or
              unable to care for him or her?
            </label>
            <input
              name="ill"
              value={formValues?.ill}
              onChange={(evt) =>
                setFormValues({ ...formValues, ill: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ fontWeight: 'bold' }}>12.</label>
            <label style={{ marginLeft: 14, fontWeight: 'bold' }}>
              Why would you want to adopt a dog?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.spouse}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    spouse: !formValues?.adoptADog?.spouse
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Companion for you/Spouse</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.children}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    children: !formValues?.adoptADog?.children
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Companion for children</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.pet}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    pet: !formValues?.adoptADog?.pet
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Companion for pet</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.deceased}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    deceased: !formValues?.adoptADog?.deceased
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>
              Replacement of a deceased dog
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.gift}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    gift: !formValues?.adoptADog?.gift
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Gift for ...</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.adoptADog?.others?.isChecked}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    others: {
                      isChecked: !formValues?.adoptADog?.others?.isChecked,
                      value: ''
                    }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>
              Other reasons (Pls specify)
            </label>
            <input
              name="adoptOthers"
              value={formValues?.adoptADog?.others?.value}
              disabled={!formValues?.adoptADog?.others?.isChecked}
              onChange={(evt) => {
                setFormValues({
                  ...formValues,
                  adoptADog: {
                    ...formValues?.adoptADog,
                    others: {
                      ...formValues?.adoptADog?.others,
                      value: evt.target.value
                    }
                  }
                })
              }}
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Is your home a (n):
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.isYourHome?.house}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  isYourHome: {
                    house: true,
                    apartment: false,
                    condo: false,
                    others: { isChecked: false, value: '' }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>House</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.isYourHome?.apartment}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  isYourHome: {
                    house: false,
                    apartment: true,
                    condo: false,
                    others: { isChecked: false, value: '' }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Apartment</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.isYourHome?.condo}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  isYourHome: {
                    house: false,
                    apartment: false,
                    condo: true,
                    others: { isChecked: false, value: '' }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Condo</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.isYourHome?.others?.isChecked}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  isYourHome: {
                    house: false,
                    apartment: false,
                    condo: false,
                    others: {
                      isChecked: true,
                      value: ''
                    }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Others</label>
            <input
              value={formValues?.isYourHome?.others?.value}
              disabled={!formValues?.isYourHome?.others?.isChecked}
              onChange={(evt) => {
                setFormValues({
                  ...formValues,
                  isYourHome: {
                    ...formValues?.isYourHome,
                    others: {
                      isChecked: formValues?.isYourHome?.others,
                      value: evt.target.value
                    }
                  }
                })
              }}
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Do you rent? Or own your own home?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouRent?.rented}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouRent: {
                    rented: true,
                    owned: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Rented</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouRent?.owned}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouRent: {
                    rented: false,
                    owned: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Owned</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Do you have a fence?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouFence?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouFence: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouFence?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouFence: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              Where will your dogs sleep at night?
            </label>
            <input
              name="dogSleep"
              value={formValues?.dogSleep}
              onChange={(evt) =>
                setFormValues({ ...formValues, dogSleep: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              How many hours a day will your dog be left alone?
            </label>
            <input
              name="leftAlone"
              value={formValues?.leftAlone}
              onChange={(evt) =>
                setFormValues({ ...formValues, leftAlone: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              How often will your dog be exercised?
            </label>
            <input
              name="dogExcercised"
              value={formValues?.dogExcercised}
              onChange={(evt) =>
                setFormValues({
                  ...formValues,
                  dogExcercised: evt.target.value
                })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              Will this dog be your first pet?
            </label>
            <input
              name="firstPet"
              value={formValues?.firstPet}
              onChange={(evt) =>
                setFormValues({ ...formValues, firstPet: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              How many pets do you have?
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <input
              name="firstPet"
              value={formValues?.howManyDogs}
              onChange={(evt) =>
                setFormValues({ ...formValues, howManyDogs: evt.target.value })
              }
              type="number"
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 40
              }}
            />
            <label style={{ marginLeft: 10, marginTop: 10 }}>Dogs</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <input
              name="firstPet"
              value={formValues?.howManyCats}
              onChange={(evt) =>
                setFormValues({ ...formValues, howManyCats: evt.target.value })
              }
              type="number"
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 40
              }}
            />
            <label style={{ marginLeft: 10, marginTop: 10 }}>Cats</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Please list pets you previously own:
            </label>
            <input
              name="listPets"
              value={formValues?.listPets}
              onChange={(evt) =>
                setFormValues({ ...formValues, listPets: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              What happened to the pets/dogs you previously own? If deceased
              what was the cause of death?
            </label>
            <input
              name="whatHappened"
              value={formValues?.whatHappened}
              onChange={(evt) =>
                setFormValues({ ...formValues, whatHappened: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 300
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Do you have a veterinarian?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouVet?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouVet: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.doYouVet?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  doYouVet: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              If you currently have dogs and cats are they spayed/neutered?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.neutered?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  neutered: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.neutered?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  neutered: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Are their vaccination current?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.vaccination?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  vaccination: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.vaccination?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  vaccination: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Are you prepared to cover any vet expenses that you may incur
              throughout your dogs life?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.vetExpenses?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  vetExpenses: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.vetExpenses?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  vetExpenses: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginTop: 10,
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              If Yes is there a limit?
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.ifYes?.yes}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  ifYes: {
                    yes: true,
                    no: false
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              checked={formValues?.ifYes?.no}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  ifYes: {
                    yes: false,
                    no: true
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>No</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              What are the traits you are looking for in a dog?
            </label>
            <input
              name="traits"
              value={formValues?.traits}
              onChange={(evt) =>
                setFormValues({ ...formValues, traits: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              Are there any behaviors unnacceptable to you? What are these?
            </label>
            <input
              name="unnacceptable"
              value={formValues?.unnacceptable}
              onChange={(evt) =>
                setFormValues({
                  ...formValues,
                  unnacceptable: evt.target.value
                })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              What will you do if the dog will display these behaviors?
            </label>
            <input
              name="behaviors"
              value={formValues?.behaviors}
              onChange={(evt) =>
                setFormValues({ ...formValues, behaviors: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              Under what circumstance would you not be able to keep this dog?
              Please check all that might apply:
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.pregnancy}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    pregnancy: !formValues?.circumstances?.pregnancy
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Pregnancy / Baby</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.dogBites}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    dogBites: !formValues?.circumstances?.dogBites
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Dog bites people</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.dogDestroys}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    dogDestroys: !formValues?.circumstances?.dogDestroys
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>
              Dog destroys household items
            </label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.behavioral}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    behavioral: !formValues?.circumstances?.behavioral
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Behavioral problems</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.conflict}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    conflict: !formValues?.circumstances?.conflict
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Conflicts with other pets</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.untrainable}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    untrainable: !formValues?.circumstances?.untrainable
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Dog is untrainable</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.dogDisabled}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    dogDisabled: !formValues?.circumstances?.dogDisabled
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Dog becomes disabled</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input
              defaultChecked={formValues?.circumstances?.others?.isChecked}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    others: {
                      isChecked: !formValues?.circumstances?.others?.isChecked,
                      value: ''
                    }
                  }
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 14 }}>Other reasons</label>
            <input
              name="otherReasons"
              value={formValues?.circumstances?.others?.value}
              disabled={!formValues?.circumstances?.others?.isChecked}
              onChange={(evt) => {
                setFormValues({
                  ...formValues,
                  circumstances: {
                    ...formValues?.circumstances,
                    others: {
                      ...formValues?.circumstances?.others,
                      value: evt.target.value
                    }
                  }
                })
              }}
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '95%',
              marginBottom: 10
            }}>
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              If you have to give up the dog for any of the following reasons:
              What will you do with the dog?
            </label>
            <input
              name="giveUp"
              value={formValues?.giveUp}
              onChange={(evt) =>
                setFormValues({ ...formValues, giveUp: evt.target.value })
              }
              style={{
                marginLeft: 8,
                border: 'none',
                borderBottom: '1px solid black',
                outline: 'none',
                fontFamily: 'Montserrat',
                width: 400
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              width: '95%',
              marginTop: 40
            }}>
            <input
              checked={formValues?.iCertify}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  iCertify: !formValues?.iCertify
                })
              }}
              type="checkbox"
            />
            <label style={{ marginLeft: 10, fontWeight: 'bold' }}>
              I certify that all of the above information is true and correct. I
              understand, that if I adopt a dog Pet from the Barangay Damilag
              Dog Impounding, this application will become a part of the
              adoption record. I also understand that completion of this
              questionnaire does not guarantee an adoption of a dog. I also
              understand that upon adoption, I will have to do my best to care
              for the animal and if found otherwise, I could be fined and
              penalized under RA 8485.
            </label>
          </div>
          <div
            style={{
              marginTop: 60,
              width: '95%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <div>
              <label style={{ fontWeight: 'bold' }}>Signed:</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <div style={{ marginTop: 20 }}>
                  __________________________________
                </div>
                <label style={{ fontWeight: 'bold' }}>Name & Signature</label>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <label style={{ marginBottom: -10 }}>
                  {moment().format('L')}
                </label>
                <div>__________________________________</div>
                <label style={{ fontWeight: 'bold' }}>Date Signed</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{ marginRight: 20 }}>
          <Button onClick={() => console.log(formValues)} value="Send Form" width={100} />
        </div>
      </div>
    </ReactModal>
  )
}

AdoptModal.defaultProps = {
  isOpen: false
}

AdoptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AdoptModal
