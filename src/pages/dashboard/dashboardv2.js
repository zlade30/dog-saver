/* eslint-disable react/prop-types */
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import { UserContext } from 'contexts/user.context'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getActivityListAction } from 'redux/actions/activities.action'
import { getAnnouncementsAction } from 'redux/actions/announcement.action'
import {
  getDogImpoundListAction,
  getDogsAction
} from 'redux/actions/dog.action'
import BookLineIcon from 'remixicon-react/BookLineIcon'
import {
  dogOptions,
  orderOptions,
  selectStyles,
  userSortOptions
} from 'utils/helpers'
import Select from 'react-select'

const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [announcement, setAnnouncement] = useState({})
  const [registeredDogs, setRegisteredDogs] = useState(0)
  const [impoundDogs, setImpoundDogs] = useState(0)
  const [claimedDogs, setClaimedDogs] = useState(0)
  const [surrenderedDogs, setSurrenderedDogs] = useState(0)
  const [adoptDogs, setAdoptDogs] = useState(0)
  const [vaccinatedDogs, setVaccinatedDogs] = useState(0)
  const [activityList, setActivityList] = useState([])
  const { user } = useContext(UserContext)
  const [dogRecentOption, setDogRecentOption] = useState({
    label: 'Weekly',
    value: 'week'
  })

  const handleStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange'
      case 'Approved':
        return 'green'
      case 'Rejected':
        return 'red'
      default:
        return '#334d67'
    }
  }

  const Column = () => (
    <div
      style={{
        height: 45,
        borderBottom: '1px solid #334d67',
        width: '98%',
        display: 'flex',
        alignItems: 'center'
      }}>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          height: 45,
          paddingLeft: 20,
          fontWeight: 'bold'
        }}>
        <label>Name</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          height: 45,
          paddingLeft: 20,
          fontWeight: 'bold'
        }}>
        <label>Contact</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20,
          fontWeight: 'bold'
        }}>
        <label>Activity Status</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20,
          fontWeight: 'bold'
        }}>
        <label>Activity Type</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20,
          fontWeight: 'bold'
        }}>
        <label>Date Added</label>
      </div>
    </div>
  )

  const Activity = ({ item }) => (
    <div
      style={{
        height: 45,
        borderBottom: '1px solid rgb(197, 191, 191)',
        width: '98%',
        display: 'flex',
        alignItems: 'center'
      }}>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          height: 45,
          paddingLeft: 20
        }}>
        <label>{`${item?.user?.firstName} ${item?.user?.lastName}`}</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          height: 45,
          paddingLeft: 20
        }}>
        <label>{item?.user?.phone}</label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20,
          color: handleStatusColor(
            item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)
          )
        }}>
        <label>
          {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
        </label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20
        }}>
        <label>
          {item?.type?.charAt(0).toUpperCase() + item?.type?.slice(1)}
        </label>
      </div>
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20
        }}>
        <label>{moment(item?.dateAdded?.toDate()).format('MM/DD/YYYY')}</label>
      </div>
    </div>
  )

  useEffect(() => {
    dispatch(
      getAnnouncementsAction({
        onSuccess: (payload) => setAnnouncement(payload[0]),
        onFailed: (error) => console.error(error)
      })
    )

    dispatch(
      getDogsAction({
        data: {
          emailOwner: user?.email,
          filterBy: dogOptions[0].value,
          sortBy: userSortOptions[0].value,
          order: orderOptions[0].value
        },
        onSuccess: (payload) => {
          console.log(payload)
          setVaccinatedDogs(
            payload
              ?.filter((item) => item.vaccineReceived)
              ?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setRegisteredDogs(
            payload?.filter((item) =>
              moment(item?.dateAdded?.toDate()).isSame(
                new Date(),
                dogRecentOption.value
              )
            ).length
          )
        },
        onFailure: () => {}
      })
    )

    dispatch(
      getDogImpoundListAction({
        data: {
          archive: false
        },
        onSuccess: (list) => {
          const payload = list?.data
          setImpoundDogs(
            payload?.filter((item) =>
              moment(item?.dateAdded?.toDate()).isSame(
                new Date(),
                dogRecentOption.value
              )
            ).length
          )
        },
        onFailure: () => {}
      })
    )

    dispatch(
      getActivityListAction({
        data: {
          archive: false,
          emailOwner: user?.email
        },
        onSuccess: (response) => {
          setActivityList(response?.data?.slice(0, 3))
          setClaimedDogs(
            response?.data
              ?.filter(
                (item) => item.type === 'claim' && item.status === 'approved'
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setSurrenderedDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'surrender' && item.status === 'approved'
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setAdoptDogs(
            response?.data
              ?.filter(
                (item) => item.type === 'adoption' && item.status === 'approved'
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
        },
        onFailure: () => {}
      })
    )
  }, [dogRecentOption])

  return (
    <div className="container">
      <div className="right-container" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full" style={{ width: '98%', height: 900 }}>
          <h1>Dog Recent Updates</h1>
          <div style={{ width: 200, marginBottom: 20 }}>
            <Select
              options={[
                { label: 'Daily', value: 'day' },
                { label: 'Weekly', value: 'week' },
                { label: 'Monthly', value: 'month' }
              ]}
              styles={selectStyles}
              value={dogRecentOption}
              onChange={(selected) => setDogRecentOption(selected)}
            />
          </div>
          <div className="flex w-full justify-between">
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Registered Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{registeredDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Impound Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{impoundDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Surrendered Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{surrenderedDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Claimed Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{claimedDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Adopt Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{adoptDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Vaccinated Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{vaccinatedDogs}</h1>
            </div>
          </div>
          <h1>Recent Announcement</h1>
          <AnnouncementMessage item={announcement} role="user" />
          <h1>Recent Activities</h1>
          <div
            style={{
              backgroundColor: 'white',
              paddingLeft: 10,
              paddingBottom: 40,
              borderRadius: 12
            }}>
            {activityList?.length ? <Column /> : ''}
            {activityList?.length ? (
              activityList?.map((item) => (
                <Activity key={item.id} item={item} />
              ))
            ) : (
              <div className="empty-panel">
                <BookLineIcon size={100} />
                <label className="empty-panel-label">Data is empty</label>
              </div>
            )}
            <div
              className="w-full items-center justify-center"
              style={{ marginTop: 30 }}>
              <label
                onClick={() => history.push('/activities')}
                style={{ color: '#42c2d3', cursor: 'pointer' }}>
                View All
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
