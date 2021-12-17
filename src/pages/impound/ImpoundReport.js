/* eslint-disable react/prop-types */
import moment from 'moment'
import React from 'react'

// eslint-disable-next-line react/display-name
const ImpoundReport = React.forwardRef((props, ref) => (
  <div style={{ position: 'absolute', zIndex: -100, top: 0 }} ref={ref}>
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
        <div
          style={{
            fontSize: 24,
            fontWeight: 'bold'
          }}>
          DOG IMPOUND
        </div>
        <label>{moment(new Date()).format('YYYY-MM-DD')}</label>
      </div>
      <img src="assets/icons/sk.png" style={{ width: 100 }} />
    </div>
    <div
      style={{
        width: '7.9in',
        padding: 20
      }}>
      <table style={{ width: '100%' }}>
        <tr>
          <th style={{ fontSize: 12, textAlign: 'left' }}>#</th>
          <th style={{ fontSize: 12, textAlign: 'left' }}>Breed</th>
          <th style={{ fontSize: 12, textAlign: 'left' }}>Color</th>
          <th style={{ fontSize: 12, textAlign: 'left' }}>Gender</th>
          <th style={{ fontSize: 12, textAlign: 'left' }}>Date Added</th>
        </tr>
        {props?.props?.map((item, key) => (
          <tr key={key}>
            <td style={{ fontSize: 12 }}>{key + 1}</td>
            <td style={{ fontSize: 12 }}>{item?.breed}</td>
            <td style={{ fontSize: 12 }}>{item?.color}</td>
            <td style={{ fontSize: 12 }}>{item?.gender?.value}</td>
            <td style={{ fontSize: 12 }}>
              {moment(item?.dateAdded?.toDate()).format('YYYY-MM-DD')}
            </td>
          </tr>
        ))}
      </table>
    </div>
  </div>
))

export default ImpoundReport
