/* eslint-disable react/prop-types */
import moment from 'moment'
import React from 'react'

// eslint-disable-next-line react/display-name
const Report = React.forwardRef(({ props }, ref) => (
  <div style={{ zIndex: 100, top: 0 }} ref={ref}>
    <div
      style={{
        width: '7.9in',
        height: '11inc',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
        borderBottom: '1px solid black'
      }}>
      <img src="assets/icons/damilag.png" style={{ width: 80 }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: 14 }}>Republic of the Philippines</div>
          <div style={{ fontSize: 14 }}>Province of Bukidnon</div>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>MUNICIPALITY OF MANOLO FORTICH</div>
          <div style={{ fontSize: 14 }}>Barangay Damilag</div>
        {/* <div
          style={{
            fontSize: 24,
            fontWeight: 'bold'
          }}>
          DOG IMPOUND
        </div>
        <label>{moment(new Date()).format('YYYY-MM-DD')}</label> */}
      </div>
      <img src="assets/icons/mf.png" style={{ width: 100 }} />
    </div>
    <div style={{ width: '7.9in', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 50, marginBottom: 50 }}>
      <div style={{ fontSize: 14, fontWeight: 'bold' }}>DAMILAG DOG IMPOUNDING</div>
      <div style={{ fontSize: 14, fontWeight: 'bold' }}>MONTHLY SUMMARY REPORT</div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 14, marginRight: 10 }}>
            {`
              ${props.month.label === 'All' ? `January - December` : moment(props.month.value).format('MMMM')} ${moment(props.year).format('YYYY') }
            `}
          </div>
        </div>
      </div>
    </div>
    <div style={{ width: '7.9in', display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
      <div style={{ width: '25%', border: '1px solid black', borderRight: 0, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100%', position: 'absolute', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid black', height: 30 }}>
          <label>CATCHED</label>
        </div>
        <h1 style={{ marginTop: 40 }}>{props?.impound?.impoundDogs}</h1>
      </div>
      <div style={{ width: '25%', border: '1px solid black', borderRight: 0, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100%', position: 'absolute', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid black', height: 30 }}>
          <label>CLAIMED</label>
        </div>
        <h1 style={{ marginTop: 40 }}>{props?.impound?.claimedDogs}</h1>
      </div>
      <div style={{ width: '25%', border: '1px solid black', borderRight: 0, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100%', position: 'absolute', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid black', height: 30 }}>
          <label>ADOPTED</label>
        </div>
        <h1 style={{ marginTop: 40 }}>{props?.impound?.adoptDogs}</h1>
      </div>
      <div style={{ width: '25%', border: '1px solid black', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: '100%', position: 'absolute', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid black', height: 30 }}>
          <label>EUTHANIZED</label>
        </div>
        <h1 style={{ marginTop: 40 }}>{props?.impound?.euthanizedDogs}</h1>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, paddingLeft: 20 }}>
      <div style={{ fontSize: 14 }}>Prepared by:</div>
      <div style={{ fontSize: 14, marginTop: 20 }}>________________________________</div>
      <div style={{ fontSize: 14 }}>Barangay Animal Health Worker</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, paddingLeft: 20 }}>
      <div style={{ fontSize: 14, textDecoration: 'underline', fontWeight: 'bold' }}>ANTHONY G. INIHAO</div>
      <div style={{ fontSize: 14, marginTop: 5 }}>Committee Chairperson</div>
      <div style={{ fontSize: 14, marginTop: 5 }}>On Agriculture & the environment</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, paddingLeft: 20 }}>
      <div style={{ fontSize: 14, }}>Noted By:</div>
      <div style={{ fontSize: 14, textDecoration: 'underline', fontWeight: 'bold', marginTop: 10 }}>ALLAN G. TORRES JR.</div>
      <div style={{ fontSize: 14, marginTop: 5 }}>Punong Barangay</div>
    </div>
  </div>
))

export default Report
