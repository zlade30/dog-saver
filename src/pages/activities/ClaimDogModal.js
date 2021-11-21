/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import moment from 'moment'
import Chat1LineIcon from 'remixicon-react/Chat1LineIcon'
import PhoneLineIcon from 'remixicon-react/PhoneLineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import WomenLineIcon from 'remixicon-react/WomenLineIcon'
import MenLineIcon from 'remixicon-react/MenLineIcon'
import PaintFillIcon from 'remixicon-react/PaintFillIcon'

const ClaimDogModal = ({
  isOpen,
  onClose,
  onApprove,
  onReject,
  values,
  role,
  setShowViewDogImagesModal,
  setDogImage1,
  setDogImage2,
  setDogImage3,
  setDogImage4
}) => {
  const [selectedTab, setSelectedTab] = useState('Form')

  const renderLabel = (value) => (
    <label
      style={{
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        fontSize: 14
      }}>
      {value}
    </label>
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

  const Form = () => (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            paddingTop: role === 'admin' ? 260 : 220
          }}>
          <img src="assets/icons/damilag.png" style={{ width: 80 }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <label>Republic of the Philippines</label>
            <label>Region X</label>
            <label>Province of Bukidnon</label>
            <label>Municipality of Manolo Fortich</label>
            <label
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                fontStyle: 'italic'
              }}>
              OFFICE OF THE PUNONG BARANGAY
            </label>
            <label
              style={{ fontSize: 10, color: 'red', fontStyle: 'italic' }}>
              Barangay Hotline-0917-798-889
            </label>
          </div>
          <img src="assets/icons/sk.png" style={{ width: 100 }} />
        </div>
        <div
          style={{
            width: '95%',
            borderBottom: '4px solid brown',
            height: 10
          }}
        />
        <div
          style={{
            width: '95%',
            display: 'flex',
            marginTop: 20
          }}>
          <div
            style={{
              minWidth: 220,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              border: '3px solid black',
              padding: '10px',
              backgroundColor: '#ffffd2'
            }}>
            <label style={{ fontWeight: 'bold' }}>
              DAMILAG BARANGAY COUNCIL
            </label>
            <label style={{ fontWeight: 'bold', marginTop: 20 }}>
              ALLAN G. TORRES, JR.
            </label>
            <label style={{ marginBottom: 20 }}>Punong Barangay</label>
            <label style={{ fontWeight: 'bold' }}>ALLAN E. CAHOY</label>
            <label>Committee on Education</label>
            <label style={{ fontWeight: 'bold' }}>ANTHONY G. INIHAO</label>
            <label>Committee on Agriculture</label>
            <label style={{ fontWeight: 'bold' }}>JONATHAN S. DEMATA</label>
            <label>Committee on Appropriation</label>
            <label style={{ fontWeight: 'bold' }}>LORENZA I. MADJUS</label>
            <label>Committee on Health</label>
            <label style={{ fontWeight: 'bold' }}>ROBERTO S. MADULA</label>
            <label>Committee on Infrastructure</label>
            <label style={{ fontWeight: 'bold' }}>
              EDUARDO RALPH S. BAGAYAS
            </label>
            <label>Committee on Social Services</label>
            <label style={{ fontWeight: 'bold' }}>EDMOND LICUANAN</label>
            <label style={{ marginBottom: 20 }}>
              {'Committee on Peace & Order'}
            </label>
            <label style={{ fontWeight: 'bold' }}>ARLENE B. ARENAL</label>
            <label>Barangay Secretary</label>
            <label style={{ fontWeight: 'bold' }}>RONA R. ENSENCIO</label>
            <label style={{ marginBottom: 20 }}>Barangay Treasurer</label>
            <label style={{ fontWeight: 'bold' }}>SANGGUNIANG KABATAAN</label>
            <label style={{ marginBottom: 20 }}>
              {'Youth & Sports Development'}
            </label>
            <label style={{ fontWeight: 'bold' }}>ALEJANDRO B. ARENAL</label>
            <label>SK Chairperson</label>
            <label style={{ marginBottom: 20 }}>{'Youth & Sports'}</label>
            <label style={{ fontWeight: 'bold', marginBottom: 20 }}>
              SK KAGAWAD
            </label>
            <label style={{ fontWeight: 'bold' }}>PAUL VINCENT DEMATA</label>
            <label style={{ fontWeight: 'bold' }}>
              JHON GABRIEL D. GAMIL
            </label>
            <label style={{ fontWeight: 'bold' }}>REYMART F. ATON</label>
            <label style={{ fontWeight: 'bold', marginBottom: 20 }}>
              SHERRY FE. E. SABANPAN
            </label>
            <label style={{ fontWeight: 'bold' }}>
              CHRISTINE RHEA R. ENSENCIO
            </label>
            <label>SK Secretary</label>
            <label style={{ fontWeight: 'bold' }}>DANELLE RIA D. SIAS</label>
            <label style={{ marginBottom: 20 }}>SK Treasurer</label>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <label
              style={{ fontWeight: 'bold', fontSize: 30, color: '#e36262' }}>
              KASABUTAN
            </label>
            <div
              style={{
                width: '95%',
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
                textIndent: 50
              }}>
              <label style={{ textAlign: 'justify', lineHeight: 3 }}>
                AKO/KAMI SI {renderLabel(values?.claimForm?.name)} {` `}
                NGA LUMULUPYO SA PUROK-{renderLabel(values?.claimForm?.purok)}
                {` `}DAMILAG, MANOLO FORTICH, BUKIDNON. NGA KAMI NANAG-IYA SA
                IRO/IRING NGA (KASARIAN) {` `}
                {renderLabel(values?.claimForm?.gender)} (COLOR) {` `}
                {renderLabel(values?.claimForm?.color)} {` `}
                NGA NADAKPAN SA ATONG BARANGAY DOG IMPOUNDING PERSONNEL DIDTO
                SA {renderLabel(values?.claimForm?.address)} NIADTONG
                {` `} {renderLabel(values?.claimForm?.dateCaught)} {` `}
                KAMI NASAYOD NGA ADUNA KAMI TULUBAGON PINANSYAL NGA NAGKATIDAD
                (P10.00/DAY DOG FOOD) {` `}
                {renderLabel(values?.claimForm?.dogFoodFee)}, P100.00
                AGREEMENT FEE). {renderLabel(values?.claimForm?.agreementFee)}
                {` `}FIRST OFFENSE, P1,500 - SECOND OFFENSE AS PER MUN. ORD.
                NO. 2019-1255) {renderLabel(values?.claimForm?.offenseFee)}
                {` `} 1st/2nd OFFENSE.
              </label>
            </div>
            <div
              style={{
                width: '95%',
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
                textIndent: 50
              }}>
              <label style={{ textAlign: 'justify', lineHeight: 3 }}>
                AKO/KAMI, NASAYOD SA AMONG KALAPASAN UG NAGASAAD NGA DILI
                MAUTRO. SA PAGMATUOD, AKO/KAMI MAGAPIRMA ANING KASABUTAN
                KARONG {moment().format('MM/DD/YYYY')}
              </label>
            </div>
            <div
              style={{
                width: '95%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 40
              }}>
              {/* <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <div>__________________________</div>
                <div style={{ fontSize: 12 }}>BAHW REPRESENTATIVE</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <div>__________________________</div>
                <div style={{ fontSize: 12 }}>TAG-IYA SA IRO/IRING</div>
              </div> */}
            </div>
            <div
              style={{
                width: '95%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: 40
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }}>
                  ALLAN G. TORRES JR.
                </div>
                <div style={{ fontSize: 12 }}>PUNONG BARANGAY</div>
              </div>
            </div>
            {/* <div
              style={{
                width: '95%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: 60
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  flexDirection: 'column'
                }}>
                <label>not valid</label>
                <label>without dry seal</label>
              </div>
            </div> */}
          </div>
        </div>
        <div
          style={{
            width: '95%',
            borderBottom: '4px solid brown',
            height: 10,
            marginTop: 20
          }}
        />
        <label style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>
          1928-2020
        </label>
        <label
          style={{
            fontSize: 14,
            color: 'brown'
          }}>{`"We thrive as one."`}</label>
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
            <label className="header-modal-title">Claim</label>
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

ClaimDogModal.defaultProps = {
  isOpen: false,
  role: 'admin'
}

ClaimDogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  role: PropTypes.string
}

export default ClaimDogModal
