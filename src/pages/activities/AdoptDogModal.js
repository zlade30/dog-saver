/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import moment from 'moment'
import PaintFillIcon from 'remixicon-react/PaintFillIcon'
import MenLineIcon from 'remixicon-react/MenLineIcon'
import WomenLineIcon from 'remixicon-react/WomenLineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import PhoneLineIcon from 'remixicon-react/PhoneLineIcon'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'

const AdoptDogModal = ({
  isOpen,
  onClose,
  values,
  onApprove,
  onReject,
  role,
  setShowViewDogImagesModal,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4
}) => {
  const [selectedTab, setSelectedTab] = useState('Form')

  const Form = () => (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: role === 'admin' ? 690 : 740
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
            name="name"
            value={values?.adoptionForm?.name}
            disabled
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
            value={values?.adoptionForm?.occupation}
            disabled
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
            value={values?.adoptionForm?.address}
            disabled
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
            value={values?.adoptionForm?.mobileNumber}
            disabled
            type="number"
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
            value={values?.adoptionForm?.email}
            disabled
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
            value={values?.adoptionForm?.spouse}
            disabled
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
            value={values?.adoptionForm?.children}
            disabled
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
            value={values?.adoptionForm?.household}
            disabled
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
            value={values?.adoptionForm?.responsible}
            disabled
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
            value={values?.adoptionForm?.allergies}
            disabled
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
            value={values?.adoptionForm?.ill}
            disabled
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
            checked={values?.adoptionForm?.adoptADog?.spouse}
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
            checked={values?.adoptionForm?.adoptADog?.children}
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
            checked={values?.adoptionForm?.adoptADog?.pet}
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
            checked={values?.adoptionForm?.adoptADog?.deceased}
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
            checked={values?.adoptionForm?.adoptADog?.gift}
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
            checked={values?.adoptionForm?.adoptADog?.others?.isChecked}
            type="checkbox"
          />
          <label style={{ marginLeft: 14 }}>
            Other reasons (Pls specify)
          </label>
          <input
            name="adoptOthers"
            value={values?.adoptionForm?.adoptADog?.others?.value}
            disabled
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
            checked={values?.adoptionForm?.isYourHome?.house}
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
            checked={values?.adoptionForm?.isYourHome?.apartment}
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
            checked={values?.adoptionForm?.isYourHome?.condo}
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
            checked={values?.adoptionForm?.isYourHome?.others?.isChecked}
            type="checkbox"
          />
          <label style={{ marginLeft: 14 }}>Others</label>
          <input
            value={values?.adoptionForm?.isYourHome?.others?.value}
            disabled
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
            checked={values?.adoptionForm?.doYouRent?.rented}
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
            checked={values?.adoptionForm?.doYouRent?.owned}
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
            checked={values?.adoptionForm?.doYouFence?.yes}
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
            checked={values?.adoptionForm?.doYouFence?.no}
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
            value={values?.adoptionForm?.dogSleep}
            disabled
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
            value={values?.adoptionForm?.leftAlone}
            disabled
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
            value={values?.adoptionForm?.dogExcercised}
            disabled
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
            value={values?.adoptionForm?.firstPet}
            disabled
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
            value={values?.adoptionForm?.howManyDogs}
            disabled
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
            value={values?.adoptionForm?.howManyCats}
            disabled
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
            value={values?.adoptionForm?.listPets}
            disabled
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
            value={values?.adoptionForm?.whatHappened}
            disabled
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
            checked={values?.adoptionForm?.doYouVet?.yes}
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
            checked={values?.adoptionForm?.doYouVet?.no}
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
            checked={values?.adoptionForm?.neutered?.yes}
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
            checked={values?.adoptionForm?.neutered?.no}
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
            checked={values?.adoptionForm?.vaccination?.yes}
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
            checked={values?.adoptionForm?.vaccination?.no}
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
            checked={values?.adoptionForm?.vetExpenses?.yes}
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
            checked={values?.adoptionForm?.vetExpenses?.no}
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
          <input checked={values?.adoptionForm?.ifYes?.yes} type="checkbox" />
          <label style={{ marginLeft: 14 }}>Yes</label>
        </div>
        <div
          style={{
            paddingLeft: 14,
            width: '95%',
            display: 'flex',
            alignItems: 'center'
          }}>
          <input checked={values?.adoptionForm?.ifYes?.no} type="checkbox" />
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
            value={values?.adoptionForm?.traits}
            disabled
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
            value={values?.adoptionForm?.unnacceptable}
            disabled
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
            value={values?.adoptionForm?.behaviors}
            disabled
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
            checked={values?.adoptionForm?.circumstances?.pregnancy}
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
            checked={values?.adoptionForm?.circumstances?.dogBites}
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
            checked={values?.adoptionForm?.circumstances?.dogDestroys}
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
            checked={values?.adoptionForm?.circumstances?.behavioral}
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
            checked={values?.adoptionForm?.circumstances?.conflict}
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
            checked={values?.adoptionForm?.circumstances?.untrainable}
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
            checked={values?.adoptionForm?.circumstances?.dogDisabled}
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
            checked={values?.adoptionForm?.circumstances?.others?.isChecked}
            type="checkbox"
          />
          <label style={{ marginLeft: 14 }}>Other reasons</label>
          <input
            name="otherReasons"
            value={values?.adoptionForm?.circumstances?.others?.value}
            disabled
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
            value={values?.adoptionForm?.giveUp}
            disabled
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
          <input checked={values?.adoptionForm?.iCertify} type="checkbox" />
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
      {role === 'admin' && values?.status === 'pending' ? (
        <div className="modal-footer" style={{ marginRight: 20 }}>
          <div
            className="flex items-center"
            style={{ justifyContent: 'space-between' }}>
            <Button
              value="Approve"
              onClick={onApprove}
              style={{
                backgroundColor: '#42C2D3',
                width: 150,
                marginRight: 5
              }}
            />
            <Button
              value="Reject"
              onClick={onReject}
              style={{
                backgroundColor: '#ff4d4f',
                width: 150,
                marginLeft: 5
              }}
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )

  const DogIcon = ({ color = '#334D67' }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 35 28"
      fill="none"
      style={{ width: 35, height: 45, marginRight: 0, marginLeft: 15 }}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 7.25C21 6.5625 20.4375 6 19.75 6H18.1875V5.96875C17.9062 5.40625 17.3125 5 16.625 5H14.25C14.2188 5 14.2188 5.03125 14.1875 5.03125V5L13.3438 4.15625C13.0312 3.84375 12.5 4.0625 12.5 4.5V10H8.75C7.75 10 6.875 10.4062 6.21875 11H5.75C5.03125 11 4.5 10.4688 4.5 9.75C4.5 9.34375 4.15625 9 3.75 9C3.3125 9 3 9.34375 3 9.75C3 11.0938 3.96875 12.2188 5.21875 12.4688C5.0625 12.875 5 13.3125 5 13.75V19C5 19.5625 5.4375 20 6 20H8.5C9.03125 20 9.5 19.5625 9.5 19V16H13.5V19C13.5 19.5625 13.9375 20 14.5 20H17C17.5312 20 18 19.5625 18 19V11.5H18.25C19.75 11.5 20.9688 10.2812 21 8.75V7.25ZM16.5 12.4062V18.5H15V14.5H8V18.5H6.5V13.75C6.5 12.5312 7.5 11.5312 8.75 11.5H12.9062L16.5 12.4062ZM19.5 7.5V8.75C19.5 9.46875 18.9375 10 18.25 10H16.5V10.875L14 10.25V6.75C14 6.625 14.0938 6.5 14.25 6.5H16.625C16.7188 6.5 16.8125 6.5625 16.8438 6.65625L17.2812 7.5H19.5ZM16.5 7.5C16.5 7.25 16.25 7 16 7C15.7188 7 15.5 7.25 15.5 7.5C15.5 7.78125 15.7188 8 16 8C16.25 8 16.5 7.78125 16.5 7.5Z"
        fill={color}
      />
    </svg>
  )

  const DogInfo = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 740
      }}>
      <div
        style={{
          width: '40%',
          cursor: 'pointer',
          height: 200,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: 40,
          marginBottom: 40
        }}
        onClick={() => {
          console.log(values)
          setDogImage1(values?.dog?.profile[0])
          setDogImage2(values?.dog?.profile[1])
          setDogImage3(values?.dog?.profile[2])
          setDogImage4(values?.dog?.profile[3])
          setShowViewDogImagesModal(true)
        }}>
        <img
          style={{
            width: '100%',
            height: 200,
            borderRadius: 12,
            objectFit: 'contain',
            cursor: 'pointer'
          }}
          src={values?.dog?.profile[0]}
        />
        <div
          style={{
            width: '100%',
            height: 200,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
            position: 'absolute'
          }}
        />
        <label
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            position: 'absolute',
            zIndex: 2
          }}>{`+3`}</label>
      </div>
      <div className="flex items-center w-full">
        <PaintFillIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Color:
        </label>
        <label style={{ fontSize: 14 }}>{values?.dog?.color || ''}</label>
      </div>
      <div className="flex items-center w-full">
        <DogIcon />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Breed:
        </label>
        <label style={{ fontSize: 14 }}>{values?.dog?.breed || ''}</label>
      </div>
      <div className="flex items-center w-full">
        {values?.dog?.gender?.label === 'Male' ? (
          <MenLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        ) : (
          <WomenLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        )}
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Gender:
        </label>
        <label style={{ fontSize: 14 }}>
          {values?.dog?.gender?.label || ''}
        </label>
      </div>
      <div className="flex items-center w-full">
        <UserLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Owner Name:
        </label>
        <label style={{ fontSize: 14 }}>
          {`${values?.user?.firstName} ${values?.user?.lastName}` || ''}
        </label>
      </div>
      <div className="flex items-center w-full">
        <PhoneLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Owner Contact:
        </label>
        <label style={{ fontSize: 14 }}>{values?.user?.phone || ''}</label>
      </div>
      <div className="flex items-center w-full">
        <CalendarLineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Birthday:
        </label>
        <label style={{ fontSize: 14 }}>
          {values?.dog?.birthday
            ? moment(values?.dog?.birthday?.toDate()).format('ll')
            : ''}
        </label>
      </div>
      {/* <div className="flex items-center w-full">
        <Chat1LineIcon style={{ margin: 10, marginLeft: 20 }} size={20} />
        <label style={{ fontWeight: 'bold', fontSize: 14, marginRight: 20 }}>
          Owner Reason:
        </label>
        <label style={{ fontSize: 14 }}>{values?.reason || ''}</label>
      </div> */}
      {/* {values?.status === 'pending' && role === 'admin' ? (
        <div
          className="flex items-center"
          style={{ justifyContent: 'space-between', marginTop: 20 }}>
          <Button
            value="Approve"
            onClick={onApprove}
            style={{
              backgroundColor: '#42C2D3',
              width: 150,
              marginRight: 5
            }}
          />
          <Button
            value="Reject"
            onClick={onReject}
            style={{
              backgroundColor: '#ff4d4f',
              width: 150,
              marginLeft: 5
            }}
          />
        </div>
      ) : (
        <div />
      )} */}
      {role === 'admin' && values?.status === 'pending' ? (
        <div className="modal-footer" style={{ marginRight: 20 }}>
          <div
            className="flex items-center"
            style={{ justifyContent: 'space-between' }}>
            <Button
              value="Approve"
              onClick={onApprove}
              style={{
                backgroundColor: '#42C2D3',
                width: 150,
                marginRight: 5
              }}
            />
            <Button
              value="Reject"
              onClick={onReject}
              style={{
                backgroundColor: '#ff4d4f',
                width: 150,
                marginLeft: 5
              }}
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )

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
            width: '100%',
            height: 40,
            borderBottom: '1px solid black',
            display: 'flex'
          }}>
          <div
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid black',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTab('Form')}>
            <label
              onClick={() => setSelectedTab('Form')}
              style={{
                fontWeight: 'bold',
                cursor: 'pointer',
                color: selectedTab === 'Form' ? '#42C2D3' : ''
              }}>
              Form
            </label>
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTab('Dog Information')}>
            <label
              onClick={() => setSelectedTab('Dog Information')}
              style={{
                fontWeight: 'bold',
                cursor: 'pointer',
                color: selectedTab === 'Dog Information' ? '#42C2D3' : ''
              }}>
              Dog Information
            </label>
          </div>
        </div>
        {selectedTab === 'Form' ? <Form /> : <DogInfo />}
      </div>
    </ReactModal>
  )
}

AdoptDogModal.defaultProps = {
  isOpen: false
}

AdoptDogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  role: PropTypes.string
}

export default AdoptDogModal
