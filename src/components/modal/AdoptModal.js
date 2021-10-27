import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import moment from 'moment'

const AdoptModal = ({ isOpen, onClose }) => {
  const [prevPets, setPrevPets] = useState(['1'])

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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Companion for you/Spouse</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Companion for children</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Companion for pet</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Gift for ...</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>
              Other reasons (Pls specify)
            </label>
            <input
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>House</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Apartment</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Condo</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Others</label>
            <input
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Rented</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <label
              style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>
              Please list pets you previously own:
            </label>
            <AddLineIcon
              style={{
                marginTop: 10,
                marginLeft: 10,
                cursor: 'pointer',
                color: '#42C2D3'
              }}
              onClick={() => setPrevPets((prev) => [...prev, 'asdasd'])}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '95%',
              marginBottom: 10
            }}>
            {prevPets?.map((item) => (
              <input
                key={item}
                style={{
                  marginLeft: 8,
                  border: 'none',
                  borderBottom: '1px solid black',
                  outline: 'none',
                  fontFamily: 'Montserrat',
                  width: 200,
                  marginBottom: 10
                }}
              />
            ))}
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Yes</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Pregnancy / Baby</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Dog bites people</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Behavioral problems</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Conflicts with other pets</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Dog is untrainable</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Dog becomes disabled</label>
          </div>
          <div
            style={{
              paddingLeft: 14,
              width: '95%',
              display: 'flex',
              alignItems: 'center'
            }}>
            <input type="checkbox" />
            <label style={{ marginLeft: 14 }}>Other reasons</label>
            <input
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
            <input type="checkbox" />
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
          <Button value="Send Form" width={60} />
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
