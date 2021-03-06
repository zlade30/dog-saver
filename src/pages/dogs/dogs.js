import Button from 'components/buttons/Button'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import ConfirmationModal from 'components/modal/ConfirmationModal'
import SearchField from 'components/text-fields/SearchField'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import DogAvatarCard from 'components/avatar/DogAvatarCard'
import {
  dogOptions,
  orderOptions,
  selectStyles,
  toBase64,
  userSortOptions
} from 'utils/helpers'
import { UserContext } from 'contexts/user.context'
import {
  createDogAction,
  getDogsAction,
  removeDogAction,
  updateDogAction
} from 'redux/actions/dog.action'
import { toast } from 'react-toastify'
import { uploadDogImageAction } from 'redux/actions/utils.action'
import { fire } from 'firebase'
import DogForm from './DogForm'
import SurrenderForm from './SurrenderForm'
import { createActivityAction } from 'redux/actions/activities.action'
import DogImagesModal from 'components/modal/DogImagesModal'
import InformationModal from 'components/modal/InformationModal'
import ViewDogImagesModal from 'components/modal/ViewDogImagesModal'
import ViewImpoundDogModal from 'components/modal/ViewImpoundDogModal'
import ViewDogModal from 'components/modal/ViewDogModal'
import PrivacyPolicyModal from 'components/modal/PrivacyPolicyModal'
import SurrenderModal from 'components/modal/SurrenderModal'
import PrinterLineIcon from 'remixicon-react/PrinterLineIcon'
import Pdf from 'react-to-pdf'
import DogReport from './DogReport'

