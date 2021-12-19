/* eslint-disable react/prop-types */
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import { UserContext } from 'contexts/user.context'
import moment from 'moment'
import React, { createRef, useContext, useEffect, useState } from 'react'
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
import Report from './Report'
import { firestore } from 'firebase'
import Pdf from 'react-to-pdf'
import PrinterLineIcon from 'remixicon-react/PrinterLineIcon'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Reports = () => {
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
  const [euthanizedDogs, setEuthanizedDogs] = useState(0)
  const [activityList, setActivityList] = useState([])
  const { user } = useContext(UserContext)
  const [dogStartDate, setDogStartDate] = useState(
    moment().startOf('year').toDate()
  )
  const [dogEndDate, setDogEndDate] = useState(moment().toDate())
  const [userStartDate, setUserStartDate] = useState(
    moment(moment('1', 'MM', 'YYYY').toDate()).startOf('month').toDate()
  )
  const [userEndDate, setUserEndDate] = useState(
    moment(moment('12', 'MM', 'YYYY').toDate()).endOf('month').toDate()
  )
  const ref = createRef()

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

  const getEuth = async () => {
    let query = await firestore
      .collection('dog-impound')
      .where('archive', '==', true).get()

    setEuthanizedDogs(
      query.docs.map(item => item.data())?.filter((item) =>
        moment(item?.dateAdded?.toDate()).isBetween(
          userStartDate,
          userEndDate
        )
      ).length
    )
  }

  useEffect(() => {
    console.log('Claimed Dogs', claimedDogs)
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
                  userStartDate,
                  userEndDate
                )
              ).length
          )
          setRegisteredDogs(
            payload?.filter((item) =>
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
                  userStartDate,
                  userEndDate
                )
              ).length
            )
          },
          onFailure: () => {}
        })
      )

      getEuth()
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
                  userStartDate,
                  userEndDate
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
                  userStartDate,
                  userEndDate
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
                  userStartDate,
                  userEndDate
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

  const [month, setMonth] = useState({ label: 'All', value: moment('1', 'MM', 'YYYY').toDate() })

  return (
    <div className="container">
      <div className="right-container" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full" style={{ width: '98%', height: 900, paddingTop: 20 }}>
          <label style={{ fontWeight: 'bold'}}>Date Range</label>
          <div className="margin-b-10" style={{ width: 200 }}>
            <Select
              options={[
                { label: 'All', value: moment('1', 'MM', 'YYYY').toDate() },
                { label: 'January', value: moment('1', 'MM', 'YYYY').toDate() },
                { label: 'February', value: moment('2', 'MM', 'YYYY').toDate() },
                { label: 'March', value: moment('3', 'MM', 'YYYY').toDate() },
                { label: 'April', value: moment('4', 'MM', 'YYYY').toDate() },
                { label: 'May', value: moment('5', 'MM', 'YYYY').toDate() },
                { label: 'June', value: moment('6', 'MM', 'YYYY').toDate() },
                { label: 'July', value: moment('7', 'MM', 'YYYY').toDate() },
                { label: 'August', value: moment('8', 'MM', 'YYYY').toDate() },
                { label: 'September', value: moment('9', 'MM', 'YYYY').toDate() },
                { label: 'October', value: moment('10', 'MM', 'YYYY').toDate() },
                { label: 'November', value: moment('11', 'MM', 'YYYY').toDate() },
                { label: 'December', value: moment('12', 'MM', 'YYYY').toDate() }
              ]}
              styles={selectStyles}
              placeholder="Select Month"
              value={month}
              onChange={(selected) => {
                setMonth(selected)
                if (selected.label === 'All') {
                  setUserStartDate(moment(moment('1', 'MM', 'YYYY').toDate()).startOf('month').toDate())
                  setUserEndDate(moment(moment('12', 'MM', 'YYYY').toDate()).endOf('month').toDate())
                } else {
                  setUserStartDate(moment(selected.value).startOf('month').toDate())
                  setUserEndDate(moment(selected.value).endOf('month').toDate())
                }
              }}
            />
          </div>
          <div style={{ width: '7.9in', display: 'flex', justifyContent: 'space-between' }}>
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
                  dateFormat="MM/dd/yyyy"
                  selected={userStartDate}
                  onChange={(date) => {
                    setUserStartDate(date)
                  }}
                  minDate={moment(month.value).startOf('month').toDate()}
                  maxDate={month.label === 'All' ? moment(moment('12', 'MM', 'YYYY').toDate()).endOf('month').toDate() : moment(month.value).endOf('month').toDate()}
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
                  maxDate={month.label === 'All' ? moment(moment('12', 'MM', 'YYYY').toDate()).endOf('month').toDate() : moment(month.value).endOf('month').toDate()}
                  onChange={(date) => {
                    setUserEndDate(date)
                  }}
                  placeholderText="End Date"
                />
              </div>
            </div>
            <Pdf targetRef={ref} filename="report.pdf">
              {({ toPdf }) => (
                <PrinterLineIcon
                  onClick={toPdf}
                  className="margin-l-10 cursor-pointer margin-t-10"
                />
              )}
            </Pdf>
          </div>
          <Report
            ref={ref}
            props={{
              startDate: userStartDate,
              endDate: userEndDate,
              impound: {
                registeredDogs,
                impoundDogs,
                surrenderedDogs,
                claimedDogs,
                adoptDogs,
                vaccinatedDogs,
                euthanizedDogs
              },
              month: month
            }}
          />
          <div style={{ marginTop: 20, paddingTop: 20 }} />
        </div>
      </div>
    </div>
  )
}

export default Reports
