/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getActivityListAction,
  updateActivityAction
} from 'redux/actions/activities.action'
import BookLine from 'remixicon-react/BookLineIcon'
import moment from 'moment'
import SurrenderDogModal from './SurrenderDogModal'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { toast } from 'react-toastify'
import {
  createDogAction,
  createDogImpoundAction,
  removeDogAction,
  removeDogImpoundAction
} from 'redux/actions/dog.action'
import { UserContext } from 'contexts/user.context'
import ClaimDogModal from './ClaimDogModal'
import { fire } from 'firebase'
import AdoptDogModal from './AdoptDogModal'
import ViewDogImagesModal from 'components/modal/ViewDogImagesModal'
import ReasonModal from './ReasonModal'
import ViewSurrenderModal from 'components/modal/ViewSurrenderModal'
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon'
import ReactDatePicker from 'react-datepicker'
import PrinterLineIcon from 'remixicon-react/PrinterLineIcon'
import Pdf from 'react-to-pdf'
import ActivityReport from './ActivityReport'
import emailjs from 'emailjs-com'

const Activities = () => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const [activityList, setActivityList] = useState([])
  const [selectedActivity, setSelectedActivity] = useState({})
  const [showSurrenderDogModal, setShowSurrenderDogModal] = useState(false)
  const [showClaimDogModal, setShowClaimDogModal] = useState(false)
  const [showAdoptionModal, setShowAdoptionModal] = useState(false)
  const [showViewDogImagesModal, setShowViewDogImagesModal] = useState(false)
  const [showReasonModal, setShowReasonModal] = useState(false)
  const [showSurrenderModal, setShowSurrenderModal] = useState(false)
  const [reason, setReason] = useState('')
  const [dogImage1, setDogImage1] = useState()
  const [dogImage2, setDogImage2] = useState()
  const [dogImage3, setDogImage3] = useState()
  const [dogImage4, setDogImage4] = useState()
  const [activityStartDate, setActivityStartDate] = useState(
    moment().startOf('year').toDate()
  )
  const [activityEndDate, setActivityEndDate] = useState(moment().toDate())
  const ref = React.createRef()

  const { user } = useContext(UserContext)

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

  const handleView = (item) => {
    console.log(item)
    setSelectedActivity(item)

    if (item?.status === 'rejected' && user?.role === 'user') {
      setShowReasonModal(true)
      setReason(item?.rejectReason)
    } else {
      if (item?.type === 'surrender') {
        setShowSurrenderModal(true)
      } else if (item?.type === 'claim') {
        setShowClaimDogModal(true)
      } else if (item?.type === 'adoption') {
        setShowAdoptionModal(true)
      }
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
        <label>Action</label>
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
      <div
        style={{
          width: '16.6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 45,
          paddingLeft: 20,
          color: 'rgb(66, 194, 211)'
        }}>
        <label onClick={() => handleView(item)} style={{ cursor: 'pointer' }}>
          View
        </label>
      </div>
    </div>
  )

  useEffect(() => {
    setShowLoader(true)
    dispatch(
      getActivityListAction({
        data: {
          archive: false,
          emailOwner: user?.email
        },
        onSuccess: (response) => {
          setShowLoader(false)
          setActivityList(
            response?.data?.filter((item) =>
              moment(item?.dateAdded?.toDate()).isBetween(
                activityStartDate,
                activityEndDate
              )
            )
          )
        },
        onFailure: (error) => {
          setShowLoader(false)
          console.error(error)
        }
      })
    )
  }, [activityStartDate, activityEndDate])

  return (
    <div className="container">
      {showLoader && <LoadingOverlay />}
      <SurrenderDogModal
        role={user?.role}
        isOpen={showSurrenderDogModal}
        onClose={() => setShowSurrenderDogModal(false)}
        values={selectedActivity}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: async () => {
                if (selectedActivity?.user?.email) {
                  await emailjs.send('service_asfu4ce', 'template_29ccqfk', {
                    email: selectedActivity?.user?.email,
                    last_name: selectedActivity?.user?.lastName,
                    first_name: selectedActivity?.user?.firstName,
                    status: 'approved'
                  })
                }
                dispatch(
                  removeDogAction({
                    data: {
                      id: selectedActivity?.dog?.id,
                      values: {
                        archive: true
                      }
                    },
                    onSuccess: () => {},
                    onFailure: () => {}
                  })
                )
                dispatch(
                  createDogImpoundAction({
                    data: {
                      ...selectedActivity?.dog,
                      archive: false,
                      dateAdded: new Date()
                    },
                    onSuccess: () => {
                      setShowLoader(false)
                      setShowSurrenderDogModal(false)
                      setActivityList((prevList) =>
                        prevList?.map((item) =>
                          item?.id === selectedActivity?.id
                            ? { ...item, status: 'approved' }
                            : item
                        )
                      )
                      toast.success('Activity updated successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    },
                    onFailure: () => {
                      setShowLoader(false)
                      setShowSurrenderDogModal(false)
                      toast.error('Activity update error.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    }
                  })
                )
              },
              onFailure: () => {
                setShowLoader(false)
                setShowSurrenderDogModal(false)
                toast.error('Activity update error.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }
            })
          )
        }}
        onReject={() => {
          setShowReasonModal(true)
        }}
      />
      <ClaimDogModal
        role={user?.role}
        isOpen={showClaimDogModal}
        onClose={() => setShowClaimDogModal(false)}
        values={selectedActivity}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: async () => {
                if (selectedActivity?.user?.email) {
                  await emailjs.send('service_asfu4ce', 'template_29ccqfk', {
                    email: selectedActivity?.user?.email,
                    last_name: selectedActivity?.user?.lastName,
                    first_name: selectedActivity?.user?.firstName,
                    status: 'approved'
                  })
                }

                dispatch(
                  removeDogImpoundAction({
                    data: {
                      id: selectedActivity?.dog?.id,
                      values: {
                        archive: true
                      }
                    },
                    onSuccess: () => {},
                    onFailure: () => {}
                  })
                )
                dispatch(
                  createDogAction({
                    data: {
                      ...selectedActivity?.dog,
                      owner: {
                        label: `${selectedActivity?.user?.firstName} ${selectedActivity?.user?.lastName}`,
                        value: selectedActivity?.user
                      },
                      archive: false,
                      dateAdded: fire.firestore.Timestamp.now(),
                      spayed: false
                    },
                    onSuccess: () => {
                      setShowLoader(false)
                      setShowClaimDogModal(false)
                      setActivityList((prevList) =>
                        prevList?.map((item) =>
                          item?.id === selectedActivity?.id
                            ? { ...item, status: 'approved' }
                            : item
                        )
                      )
                      toast.success('Activity updated successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    },
                    onFailure: () => {
                      setShowLoader(false)
                      toast.error('Activity update failed.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    }
                  })
                )
              },
              onFailure: () => {
                setShowLoader(false)
                setShowClaimDogModal(false)
                toast.error('Activity update error.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }
            })
          )
        }}
        onReject={() => {
          setShowReasonModal(true)
        }}
      />
      <AdoptDogModal
        role={user?.role}
        isOpen={showAdoptionModal}
        onClose={() => setShowAdoptionModal(false)}
        values={selectedActivity}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: async () => {
                if (selectedActivity?.user?.email) {
                  await emailjs.send('service_asfu4ce', 'template_29ccqfk', {
                    email: selectedActivity?.user?.email,
                    last_name: selectedActivity?.user?.lastName,
                    first_name: selectedActivity?.user?.firstName,
                    status: 'approved'
                  })
                }
                dispatch(
                  removeDogImpoundAction({
                    data: {
                      id: selectedActivity?.dog?.id,
                      values: {
                        archive: true
                      }
                    },
                    onSuccess: () => {},
                    onFailure: () => {}
                  })
                )
                dispatch(
                  createDogAction({
                    data: {
                      ...selectedActivity?.dog,
                      owner: {
                        label: `${selectedActivity?.user?.firstName} ${selectedActivity?.user?.lastName}`,
                        value: selectedActivity?.user
                      },
                      archive: false,
                      dateAdded: fire.firestore.Timestamp.now(),
                      spayed: false
                    },
                    onSuccess: () => {
                      setShowLoader(false)
                      setShowAdoptionModal(false)
                      setActivityList((prevList) =>
                        prevList?.map((item) =>
                          item?.id === selectedActivity?.id
                            ? { ...item, status: 'approved' }
                            : item
                        )
                      )
                      toast.success('Activity updated successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    },
                    onFailure: () => {
                      setShowLoader(false)
                      toast.error('Activity update failed.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    }
                  })
                )
              },
              onFailure: () => {
                setShowLoader(false)
                setShowAdoptionModal(false)
                toast.error('Activity update error.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }
            })
          )
        }}
        onReject={() => {
          setShowReasonModal(true)
        }}
      />
      <ViewSurrenderModal
        role={user?.role}
        isOpen={showSurrenderModal}
        values={selectedActivity}
        onClose={() => setShowSurrenderModal(false)}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: async () => {
                if (selectedActivity?.user?.email) {
                  await emailjs.send('service_asfu4ce', 'template_29ccqfk', {
                    email: selectedActivity?.user?.email,
                    last_name: selectedActivity?.user?.lastName,
                    first_name: selectedActivity?.user?.firstName,
                    status: 'approved'
                  })
                }
                dispatch(
                  removeDogAction({
                    data: {
                      id: selectedActivity?.dog?.id,
                      values: {
                        archive: true
                      }
                    },
                    onSuccess: () => {},
                    onFailure: () => {}
                  })
                )
                dispatch(
                  createDogImpoundAction({
                    data: {
                      ...selectedActivity?.dog,
                      archive: false,
                      dateAdded: new Date()
                    },
                    onSuccess: () => {
                      setShowLoader(false)
                      setShowSurrenderDogModal(false)
                      setShowSurrenderModal(false)
                      setActivityList((prevList) =>
                        prevList?.map((item) =>
                          item?.id === selectedActivity?.id
                            ? { ...item, status: 'approved' }
                            : item
                        )
                      )
                      toast.success('Activity updated successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    },
                    onFailure: () => {
                      setShowLoader(false)
                      setShowSurrenderDogModal(false)
                      toast.error('Activity update error.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                    }
                  })
                )
              },
              onFailure: () => {
                setShowLoader(false)
                setShowSurrenderDogModal(false)
                toast.error('Activity update error.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }
            })
          )
        }}
        onReject={() => {
          setShowReasonModal(true)
        }}
      />
      <ViewDogImagesModal
        dogImage1={dogImage1}
        dogImage2={dogImage2}
        dogImage3={dogImage3}
        dogImage4={dogImage4}
        isOpen={showViewDogImagesModal}
        onClose={() => setShowViewDogImagesModal(false)}
      />
      <ReasonModal
        isOpen={showReasonModal}
        reason={reason}
        onClose={() => setShowReasonModal(false)}
        onReject={(rejectReason) => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'rejected', rejectReason }
              },
              onSuccess: async () => {
                setShowLoader(false)
                setShowSurrenderDogModal(false)
                setShowClaimDogModal(false)
                setShowAdoptionModal(false)
                setShowReasonModal(false)
                setShowSurrenderModal(false)
                setShowViewDogImagesModal(false)
                setActivityList((prevList) =>
                  prevList?.map((item) =>
                    item?.id === selectedActivity?.id
                      ? { ...item, status: 'rejected' }
                      : item
                  )
                )
                if (selectedActivity?.user?.email) {
                  await emailjs.send('service_asfu4ce', 'template_29ccqfk', {
                    email: selectedActivity?.user?.email,
                    last_name: selectedActivity?.user?.lastName,
                    first_name: selectedActivity?.user?.firstName,
                    message: rejectReason,
                    status: 'rejected'
                  })
                }
                toast.success('Activity updated successfully.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              },
              onFailure: () => {
                setShowLoader(false)
                setShowSurrenderDogModal(false)
                toast.error('Activity update error.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
              }
            })
          )
        }}
      />
      <div className="right-container">
        <div className="w-full justify-between" style={{ width: '98%' }}>
          <h1>Activities</h1>
          <div className="flex items-center">
            <label className="margin-b-10 margin-r-10">Filter Date:</label>
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
                selected={activityStartDate}
                dateFormat="MM/dd/yyyy"
                showPreviousMonths={false}
                onChange={(date) => {
                  setActivityStartDate(date)
                }}
                maxDate={activityEndDate}
                onChangeRaw={(evt) => evt.preventDefault()}
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
                selected={activityEndDate}
                dateFormat="MM/dd/yyyy"
                minDate={activityStartDate}
                maxDate={new Date()}
                onChange={(date) => {
                  setActivityEndDate(date)
                }}
                onChangeRaw={(evt) => evt.preventDefault()}
                placeholderText="Start Date"
              />
            </div>
            <Pdf targetRef={ref} filename="activity.pdf">
              {({ toPdf }) => (
                <PrinterLineIcon
                  onClick={toPdf}
                  className="margin-b-10 margin-l-10 cursor-pointer"
                />
              )}
            </Pdf>
          </div>
        </div>
        <div
          className="user-list-panel"
          style={{
            padding: 0,
            width: '98%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
          {activityList?.length ? <Column /> : ''}
          {activityList?.length ? (
            activityList?.map((item) => <Activity key={item.id} item={item} />)
          ) : (
            <div className="empty-panel">
              <BookLine size={100} />
              <label className="empty-panel-label">Data is empty</label>
            </div>
          )}
        </div>
      </div>
      <ActivityReport ref={ref} props={activityList} />
    </div>
  )
}

export default Activities