const Dogs = () => {
  const dispatch = useDispatch()
  const initialFormValues = {
    owner: '',
    ownerAddress: '',
    name: '',
    profile: [],
    color: '',
    birthday: '',
    breed: '',
    gender: '',
    spayed: false,
    vaccineReceived: '',
    vaccineDate: fire.firestore.Timestamp.now(),
    dateAdded: fire.firestore.Timestamp.now(),
    archive: false
  }
  const [showViewDogImagesModal, setShowViewDogImagesModal] = useState(false)
  const [showDogImagesModal, setShowDogImagesModal] = useState(false)
  const [dogImage1, setDogImage1] = useState()
  const [dogImage2, setDogImage2] = useState()
  const [dogImage3, setDogImage3] = useState()
  const [dogImage4, setDogImage4] = useState()
  const [showLoader, setShowLoader] = useState(false)
  const [isSurrender, setIsSurrender] = useState(false)
  const [isOpenViewImpoundModal, setIsOpenViewImpoundModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmContent, setConfirmContent] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [profile, setProfile] = useState(null)
  const [filterBy, setFilterBy] = useState(dogOptions[0].value)
  const [sortBy, setSortBy] = useState(userSortOptions[0].value)
  const [order, setOrder] = useState(orderOptions[0].value)
  const [dogList, setDogList] = useState([])
  const [list, setList] = useState([])
  const [dogId, setDogId] = useState('')
  const [isArchiveClick, setIsArchiveClick] = useState(false)
  const [selDogOption, setSelDogOption] = useState(dogOptions[0])
  const [checkPP, setCheckPP] = useState(false)
  const [showPP, setShowPP] = useState(false)
  const [surrenderValue, setSurrenderValue] = useState()
  const [surrenderModal, setSurrenderModal] = useState(false)
  const ref = createRef()

  const { user } = useContext(UserContext)

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

  const handleYesAction = () => {
    if (isArchiveClick) {
      setShowLoader(true)
      dispatch(
        removeDogAction({
          data: {
            id: dogId,
            values: {
              archive: true
            }
          },
          onSuccess: () => {
            setShowLoader(false)
            setDogList((prevList) =>
              prevList.filter((item) => item.id !== dogId)
            )
            setList((prevList) => prevList.filter((item) => item.id !== dogId))
            toast.success('Dog archived successfully.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setShowConfirmModal(false)
          },
          onFailure: (error) => {
            toast.error('Dog archived failed.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            console.error(error)
            setShowConfirmModal(false)
          }
        })
      )
    } else {
      setShowLoader(true)
      dispatch(
        removeDogAction({
          data: {
            id: dogId,
            values: {
              archive: false
            }
          },
          onSuccess: () => {
            setShowLoader(false)
            setDogList((prevList) =>
              prevList.filter((item) => item.id !== dogId)
            )
            setList((prevList) => prevList.filter((item) => item.id !== dogId))
            toast.success('Dog restored successfully.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            setShowConfirmModal(false)
          },
          onFailure: (error) => {
            toast.error('Dog restore failed.', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            console.error(error)
            setShowConfirmModal(false)
          }
        })
      )
    }
  }

  const onSubmit = async (values) => {
    setShowLoader(true)
    if (!isUpdate) {
      dispatch(
        createDogAction({
          data: values,
          onSuccess: async (response) => {
            setShowLoader(false)
            setDogList((prevList) => [
              { ...values, id: response?.id, profile: response?.profile },
              ...prevList
            ])
            setList((prevList) => [
              { ...values, id: response?.id, profile: response?.profile },
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
            setShowFormModal(false)
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
    } else {
      dispatch(
        updateDogAction({
          data: {
            id: dogId,
            values
          },
          onSuccess: (profiles) => {
            setShowLoader(false)
            setDogList((prevList) =>
              prevList?.map((item) =>
                item?.id === dogId ? { ...values, profile: profiles } : item
              )
            )
            setList((prevList) =>
              prevList?.map((item) =>
                item?.id === dogId ? { ...values, profile: profiles } : item
              )
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
            setShowFormModal(false)
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
    }
    // ----------------------
    // let payload = values
    // if (profile) payload = { ...values, profile }
    // if (euthSched && values.status.value === 'Euthanasia')
    //   payload = { ...values, euthSched }
    // console.log(payload)

    // setShowLoader(true)

    // if (profile) {
    //   dispatch(
    //     uploadDogImageAction({
    //       data: { file: profile },
    //       onSuccess: (response) => {
    //         if (!isUpdate) addDog(response?.data, payload)
    //         else updateDog(response?.data, payload)
    //       },
    //       onFailure: (error) => {
    //         setShowLoader(false)
    //         setErrorMsg(error)
    //         toast.error('User creation failed.', {
    //           position: 'bottom-right',
    //           autoClose: 3000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined
    //         })
    //       }
    //     })
    //   )
    // } else {
    //   if (!isUpdate) addDog(null, payload)
    //   else updateDog(values?.profile || null, payload)
    // }
  }

  const addDog = (url, payload) => {
    dispatch(
      createDogAction({
        data: url
          ? { ...payload, profile: url, dateAdded: new Date() }
          : { ...payload, dateAdded: new Date() },
        onSuccess: async (response) => {
          setShowLoader(false)
          console.log(response)
          let prof = null
          if (profile) prof = await toBase64(profile)
          setDogList((prevList) => [
            {
              ...payload,
              id: response,
              profile: prof,
              dateAdded: fire.firestore.Timestamp.now()
            },
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
          setShowFormModal(false)
        },
        onFailure: (error) => {
          console.log(error)
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

  const updateDog = (url, payload) => {
    dispatch(
      updateDogAction({
        data: {
          id: dogId,
          values: url ? { ...payload, profile: url } : payload
        },
        onSuccess: async (response) => {
          setShowLoader(false)
          console.log(response)
          setDogList((prevList) =>
            prevList?.map((item) =>
              item?.id === dogId ? { ...item, ...payload, profile: url } : item
            )
          )
          setList((prevList) =>
            prevList?.map((item) =>
              item?.id === dogId ? { ...item, ...payload, profile: url } : item
            )
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
          setShowFormModal(false)
        },
        onFailure: (error) => {
          console.log(error)
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

  const onUpdate = (dog) => {
    console.log(dog)
    setDogId(dog?.id)
    setIsUpdate(true)
    setShowFormModal(true)
    setFormValues({
      ...dog,
      name: ''
    })
  }

  const onRemove = (dog) => {
    setDogId(dog?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(true)
    setConfirmContent(`Are you sure you want to archive ${dog?.name}?`)
  }

  const onRestore = (dog) => {
    setDogId(dog?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(false)
    setConfirmContent(`Are you sure you want to restore ${dog?.name}?`)
  }

  const onView = (dog) => {
    setDogId(dog?.id)
    setFormValues(dog)
    setIsOpenViewImpoundModal(true)
  }

  const onSurrender = (values) => {
    console.log(values)
    console.log(surrenderValue)
    setShowLoader(true)
    dispatch(
      createActivityAction({
        data: {
          user,
          dog: {
            id: surrenderValue?.id,
            profile: surrenderValue?.profile,
            color: surrenderValue?.color,
            breed: surrenderValue?.breed,
            gender: surrenderValue?.gender,
            birthday: surrenderValue?.birthday
          },
          reason: surrenderValue.reason,
          surrender: values,
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
          setSurrenderModal(false)
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
  }

  useEffect(() => {
    setShowLoader(true)
    dispatch(
      getDogsAction({
        data: {
          emailOwner: user?.email,
          filterBy,
          sortBy,
          order
        },
        onSuccess: (payload) => {
          setShowLoader(false)
          setList(payload)
          setDogList(payload)
        },
        onFailure: (error) => {
          setShowLoader(false)
          toast.error('Retrieving user list failed.', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          console.log(error)
        }
      })
    )
  }, [filterBy, sortBy, order])

  return (
    <div className="container">
      {showLoader && <LoadingOverlay />}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        content={confirmContent}
        onYes={handleYesAction}
      />
      <SurrenderForm
        isOpen={isSurrender}
        onClose={() => setIsSurrender(false)}
        dogList={dogList}
        initialValues={{
          profile: '',
          color: '',
          breed: '',
          birthday: '',
          gender: '',
          reason: ''
        }}
        onSubmit={(values) => {
          setSurrenderValue(values)
          setSurrenderModal(true)
          setIsSurrender(false)
        }}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
        checkPP={checkPP}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setShowPP={setShowPP}
        setCheckPP={setCheckPP}
      />
      <DogForm
        isOpen={showFormModal}
        initialValues={formValues}
        onSubmit={onSubmit}
        setErrorMsg={setErrorMsg}
        onClose={() => setShowFormModal(false)}
        isUpdate={isUpdate}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowDogImagesModal={setShowDogImagesModal}
        checkPP={checkPP}
        errorMsg={errorMsg}
        setShowPP={setShowPP}
        setCheckPP={setCheckPP}
      />
      <DogImagesModal
        onSave={() => {
          setFormValues({
            ...formValues,
            profile: [dogImage1, dogImage2, dogImage3, dogImage4]
          })
          setShowDogImagesModal(false)
        }}
        dogImage1={dogImage1}
        dogImage2={dogImage2}
        dogImage3={dogImage3}
        dogImage4={dogImage4}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        isOpen={showDogImagesModal}
        onClose={() => setShowDogImagesModal(false)}
      />
      <ViewDogModal
        isOpen={isOpenViewImpoundModal}
        values={formValues}
        onClose={() => setIsOpenViewImpoundModal(false)}
        setDogImage1={setDogImage1}
        setDogImage2={setDogImage2}
        setDogImage3={setDogImage3}
        setDogImage4={setDogImage4}
        setShowViewDogImagesModal={setShowViewDogImagesModal}
      />
      <ViewDogImagesModal
        dogImage1={dogImage1}
        dogImage2={dogImage2}
        dogImage3={dogImage3}
        dogImage4={dogImage4}
        isOpen={showViewDogImagesModal}
        onClose={() => setShowViewDogImagesModal(false)}
      />
      <SurrenderModal
        isOpen={surrenderModal}
        onClose={() => setSurrenderModal(false)}
        onSendForm={onSurrender}
      />
      <PrivacyPolicyModal isOpen={showPP} onClose={() => setShowPP(false)} />
      <div className="right-container">
        <div className="w-full justify-between" style={{ width: '98%' }}>
          <h1>{user?.role === 'admin' ? 'Registered Dogs' : 'My Dogs'}</h1>
          <div
            className="justify-between"
            style={{
              width: user?.role === 'admin' ? 1150 : 1300
            }}>
            <div className="flex items-center">
              <label className="margin-t-10 margin-r-10">Filter By:</label>
              <div style={{ width: 150 }}>
                <Select
                  styles={selectStyles}
                  defaultValue={dogOptions[0]}
                  options={dogOptions}
                  onChange={(selected) => {
                    setSelDogOption(selected.value)
                    setFilterBy(selected.value)
                  }}
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="margin-t-10 margin-r-10">Sort By:</label>
              <Select
                className="margin-r-10"
                styles={selectStyles}
                defaultValue={userSortOptions[0]}
                options={userSortOptions}
                onChange={(selected) => setSortBy(selected.value)}
              />
              <Select
                styles={selectStyles}
                defaultValue={orderOptions[0]}
                options={orderOptions}
                onChange={(selected) => setOrder(selected.value)}
              />
            </div>
            <SearchField
              width={320}
              id="search-name"
              name="search-name"
              placeholder="Search Dog"
              onChange={(evt) => {
                evt.persist()
                setDogList(() =>
                  list.filter(
                    (product) =>
                      `${product.name}`
                        .toLowerCase()
                        .includes(evt?.target?.value?.toLowerCase()) ||
                      `${product.owner.label}`
                        .toLowerCase()
                        .includes(evt?.target?.value?.toLowerCase())
                  )
                )
              }}
            />
            <Button
              onClick={() => {
                setIsUpdate(false)
                setShowFormModal(true)
                setProfile(null)
                if (user?.role === 'admin') setFormValues(initialFormValues)
                else {
                  setFormValues({
                    ...initialFormValues,
                    owner: {
                      label: `${user?.firstName} ${user?.lastName}`,
                      value: user
                    }
                  })
                }
              }}
              width={80}
              height={35}
              value="Add"
            />
            {user?.role === 'user' && (
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    setIsSurrender(true)
                  }}
                  value="Surrender"
                  width={80}
                  height={35}
                />
              </div>
            )}
            <Pdf targetRef={ref} filename="registered-dogs.pdf">
              {({ toPdf }) => (
                <Button
                  onClick={toPdf}
                  width={80}
                  height={35}
                  value="Print"
                  showIcon
                />
              )}
            </Pdf>
          </div>
        </div>
        <div className="user-list-panel">
          {dogList?.length ? (
            <div className="panel">
              {dogList?.map((user) => (
                <DogAvatarCard
                  key={user?.id}
                  value={user}
                  onClickImage={() => {
                    setDogImage1(user.profile[0])
                    setDogImage2(user.profile[1])
                    setDogImage3(user.profile[2])
                    setDogImage4(user.profile[3])
                    setShowViewDogImagesModal(true)
                  }}
                  onUpdate={() => onUpdate(user)}
                  onRemove={() => onRemove(user)}
                  onRestore={() => onRestore(user)}
                  onView={() => onView(user)}
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
        <DogReport ref={ref} props={dogList} />
      </div>
    </div>
  )
}

export default Dogs
