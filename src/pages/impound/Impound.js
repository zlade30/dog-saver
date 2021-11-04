import DogImpoundCard from 'components/avatar/DogImpoundCard'
import Button from 'components/buttons/Button'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import AdoptModal from 'components/modal/AdoptModal'
import ClaimModal from 'components/modal/ClaimModal'
import ConfirmationModal from 'components/modal/ConfirmationModal'
import OptionModal from 'components/modal/OptionModal'
import { UserContext } from 'contexts/user.context'
import { fire } from 'firebase'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  createDogImpoundAction,
  getDogImpoundListAction,
  removeDogImpoundAction,
  updateDogImpoundAction
} from 'redux/actions/dog.action'
import { uploadDogImageAction } from 'redux/actions/utils.action'
import ImpoundForm from './ImpoundForm'
import Select from 'react-select'
import { selectStyles } from 'utils/helpers'
import ViewImpoundDogModal from 'components/modal/ViewImpoundDogModal'
import Header from 'components/headers/Header'
import InformationModal from 'components/modal/InformationModal'
import SurrenderForm from './SurrenderForm'
import { createActivityAction } from 'redux/actions/activities.action'

const DogIcon = ({ color = '#334D67' }) => (
  <svg
    className="sidebar-menu-icon"
    style={{ width: 100, height: 100 }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 7.25C21 6.5625 20.4375 6 19.75 6H18.1875V5.96875C17.9062 5.40625 17.3125 5 16.625 5H14.25C14.2188 5 14.2188 5.03125 14.1875 5.03125V5L13.3438 4.15625C13.0312 3.84375 12.5 4.0625 12.5 4.5V10H8.75C7.75 10 6.875 10.4062 6.21875 11H5.75C5.03125 11 4.5 10.4688 4.5 9.75C4.5 9.34375 4.15625 9 3.75 9C3.3125 9 3 9.34375 3 9.75C3 11.0938 3.96875 12.2188 5.21875 12.4688C5.0625 12.875 5 13.3125 5 13.75V19C5 19.5625 5.4375 20 6 20H8.5C9.03125 20 9.5 19.5625 9.5 19V16H13.5V19C13.5 19.5625 13.9375 20 14.5 20H17C17.5312 20 18 19.5625 18 19V11.5H18.25C19.75 11.5 20.9688 10.2812 21 8.75V7.25ZM16.5 12.4062V18.5H15V14.5H8V18.5H6.5V13.75C6.5 12.5312 7.5 11.5312 8.75 11.5H12.9062L16.5 12.4062ZM19.5 7.5V8.75C19.5 9.46875 18.9375 10 18.25 10H16.5V10.875L14 10.25V6.75C14 6.625 14.0938 6.5 14.25 6.5H16.625C16.7188 6.5 16.8125 6.5625 16.8438 6.65625L17.2812 7.5H19.5ZM16.5 7.5C16.5 7.25 16.25 7 16 7C15.7188 7 15.5 7.25 15.5 7.5C15.5 7.78125 15.7188 8 16 8C16.25 8 16.5 7.78125 16.5 7.5Z"
      fill={color}
    />
  </svg>
)

const Impound = () => {
  const dispatch = useDispatch()
  const initialFormValues = {
    profile: '',
    color: '',
    breed: '',
    gender: '',
    locationCaught: '',
    dateCaught: fire.firestore.Timestamp.now(),
    euthSched: fire.firestore.Timestamp.now(),
    archive: false,
    status: 'Impound',
    owner: null,
    dateAdded: fire.firestore.Timestamp.now()
  }
  const [showLoader, setShowLoader] = useState(false)
  const [dogImpoundList, setDogImpoundList] = useState([])
  const [showImpoundModal, setShowImpoundModal] = useState(false)
  const [showSurrenderModal, setShowSurrenderModal] = useState(false)
  const [dogId, setDogId] = useState(null)
  const [filterStatus, setFilterStatus] = useState({
    label: 'Active',
    value: false
  })
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false)
  const [isOpenClaimModal, setIsOpenClaimModal] = useState(false)
  const [isOpenAdoptModal, setIsOpenAdoptModal] = useState(false)
  const [isOpenViewImpoundModal, setIsOpenViewImpoundModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isArchiveClick, setIsArchiveClick] = useState(false)
  const [confirmContent, setConfirmContent] = useState('')
  const [infoContent, setInfoContent] = useState('')
  const [isShowInfoModal, setIsShowInfoModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [formValues, setFormValues] = useState(initialFormValues)

  const { user } = useContext(UserContext)

  const onRemove = (dog) => {
    setDogId(dog?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(true)
    setConfirmContent(`Are you sure you want to archive this dog?`)
  }

  const onRestore = (dog) => {
    setDogId(dog?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(false)
    setConfirmContent(`Are you sure you want to restore this dog?`)
  }

  const onSubmit = (values) => {
    setShowLoader(true)
    if (!isUpdate) {
      dispatch(
        uploadDogImageAction({
          data: { file: values?.profile },
          onSuccess: (response) => {
            if (!isUpdate) {
              dispatch(
                createDogImpoundAction({
                  data: { ...values, profile: response?.data },
                  onSuccess: async (dog) => {
                    setShowLoader(false)
                    setDogImpoundList((prevList) => [
                      { ...values, profile: response?.data, id: dog?.data },
                      ...prevList
                    ])
                    toast.success('Dog created successfully.', {
                      position: 'bottom-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined
                    })
                    setShowImpoundModal(false)
                  },
                  onFailure: () => {
                    setShowLoader(false)
                    toast.error('Dog creation failed.', {
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
          },
          onFailure: (error) => {
            setShowLoader(false)
            setErrorMsg(error)
            toast.error('User creation failed.', {
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
      if (formValues?.profile === values?.profile) {
        dispatch(
          updateDogImpoundAction({
            data: {
              id: dogId,
              values
            },
            onSuccess: () => {
              setShowLoader(false)
              setDogImpoundList((prevList) =>
                prevList?.map((item) => (item?.id === dogId ? values : item))
              )
              toast.success('Dog updated successfully.', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              })
              setShowImpoundModal(false)
            },
            onFailure: () => {
              setShowLoader(false)
              toast.error('Dog update failed.', {
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
        dispatch(
          uploadDogImageAction({
            data: { file: values?.profile },
            onSuccess: (response) => {
              if (!isUpdate) {
                dispatch(
                  createDogImpoundAction({
                    data: { ...values, profile: response?.data },
                    onSuccess: async (dog) => {
                      setShowLoader(false)
                      setDogImpoundList((prevList) => [
                        { ...values, profile: response?.data, id: dog?.data },
                        ...prevList
                      ])
                      toast.success('Dog created successfully.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                      })
                      setShowImpoundModal(false)
                    },
                    onFailure: () => {
                      setShowLoader(false)
                      toast.error('Dog creation failed.', {
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
            },
            onFailure: (error) => {
              setShowLoader(false)
              setErrorMsg(error)
              toast.error('User creation failed.', {
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
  }

  const onSurrender = (values) => {
    console.log(user)
    setShowLoader(true)
    dispatch(
      uploadDogImageAction({
        data: { file: values?.profile },
        onSuccess: (response) => {
          const profileUrl = response?.data
          dispatch(
            createActivityAction({
              data: {
                user,
                dog: { ...values, profile: profileUrl },
                status: 'pending',
                dateAdded: new Date(),
                archive: false,
                type: 'surrender'
              },
              onSuccess: async () => {
                setShowLoader(false)
                toast.success('Activity sent successfully.', {
                  position: 'bottom-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                })
                setShowImpoundModal(false)
              },
              onFailure: () => {
                setShowLoader(false)
                toast.error('Activity send failed.', {
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
        onFailure: (error) => {
          setShowLoader(false)
          setErrorMsg(error)
          toast.error('Activity send failed.', {
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

  const onSendForm = (values) => {
    const name = values.name
    const purok = values.purok
    const gender = values.gender
    const color = values.color
    const address = values.address
    const dateCaught = values.dateCaught
    const dogFoodFee = values.dogFoodFee
    const agreementFee = values.agreementFee
    const offenseFee = values.offenseFee

    if (
      name &&
      purok &&
      gender &&
      color &&
      address &&
      dateCaught &&
      dogFoodFee &&
      agreementFee &&
      offenseFee
    ) {
      dispatch(
        createActivityAction({
          data: {
            user,
            dog: {
              id: formValues?.id,
              profile: formValues?.profile,
              color: formValues?.color,
              breed: formValues?.breed,
              gender: formValues?.gender
            },
            claimForm: values,
            status: 'pending',
            dateAdded: new Date(),
            archive: false,
            type: 'claim'
          },
          onSuccess: async () => {
            setShowLoader(false)
            toast.success('Activity sent successfully.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setIsOpenClaimModal(false)
          },
          onFailure: () => {
            setShowLoader(false)
            setIsOpenClaimModal(false)
            toast.error('Activity send failed.', {
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
      toast.error('Fields must not be empty.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  const onSendAdoptForm = (values) => {
    dispatch(
      createActivityAction({
        data: {
          user,
          dog: {
            id: formValues?.id,
            profile: formValues?.profile,
            color: formValues?.color,
            breed: formValues?.breed,
            gender: formValues?.gender
          },
          adoptionForm: values,
          status: 'pending',
          dateAdded: new Date(),
          archive: false,
          type: 'adoption'
        },
        onSuccess: async () => {
          setShowLoader(false)
          toast.success('Activity sent successfully.', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          setIsOpenAdoptModal(false)
        },
        onFailure: () => {
          setShowLoader(false)
          setIsOpenAdoptModal(false)
          toast.error('Activity send failed.', {
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

  const handleYesAction = () => {
    setShowLoader(true)
    dispatch(
      removeDogImpoundAction({
        data: {
          id: dogId,
          values: {
            archive: isArchiveClick
          }
        },
        onSuccess: () => {
          setShowLoader(false)
          setDogImpoundList((prevList) =>
            prevList.filter((item) => item.id !== dogId)
          )
          toast.success(
            `Dog ${isArchiveClick ? 'archived' : 'restored'} successfully.`,
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
            `Dog ${isArchiveClick ? 'archived' : 'restored'} failed.`,
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

  const onUpdate = (dog) => {
    setDogId(dog?.id)
    setIsUpdate(true)
    setShowImpoundModal(true)
    setFormValues(dog)
  }

  const onSelect = (dog) => {
    setDogId(dog?.id)
    setFormValues(dog)
    setIsOpenOptionModal(true)
  }

  useEffect(() => {
    setShowLoader(true)
    dispatch(
      getDogImpoundListAction({
        data: {
          archive: filterStatus?.value
        },
        onSuccess: (list) => {
          setShowLoader(false)
          setDogImpoundList(list?.data)
        },
        onFailure: () => {
          setShowLoader(false)
          toast.error('Fetching list failed.', {
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
  }, [filterStatus])

  return (
    <div className="container">
      {!user && <Header />}
      {showLoader && <LoadingOverlay />}
      <ViewImpoundDogModal
        isOpen={isOpenViewImpoundModal}
        values={formValues}
        onClose={() => setIsOpenViewImpoundModal(false)}
      />
      <OptionModal
        isOpen={isOpenOptionModal}
        onClaim={() => {
          if (!user) {
            setIsOpenOptionModal(false)
            setInfoContent(
              'Before you can claim a dog! Kindly login or create an account if you wish to continue.'
            )
            setIsShowInfoModal(true)
          } else {
            setIsOpenOptionModal(false)
            setIsOpenClaimModal(true)
          }
        }}
        onAdopt={() => {
          console.log('hello')
          if (!user) {
            setIsOpenOptionModal(false)
            setInfoContent(
              'Before you can adopt a dog! Kindly login or create an account if you wish to continue.'
            )
            setIsShowInfoModal(true)
          } else {
            setIsOpenOptionModal(false)
            setIsOpenAdoptModal(true)
          }
        }}
        onView={() => {
          setIsOpenOptionModal(false)
          setIsOpenViewImpoundModal(true)
        }}
        onClose={() => setIsOpenOptionModal(false)}
      />
      <ClaimModal
        isOpen={isOpenClaimModal}
        onClose={() => setIsOpenClaimModal(false)}
        onSendForm={onSendForm}
      />
      <AdoptModal
        isOpen={isOpenAdoptModal}
        onClose={() => setIsOpenAdoptModal(false)}
        onSendForm={onSendAdoptForm}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        content={confirmContent}
        onYes={handleYesAction}
      />
      <InformationModal
        isOpen={isShowInfoModal}
        content={infoContent}
        okay={() => {
          setIsShowInfoModal(false)
        }}
      />
      <SurrenderForm
        isOpen={showSurrenderModal}
        onClose={() => setShowSurrenderModal(false)}
        initialValues={{
          profile: '',
          color: '',
          breed: '',
          gender: ''
        }}
        onSubmit={onSurrender}
      />
      <ImpoundForm
        isOpen={showImpoundModal}
        initialValues={formValues}
        onSubmit={onSubmit}
        setErrorMsg={setErrorMsg}
        onClose={() => setShowImpoundModal(false)}
        isUpdate={isUpdate}
      />
      <div className="right-container">
        <div className="w-full justify-between" style={{ width: '98%' }}>
          <h1>Dog Impound</h1>
          {user?.role === 'admin' ? (
            <div className="flex items-center">
              <div className="flex items-center">
                <label className="margin-t-10 margin-r-10">Filter By:</label>
                <div style={{ width: 150, marginRight: 10 }}>
                  <Select
                    styles={selectStyles}
                    defaultValue={filterStatus}
                    options={[
                      { label: 'Active Dogs', value: false },
                      { label: 'Archive Dogs', value: true }
                    ]}
                    onChange={(selected) => {
                      setFilterStatus(selected)
                    }}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsUpdate(false)
                  setShowImpoundModal(true)
                  setFormValues(initialFormValues)
                }}
                value="Add"
                width={80}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div
          className="user-list-panel"
          style={{
            height: user ? 'calc(100vh - 100px)' : 'calc(100vh - 150px)',
            overflow: 'hidden'
          }}>
          {dogImpoundList?.length ? (
            <div className="panel">
              {dogImpoundList?.map((item) => (
                <DogImpoundCard
                  key={item.id}
                  value={item}
                  isAdmin={user?.role === 'admin'}
                  onUpdate={() => onUpdate(item)}
                  onRemove={() => onRemove(item)}
                  onRestore={() => onRestore(item)}
                  onSelect={() => onSelect(item)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-panel">
              <DogIcon size={100} />
              <label className="empty-panel-label">Data is empty</label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Impound
