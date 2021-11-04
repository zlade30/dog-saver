import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import moment from 'moment'

const AdoptDogModal = ({
  isOpen,
  onClose,
  values,
  onApprove,
  onReject,
  role
}) => {
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
