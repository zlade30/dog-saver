import UserAvatarCard from 'components/avatar/UserAvatarCard'
import Button from 'components/buttons/Button'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import RightModal from 'components/modal/RightModal'
import ConfirmationModal from 'components/modal/ConfirmationModal'
import SearchField from 'components/text-fields/SearchField'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  adminRemoveUserAction,
  adminUpdateUserAction,
  createAccountAction,
  createUserAction,
  getUserListAction,
  sendCredentialAction
} from 'redux/actions/user.action'
import { uploadUserImageAction } from 'redux/actions/utils.action'
import { fire } from 'firebase'
import {
  orderOptions,
  selectStyles,
  toBase64,
  userFilterOptions,
  userSortOptions
} from 'utils/helpers'
import UserFillIcon from 'remixicon-react/UserFillIcon'
import { toast } from 'react-toastify'
import Select from 'react-select'

const Users = () => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()
  const [password, setPassword] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmContent, setConfirmContent] = useState('')
  const [userList, setUserList] = useState([])
  const [list, setList] = useState([])
  const [formValues, setFormValues] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [userId, setUserId] = useState()
  const [filterBy, setFilterBy] = useState(userFilterOptions[0].value)
  const [sortBy, setSortBy] = useState(userSortOptions[0].value)
  const [order, setOrder] = useState(orderOptions[0].value)
  const [isArchiveClick, setIsArchiveClick] = useState(false)

  const onSubmit = (values) => {
    setShowLoader(true)
    if (!isUpdate) {
      const tempPass = (Math.random() + 1).toString(36).substring(2)

      setPassword(tempPass)
      if (String(values?.phone)?.length === 10) {
        dispatch(
          createAccountAction({
            data: {
              email: values?.email,
              password: tempPass
            },
            onSuccess: () => {
              delete values.password
              if (profile) {
                onCreateUpload({
                  ...values,
                  phone: `0${values?.phone}`
                })
              } else {
                onCreateAccount({
                  ...values,
                  phone: `0${values?.phone}`
                })
              }
            },
            onFailure: (error) => {
              setErrorMsg(error)
              setShowLoader(false)
            }
          })
        )
      } else {
        setShowLoader(false)
        setErrorMsg('Error: phone number should be 11 digits.')
      }
    } else {
      if (profile) {
        dispatch(
          uploadUserImageAction({
            data: { file: profile },
            onSuccess: (response) => {
              dispatch(
                adminUpdateUserAction({
                  data: {
                    id: userId,
                    values: {
                      ...values,
                      profile: response?.data,
                      phone: `${
                        values?.phone[0] !== 0
                          ? `0${values?.phone}`
                          : `${values?.phone}`
                      }`
                    }
                  },
                  onSuccess: () => {
                    setShowLoader(false)
                    setShowFormModal(false)
                    setUserList((prevList) =>
                      prevList?.map((item) =>
                        item?.id === userId
                          ? {
                              ...item,
                              ...values,
                              profile: response?.data,
                              phone: `${
                                values?.phone[0] !== 0
                                  ? `0${values?.phone}`
                                  : `${values?.phone}`
                              }`
                            }
                          : item
                      )
                    )
                    setList((prevList) =>
                      prevList?.map((item) =>
                        item?.id === userId
                          ? {
                              ...item,
                              ...values,
                              profile: response?.data,
                              phone: `${
                                values?.phone[0] !== 0
                                  ? `0${values?.phone}`
                                  : `${values?.phone}`
                              }`
                            }
                          : item
                      )
                    )
                    toast.success('User updated successfully.', {
                      position: 'bottom-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined
                    })
                  },
                  onFailure: (error) => {
                    setErrorMsg(error)
                    setShowLoader(false)
                  }
                })
              )
            },
            onFailure: (error) => {
              setShowLoader(false)
              setErrorMsg(error)
              toast.error('User update failed.', {
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
          adminUpdateUserAction({
            data: {
              id: userId,
              values: {
                ...values,
                phone: `${
                  values?.phone[0] !== 0
                    ? `0${values?.phone}`
                    : `${values?.phone}`
                }`
              }
            },
            onSuccess: () => {
              setShowLoader(false)
              setShowFormModal(false)
              setUserList((prevList) =>
                prevList?.map((item) =>
                  item?.id === userId
                    ? {
                        ...item,
                        ...values,
                        phone: `${
                          values?.phone[0] !== 0
                            ? `0${values?.phone}`
                            : `${values?.phone}`
                        }`
                      }
                    : item
                )
              )
              setList((prevList) =>
                prevList?.map((item) =>
                  item?.id === userId
                    ? {
                        ...item,
                        ...values,
                        phone: `${
                          values?.phone[0] !== 0
                            ? `0${values?.phone}`
                            : `${values?.phone}`
                        }`
                      }
                    : item
                )
              )
              toast.success('User updated successfully.', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
              })
            },
            onFailure: (error) => {
              setErrorMsg(error)
              setShowLoader(false)
              toast.error('User update failed.', {
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

  const onCreateUpload = (values) => {
    dispatch(
      uploadUserImageAction({
        data: { file: profile },
        onSuccess: (response) => {
          dispatch(
            createUserAction({
              data: {
                ...values,
                profile: response?.data,
                dateAdded: new Date()
              },
              onSuccess: (payload) => {
                onSendCredential({ ...values, id: payload?.data })
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

  const onCreateAccount = (values) => {
    dispatch(
      createUserAction({
        data: {
          ...values,
          dateAdded: new Date()
        },
        onSuccess: (payload) => {
          onSendCredential({ ...values, id: payload?.data })
        },
        onFailure: (error) => {
          console.log(error)
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

  const onSendCredential = async (values) => {
    setShowLoader(false)
    setShowFormModal(false)
    let prof = null
    if (profile) prof = await toBase64(profile)
    setUserList((prevList) => [
      {
        ...values,
        profile: prof,
        dateAdded: fire.firestore.Timestamp.now()
      },
      ...prevList
    ])
    toast.success('User created successfully.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    // dispatch(
    //   sendCredentialAction({
    //     data: {
    //       serviceID: 'service_asfu4ce',
    //       templateID: 'template_29ccqfk',
    //       templatePrams: {
    //         first_name: values?.firstName,
    //         last_name: values?.lastName,
    //         email: values?.email,
    //         password
    //       }
    //     },
    //     onSuccess: () => {
    //       setShowLoader(false)
    //       setShowFormModal(false)
    //       setUserList((prevList) => [
    //         ...prevList,
    //         { ...values, profile: image }
    //       ])
    //     },
    //     onFailure: (error) => {
    //       console.log(error)
    //       setShowLoader(false)
    //       setErrorMsg(error)
    //     }
    //   })
    // )
  }

  const onRemove = (user) => {
    setUserId(user?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(true)
    setConfirmContent(
      `Are you sure you want to archive ${user?.firstName} ${user?.lastName}?`
    )
  }

  const onRestore = (user) => {
    setUserId(user?.id)
    setShowConfirmModal(true)
    setIsArchiveClick(false)
    setConfirmContent(
      `Are you sure you want to restore ${user?.firstName} ${user?.lastName}?`
    )
  }

  const onUpdate = (user) => {
    setUserId(user?.id)
    setIsUpdate(true)
    setShowFormModal(true)
    setFormValues(user)
  }

  const handleYesAction = () => {
    if (isArchiveClick) {
      setShowLoader(true)
      dispatch(
        adminRemoveUserAction({
          data: {
            id: userId,
            values: {
              archive: true
            }
          },
          onSuccess: () => {
            setShowLoader(false)
            setUserList((prevList) =>
              prevList.filter((item) => item.id !== userId)
            )
            setList((prevList) => prevList.filter((item) => item.id !== userId))
            toast.success('User archived successfully.', {
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
            toast.error('User archived failed.', {
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
        adminRemoveUserAction({
          data: {
            id: userId,
            values: {
              archive: false
            }
          },
          onSuccess: () => {
            setShowLoader(false)
            setUserList((prevList) =>
              prevList.filter((item) => item.id !== userId)
            )
            setList((prevList) => prevList.filter((item) => item.id !== userId))
            toast.success('User restored successfully.', {
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
            toast.error('User restore failed.', {
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

  useEffect(() => {
    setShowLoader(true)
    dispatch(
      getUserListAction({
        data: {
          filterBy,
          sortBy,
          order,
          searchKey: 'Nara Shikamaru'
        },
        onSuccess: (payload) => {
          setShowLoader(false)
          setList(payload)
          setUserList(payload)
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
      <RightModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setProfile={setProfile}
        initialValues={formValues}
        isUpdate={isUpdate}
      />
      <div className="right-container">
        <div className="w-full justify-between">
          <h1>Users</h1>
          <div className="justify-between" style={{ width: 1050 }}>
            <div className="flex items-center">
              <label className="margin-t-10 margin-r-10">Filter By:</label>
              <Select
                styles={selectStyles}
                defaultValue={userFilterOptions[0]}
                options={userFilterOptions}
                onChange={(selected) => setFilterBy(selected.value)}
              />
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
              placeholder="Search Name"
              onChange={(evt) => {
                evt.persist()
                setUserList(() =>
                  list.filter((product) =>
                    `${product.firstName} ${product.lastName}`
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
                setFormValues()
              }}
              width={80}
              height={35}
              value="Add"
            />
          </div>
        </div>
        <div className="user-list-panel">
          {userList?.length ? (
            <div className="panel">
              {userList?.map((user) => (
                <UserAvatarCard
                  key={user?.id}
                  value={user}
                  onUpdate={() => onUpdate(user)}
                  onRemove={() => onRemove(user)}
                  onRestore={() => onRestore(user)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-panel">
              <UserFillIcon size={100} />
              <label className="empty-panel-label">Data is empty</label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
