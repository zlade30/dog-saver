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
  const [reason, setReason] = useState('')
  const [dogImage1, setDogImage1] = useState()
  const [dogImage2, setDogImage2] = useState()
  const [dogImage3, setDogImage3] = useState()
  const [dogImage4, setDogImage4] = useState()

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
        setShowSurrenderDogModal(true)
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
          setActivityList(response?.data)
        },
        onFailure: (error) => {
          setShowLoader(false)
          console.error(error)
        }
      })
    )
  }, [])

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
              onSuccess: () => {
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
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: () => {
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
        onApprove={() => {
          setShowLoader(true)
          dispatch(
            updateActivityAction({
              data: {
                id: selectedActivity?.id,
                values: { status: 'approved' }
              },
              onSuccess: () => {
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
              onSuccess: () => {
                setShowLoader(false)
                setShowSurrenderDogModal(false)
                setShowClaimDogModal(false)
                setShowAdoptionModal(false)
                setShowReasonModal(false)
                setActivityList((prevList) =>
                  prevList?.map((item) =>
                    item?.id === selectedActivity?.id
                      ? { ...item, status: 'rejected' }
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
      <div className="right-container">
        <div className="w-full justify-between" style={{ width: '98%' }}>
          <h1>Activities</h1>
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
    </div>
  )
}

export default Activities
