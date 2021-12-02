import React, { useContext, useEffect, useState } from 'react'
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import Button from 'components/buttons/Button'
import AnnouncementFormModal from 'components/modal/AnnouncementFormModal'
import { useDispatch } from 'react-redux'
import {
  addAnnouncementAction,
  getAnnouncementsAction,
  removeAnnouncementAction,
  updateAnnouncementAction
} from 'redux/actions/announcement.action'
import { fire } from 'firebase'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import ConfirmationModal from 'components/modal/ConfirmationModal'
import { UserContext } from 'contexts/user.context'
import Select from 'react-select'
import { dogOptions, selectStyles } from 'utils/helpers'

const Announcements = () => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formValues, setFormValues] = useState()
  const [announcements, setAnnouncements] = useState([])
  const [announcementId, setAnnouncementId] = useState()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isArchiveClick, setIsArchiveClick] = useState(false)
  const [confirmContent, setConfirmContent] = useState('')
  const [filterBy, setFilterBy] = useState({
    label: 'Active Announcements',
    value: false
  })

  const { user } = useContext(UserContext)

  const onSubmit = (values) => {
    setShowLoader(true)
    if (!isUpdate) {
      dispatch(
        addAnnouncementAction({
          data: { ...values, dateAdded: new Date(), archive: false },
          onSuccess: (payload) => {
            setShowLoader(false)
            setAnnouncements((prevData) => [
              ...prevData,
              {
                ...values,
                id: payload,
                dateAdded: fire.firestore.Timestamp.now()
              }
            ])
            toast.success('Announcement created successfully.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setShowFormModal(false)
          },
          onFailed: (error) => {
            console.log(error)
            setShowLoader(false)
            toast.error('Announcement creation failed.', {
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
    } else {
      console.log('values', { ...values, id: announcementId })
      dispatch(
        updateAnnouncementAction({
          data: { ...values, id: announcementId },
          onSuccess: () => {
            setShowLoader(false)
            setAnnouncements((prevData) =>
              prevData?.map((item) =>
                item?.id === announcementId
                  ? { ...values, id: announcementId }
                  : item
              )
            )
            toast.success('Announcement updated successfully.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setShowFormModal(false)
          },
          onFailed: (error) => {
            console.log(error)
            setShowLoader(false)
            toast.error('Announcement update failed.', {
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
    }
  }

  const handleYesAction = () => {
    setShowLoader(true)
    dispatch(
      removeAnnouncementAction({
        data: {
          id: announcementId,
          values: {
            archive: isArchiveClick
          }
        },
        onSuccess: () => {
          setShowLoader(false)
          setAnnouncements((prevList) =>
            prevList.filter((item) => item.id !== announcementId)
          )
          toast.success(
            `Announcement ${
              isArchiveClick ? 'archived' : 'restored'
            } successfully.`,
            {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            }
          )
          setShowConfirmModal(false)
        },
        onFailure: (error) => {
          toast.error(
            `Announcement ${isArchiveClick ? 'archived' : 'restored'} failed.`,
            {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            }
          )
          console.error(error)
          setShowConfirmModal(false)
        }
      })
    )
  }

  const onArchive = (item) => {
    setAnnouncementId(item?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(true)
    setFormValues(item)
    setConfirmContent(`Are you sure you want to archive ${item?.title}?`)
  }

  const onRestore = (item) => {
    setAnnouncementId(item?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(false)
    setFormValues(item)
    setConfirmContent(`Are you sure you want to restore ${item?.title}?`)
  }

  const onUpdate = (item) => {
    setAnnouncementId(item?.id)
    setIsUpdate(true)
    setShowFormModal(true)
    setFormValues(item)
  }

  useEffect(() => {
    dispatch(
      getAnnouncementsAction({
        data: { filterBy: filterBy.value },
        onSuccess: (payload) => setAnnouncements(payload),
        onFailed: (error) => console.error(error)
      })
    )
  }, [filterBy])

  const HornIcon = ({ color = '#334D67' }) => (
    <svg
      className="sidebar-menu-icon"
      width="24"
      height="24"
      style={{ width: 100, height: 100 }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 9.78125V5.03125C20 4.75 19.7812 4 19 4C18.75 4 18.5312 4.09375 18.375 4.25L15.6875 6.375C14.375 7.4375 12.6875 8 11 8H5C3.875 8 3 8.90625 3 10V13C3 14.125 3.875 15 5 15L4.96875 16C4.96875 17.25 5.25 18.4375 5.78125 19.4688C5.9375 19.8125 6.28125 20 6.65625 20H9.96875C10.7812 20 11.2812 19.0938 10.7812 18.4375C10.2812 17.75 9.96875 16.9375 9.96875 16C9.96875 15.6562 10.0312 15.3438 10.0938 15H11C12.6875 15 14.375 15.5938 15.6875 16.6562L18.375 18.7812C18.5312 18.9375 18.75 19 18.9688 19C19.75 19 19.9688 18.3125 19.9688 18V13.25C20.5938 12.9062 20.9688 12.25 20.9688 11.5312C21 10.7812 20.5938 10.125 20 9.78125ZM6.96875 18.5C6.625 17.7188 6.46875 16.875 6.46875 16C6.46875 15.5625 6.53125 15.2188 6.5625 15H8.59375C8.5 15.3438 8.46875 15.6875 8.46875 16C8.46875 16.9062 8.6875 17.75 9.0625 18.5H6.96875ZM10.5 13.5H5C4.71875 13.5 4.5 13.2812 4.5 13V10C4.5 9.75 4.71875 9.5 5 9.5H10.5V13.5ZM18.5 16.9688L16.625 15.5C15.3125 14.4375 13.6875 13.7812 12 13.5938V9.4375C13.6875 9.25 15.3125 8.59375 16.625 7.53125L18.5 6.0625V16.9688Z"
        fill={color}
      />
    </svg>
  )

  return (
    <div className="container">
      {showLoader && <LoadingOverlay />}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        content={confirmContent}
        onYes={handleYesAction}
      />
      <AnnouncementFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        isUpdate={isUpdate}
        initialValues={formValues}
        onSubmit={onSubmit}
      />
      <div
        className="right-container"
        style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div className="w-full justify-between" style={{ width: '98%' }}>
          <h1>Announcements</h1>
          {user?.role === 'admin' && (
            <div className="flex items-center">
              <div className="flex items-center">
                <label className="margin-t-10 margin-r-10">Filter By:</label>
                <div style={{ width: 300, marginRight: 10 }}>
                  <Select
                    styles={selectStyles}
                    defaultValue={filterBy}
                    options={[
                      {
                        label: 'Archive Announcements',
                        value: true
                      },
                      {
                        label: 'Active Announcements',
                        value: false
                      }
                    ]}
                    onChange={(selected) => {
                      setFilterBy(selected)
                    }}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsUpdate(false)
                  setShowFormModal(true)
                  setFormValues({
                    title: '',
                    content: ''
                  })
                }}
                width={80}
                height={35}
                value="Add"
              />
            </div>
          )}
        </div>
        {announcements?.length ? (
          <div
            style={{
              width: '98%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
            {announcements?.map((item) => (
              <AnnouncementMessage
                key={item.id}
                item={item}
                role={user?.role}
                onArchive={() => onArchive(item)}
                onUpdate={() => onUpdate(item)}
                onRestore={() => onRestore(item)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-panel">
            <HornIcon size={100} />
            <label className="empty-panel-label">Data is empty</label>
          </div>
        )}
      </div>
    </div>
  )
}

export default Announcements
