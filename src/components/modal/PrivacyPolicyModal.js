import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import ErrorWarningLineIcon from 'remixicon-react/ErrorWarningLineIcon'

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
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
            <label className="header-modal-title">Privacy Policy</label>
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
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0px 20px',
            flexDirection: 'column',
            height: 740
          }}>
          <h3>Privacy Policy</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            Damilag Impounding built the BARK app as a Free app. This SERVICE is
            provided by Damilag Impounding at no cost and is intended for use as
            is. This page is used to inform visitors regarding our policies with
            the collection, use, and disclosure of Personal Information if
            anyone decided to use our Service. If you choose to use our Service,
            then you agree to the collection and use of information in relation
            to this policy. The Personal Information that we collect is used for
            providing and improving the Service. We will not use or share your
            information with anyone except as described in this Privacy Policy.
          </label>
          <label
            style={{
              lineHeight: 1.5,
              textAlign: 'justify',
              fontSize: 13,
              marginTop: 10
            }}>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at BARK unless
            otherwise defined in this Privacy Policy.
          </label>
          <h3>Information Collection and Use</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            For a better experience, while using our Service, we may require you
            to provide us with certain personally identifiable information. The
            information that we request will be retained by us and used as
            described in this privacy policy.
          </label>
          <label
            style={{
              lineHeight: 1.5,
              textAlign: 'justify',
              fontSize: 13,
              marginTop: 10
            }}>
            The app doesn’t use third party services that may collect
            information used to identify you.
          </label>
          <label
            style={{
              lineHeight: 1.5,
              textAlign: 'justify',
              fontSize: 13,
              marginTop: 10
            }}>
            This Service does not use these “cookies” explicitly.
          </label>
          <h3>Service Providers</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            We may employ third-party companies and individuals due to the
            following reasons:
          </label>
          <ul style={{ lineHeight: 1.5, fontSize: 13, textAlign: 'justify' }}>
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
            <li>
              We want to inform users of this Service that these third parties
              have access to your Personal Information. The reason is to perform
              the tasks assigned to them on our behalf. However, they are
              obligated not to disclose or use the information for any other
              purpose.
            </li>
          </ul>
          <h3>Security</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </label>
          <h3>Children’s Privacy</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            These Services do not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13 years of age. In the case we discover that a child under 13
            has provided us with personal information, we immediately delete
            this from our servers. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us so that we will be able to do necessary actions.
          </label>
          <h3>Changes to This Privacy Policy</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. We will
            notify you of any changes by posting the new Privacy Policy on this
            page.
          </label>
          <label
            style={{
              lineHeight: 1.5,
              textAlign: 'justify',
              fontSize: 13,
              marginTop: 10
            }}>
            This policy is effective as of 2021-10-20
          </label>
          <h3>Contact Us</h3>
          <label
            style={{ lineHeight: 1.5, textAlign: 'justify', fontSize: 13 }}>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us at admin@dogsaver.com.
          </label>
        </div>
      </div>
    </ReactModal>
  )
}

PrivacyPolicyModal.defaultProps = {
  isOpen: false
}

PrivacyPolicyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default PrivacyPolicyModal
