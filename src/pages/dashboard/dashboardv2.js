/* eslint-disable react/prop-types */
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import { UserContext } from 'contexts/user.context'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getActivityListAction } from 'redux/actions/activities.action'
import { getAnnouncementsAction } from 'redux/actions/announcement.action'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import ArrowLeftIcon from 'remixicon-react/ArrowLeftLineIcon'
import {
  getDogImpoundListAction,
  getDogsAction
} from 'redux/actions/dog.action'
import BookLineIcon from 'remixicon-react/BookLineIcon'
import {
  dogOptions,
  orderOptions,
  selectStyles,
  userFilterOptions,
  userSortOptions
} from 'utils/helpers'
import Select from 'react-select'
import { Bar } from 'react-chartjs-2'
import { getUserListAction } from 'redux/actions/user.action'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import ReactDatePicker from 'react-datepicker'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [announcements, setAnnouncement] = useState([])
  const [registeredDogs, setRegisteredDogs] = useState(0)
  const [impoundDogs, setImpoundDogs] = useState(0)
  const [claimedDogs, setClaimedDogs] = useState(0)
  const [surrenderedDogs, setSurrenderedDogs] = useState(0)
  const [adoptDogs, setAdoptDogs] = useState(0)
  const [vaccinatedDogs, setVaccinatedDogs] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [archiveUsers, setArchiveUsers] = useState(0)
  const [activityList, setActivityList] = useState([])
  const { user } = useContext(UserContext)
  const [dogStartDate, setDogStartDate] = useState(
    moment().startOf('year').toDate()
  )
  const [dogEndDate, setDogEndDate] = useState(moment().toDate())
  const [userStartDate, setUserStartDate] = useState(
    moment().startOf('year').toDate()
  )
  const [userEndDate, setUserEndDate] = useState(moment().toDate())
  const [userRecentOption, setUserRecentOption] = useState({
    label: 'Weekly',
    value: 'week'
  })

  const [index, setIndex] = useState(0)

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false
        },
        barThickness: 73
      }
    },
    scaleShowGridLines: false,
    interaction: {
      intersect: false
    },
    barPercentage: 0.6,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0])
  const [totalDogs, setTotalDogs] = useState(0)

  const [userChartData, setUserChartData] = useState([0, 0])
  const [totalUsers, setTotalUsers] = useState(0)

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
        data: { filterBy: '' },
        onSuccess: (payload) => setAnnouncement(payload.slice(0, 5)),
        onFailed: (error) => console.error(error)
      })
    )

    dispatch(
      getUserListAction({
        data: {
          filterBy: '',
          sortBy: userSortOptions[0].value,
          order: orderOptions[0].value,
          searchKey: ''
        },
        onSuccess: (payload) => {
          setActiveUsers(
            payload
              ?.filter((item) => !item.archive)
              ?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  userStartDate,
                  userEndDate
                )
              ).length
          )
          setArchiveUsers(
            payload
              ?.filter((item) => item.archive)
              ?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  userStartDate,
                  userEndDate
                )
              ).length
          )
        },
        onFailure: () => {}
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
                moment(item?.dateAdded?.toDate()).isBetween(
                  dogStartDate,
                  dogEndDate
                )
              ).length
          )
          setRegisteredDogs(
            payload?.filter((item) =>
              moment(item?.dateAdded?.toDate()).isBetween(
                dogStartDate,
                dogEndDate
              )
            ).length
          )
        },
        onFailure: () => {}
      })
    )

    if (user?.role === 'admin') {
      dispatch(
        getDogImpoundListAction({
          data: {
            archive: false
          },
          onSuccess: (list) => {
            const payload = list?.data
            setImpoundDogs(
              payload?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  dogStartDate,
                  dogEndDate
                )
              ).length
            )
          },
          onFailure: () => {}
        })
      )
    }

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
                (item) =>
                  item.type === 'claim' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  dogStartDate,
                  dogEndDate
                )
              ).length
          )
          setSurrenderedDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'surrender' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  dogStartDate,
                  dogEndDate
                )
              ).length
          )
          setAdoptDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'adoption' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isBetween(
                  dogStartDate,
                  dogEndDate
                )
              ).length
          )
        },
        onFailure: () => {}
      })
    )
  }, [dogStartDate, dogEndDate, userStartDate, userEndDate])

  useEffect(() => {
    setChartData([
      registeredDogs,
      impoundDogs,
      surrenderedDogs,
      claimedDogs,
      adoptDogs,
      vaccinatedDogs
    ])
    setTotalDogs(
      registeredDogs +
        impoundDogs +
        surrenderedDogs +
        claimedDogs +
        adoptDogs +
        vaccinatedDogs
    )
  }, [
    registeredDogs,
    impoundDogs,
    surrenderedDogs,
    claimedDogs,
    adoptDogs,
    vaccinatedDogs
  ])

  useEffect(() => {
    setUserChartData([activeUsers, archiveUsers])
    setTotalUsers(activeUsers + archiveUsers)
  }, [activeUsers, archiveUsers])

  return (
    <div className="container">
      <div className="right-container" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full" style={{ width: '98%', height: 900 }}>
          <h1>Dog Recent Updates</h1>
          <div className="flex items-center" style={{ width: 200 }}>
            <div className="margin-b-10 relative" style={{ marginTop: 10 }}>
              <CalendarLineIcon
                size={18}
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <ReactDatePicker
                className="text-field"
                selected={dogStartDate}
                dateFormat="MM/dd/yyyy"
                showPreviousMonths={false}
                onChange={(date) => {
                  setDogStartDate(date)
                }}
                maxDate={dogEndDate}
                placeholderText="Start Date"
              />
            </div>
            <label
              style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
              -
            </label>
            <div className="margin-b-10 relative" style={{ marginTop: 10 }}>
              <CalendarLineIcon
                size={18}
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <ReactDatePicker
                className="text-field"
                selected={dogEndDate}
                dateFormat="MM/dd/yyyy"
                minDate={dogStartDate}
                maxDate={new Date()}
                onChange={(date) => {
                  setDogEndDate(date)
                }}
                placeholderText="Start Date"
              />
            </div>
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
            {user?.role === 'admin' && (
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
            )}
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
          <div
            className="w-full item-center justify-center"
            style={{ marginTop: 20 }}>
            <div
              style={{
                width: '50%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 12
              }}>
              <Bar
                data={{
                  labels: [
                    'Registered Dogs',
                    'Impound Dogs',
                    'Surrendered Dogs',
                    'Claimed Dogs',
                    'Adopt Dogs',
                    'Vaccinated Dogs'
                  ],
                  datasets: [
                    {
                      data: chartData,
                      borderWidth: 1,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ]
                    }
                  ]
                }}
                options={options}
              />
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <h1>Total</h1>
              <div
                style={{ color: '#42c2d3', fontSize: 80, fontWeight: 'bold' }}>
                {totalDogs}
              </div>
            </div>
          </div>
          <h1>User Recent Updates</h1>
          <div className="flex items-center" style={{ width: 200 }}>
            <div className="margin-b-10 relative" style={{ marginTop: 10 }}>
              <CalendarLineIcon
                size={18}
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <ReactDatePicker
                className="text-field"
                selected={userStartDate}
                dateFormat="MM/dd/yyyy"
                showPreviousMonths={false}
                onChange={(date) => {
                  setUserStartDate(date)
                }}
                maxDate={userEndDate}
                placeholderText="Start Date"
              />
            </div>
            <label
              style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
              -
            </label>
            <div className="margin-b-10 relative" style={{ marginTop: 10 }}>
              <CalendarLineIcon
                size={18}
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <ReactDatePicker
                className="text-field"
                selected={userEndDate}
                dateFormat="MM/dd/yyyy"
                minDate={userStartDate}
                maxDate={new Date()}
                onChange={(date) => {
                  setUserEndDate(date)
                }}
                placeholderText="Start Date"
              />
            </div>
          </div>
          <div className="flex w-full items-center">
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 15
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Active Users</h5>
              <h1 style={{ color: '#42c2d3' }}>{activeUsers}</h1>
            </div>
            {user?.role === 'admin' && (
              <div
                style={{
                  width: 200,
                  minHeight: 100,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 20,
                  marginRight: 10
                }}>
                <h5 style={{ padding: 0, margin: 0 }}>Archive Users</h5>
                <h1 style={{ color: '#42c2d3' }}>{archiveUsers}</h1>
              </div>
            )}
          </div>
          <div
            className="w-full item-center justify-center"
            style={{ marginTop: 20 }}>
            <div
              style={{
                width: '50%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 12
              }}>
              <Bar
                data={{
                  labels: ['Active Users', 'Archive Users'],
                  datasets: [
                    {
                      data: userChartData,
                      borderWidth: 1,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)']
                    }
                  ]
                }}
                options={options}
              />
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <h1>Total</h1>
              <div
                style={{ color: '#42c2d3', fontSize: 80, fontWeight: 'bold' }}>
                {totalUsers}
              </div>
            </div>
          </div>
          {/* <h1>Recent Announcement</h1>
          <div className="swipeable">
            {index !== 0 && (
              <ArrowLeftIcon
                onClick={() => setIndex(index - 1)}
                className="swipeable-arrow-l cursor-pointer"
              />
            )}
            <AutoPlaySwipeableViews
              style={{ width: '80%' }}
              interval={5000}
              index={index}
              onChangeIndex={handleChangeIndex}>
              {announcements.map((item) => (
                <AnnouncementMessage key={item} item={item} role="user" />
              ))}
            </AutoPlaySwipeableViews>
            {index !== announcements?.length - 1 && (
              <ArrowLeftIcon
                onClick={() => setIndex(index + 1)}
                className="swipeable-arrow-r cursor-pointer"
              />
            )}
            <div className="swipeable-dots-cont">
              {announcements.map((item, i) => (
                <div
                  key={item}
                  onClick={() => setIndex(i)}
                  className="swipeable-dots"
                  style={{ backgroundColor: i === index ? 'white' : '' }}
                />
              ))}
            </div>
          </div> */}
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
              <div
                className="empty-panel"
                style={{ height: 200, paddingTop: 40 }}>
                <BookLineIcon size={100} />
                <label className="empty-panel-label">Data is empty</label>
              </div>
            )}
            {activityList?.length ? (
              <div
                className="w-full items-center justify-center"
                style={{ marginTop: 30 }}>
                <label
                  onClick={() => history.push('/activities')}
                  style={{ color: '#42c2d3', cursor: 'pointer' }}>
                  View All
                </label>
              </div>
            ) : (
              <div />
            )}
          </div>
          <div style={{ marginTop: 20, paddingTop: 20 }} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
