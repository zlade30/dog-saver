/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'
import Button from 'components/buttons/Button'
import moment from 'moment'

const ClaimModal = ({ isOpen, onClose, onSendForm }) => {
  const nameRef = useRef()
  const purokRef = useRef()
  const genderRef = useRef()
  const colorRef = useRef()
  const addressRef = useRef()
  const dateCaughtRef = useRef()
  const dogFoodFeeRef = useRef()
  const agreementFeeRef = useRef()
  const offenseFeeRef = useRef()

  const RenderField = React.forwardRef(({ key, value, onChange, placeholder, isNum }, ref) => (
    <input
      key={key}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      type={`${isNum ? 'number' : 'text'}`}
      style={{ fontWeight: 'normal', fontFamily: 'Montserrat' }}
    />
  ))

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
              paddingTop: 400
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
                  AKO/KAMI SI {<RenderField placeholder="Name" key="name" ref={nameRef} />} NGA
                  LUMULUPYO SA PUROK-
                  {<RenderField key="purok" placeholder="Purok" ref={purokRef} />} DAMILAG, MANOLO
                  FORTICH, BUKIDNON. NGA KAMI NANAG-IYA SA IRO/IRING NGA
                  (KASARIAN) {<RenderField key="gender" placeholder="Gender" ref={genderRef} />}
                  (COLOR) {<RenderField key="color" placeholder="Color" ref={colorRef} />} NGA
                  NADAKPAN SA ATONG BARANGAY DOG IMPOUNDING PERSONNEL DIDTO SA{' '}
                  {<RenderField key="address" placeholder="Address" ref={addressRef} />} NIADTONG
                  {<RenderField key="dateCaught" placeholder="Date caught" ref={dateCaughtRef} />}
                  KAMI NASAYOD NGA ADUNA KAMI TULUBAGON PINANSYAL NGA NAGKATIDAD
                  (P10.00/DAY DOG FOOD)
                  {<RenderField key="dogFoodFee" placeholder="Dog Food Fee" isNum={true} ref={dogFoodFeeRef} />},
                  (P100.00 AGREEMENT FEE).
                  {<RenderField key="agreementFee" placeholder="Agreement Fee" isNum={true} ref={agreementFeeRef} />}
                  FIRST OFFENSE, P1,500 - SECOND OFFENSE AS PER MUN. ORD. NO.
                  2019-1255){' '}
                  {<RenderField key="offenseFee" placeholder="Offense Fee" isNum={true} ref={offenseFeeRef} />} 1st/2nd
                  OFFENSE.
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
                }}
              />
              {/* <div
                style={{
                  width: '95%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 40
                }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                  <div>__________________________</div>
                  <div style={{ fontSize: 12 }}>OFFICER OF THE DAY</div>
                </div>
              </div> */}
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
        <div className="modal-footer" style={{ marginRight: 20 }}>
          <Button
            onClick={() =>
              onSendForm({
                name: nameRef.current.value,
                purok: purokRef.current.value,
                gender: genderRef.current.value,
                color: colorRef.current.value,
                address: addressRef.current.value,
                dateCaught: dateCaughtRef.current.value,
                dogFoodFee: dogFoodFeeRef.current.value,
                agreementFee: agreementFeeRef.current.value,
                offenseFee: offenseFeeRef.current.value
              })
            }
            value="Send Form"
            width={100}
          />
        </div>
      </div>
    </ReactModal>
  )
}

ClaimModal.defaultProps = {
  isOpen: false
}

ClaimModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ClaimModal
