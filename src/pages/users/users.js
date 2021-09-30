import UserAvatarCard from 'components/avatar/UserAvatarCard'
import Button from 'components/buttons/Button'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import RightModal from 'components/modal/RightModal'
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
import { toBase64 } from 'utils/helpers'
import UserFillIcon from 'remixicon-react/UserFillIcon'

const Users = () => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()
  const [password, setPassword] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [userList, setUserList] = useState([])
  const [list, setList] = useState([])
  const [formValues, setFormValues] = useState()
  const [isUpdate, setIsUpdate] = useState(false)
  const [userId, setUserId] = useState()

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
            },
            onFailure: (error) => {
              setErrorMsg(error)
              setShowLoader(false)
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
              }
            })
          )
        },
        onFailure: (error) => {
          setShowLoader(false)
          setErrorMsg(error)
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
          console.log('hey', payload)
          onSendCredential({ ...values, id: payload?.data })
        },
        onFailure: (error) => {
          console.log(error)
          setShowLoader(false)
          setErrorMsg(error)
        }
      })
    )
  }

  const onSendCredential = async (values) => {
    setShowLoader(false)
    setShowFormModal(false)
    let prof = undefined
    if (profile) prof = await toBase64(profile)
    setUserList((prevList) => [
      {
        ...values,
        profile: prof,
        dateAdded: fire.firestore.Timestamp.now()
      },
      ...prevList
    ])
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
    setShowLoader(true)
    dispatch(
      adminRemoveUserAction({
        data: {
          id: user?.id,
          values: {
            archive: true
          }
        },
        onSuccess: () => {
          setShowLoader(false)
          setUserList((prevList) =>
            prevList.map((item) =>
              item?.id === user?.id ? { ...item, archive: true } : item
            )
          )
        },
        onFailure: (error) => console.error(error)
      })
    )
  }

  const onUpdate = (user) => {
    setUserId(user?.id)
    setIsUpdate(true)
    setShowFormModal(true)
    setFormValues(user)
  }

  useEffect(() => {
    setShowLoader(true)
    dispatch(
      getUserListAction({
        onSuccess: (payload) => {
          setShowLoader(false)
          setList(payload.sort((a, b) => b.dateAdded - a.dateAdded))
          setUserList(payload.sort((a, b) => b.dateAdded - a.dateAdded))
        },
        onFailure: (error) => {
          setShowLoader(false)
          console.log(error)
        }
      })
    )
  }, [])

  return (
    <div className="container">
      {showLoader && <LoadingOverlay />}
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
          <div className="justify-between" style={{ width: 480 }}>
            <SearchField
              width={320}
              id="search-name"
              name="search-name"
              placeholder="Search Name"
              onChange={(evt) => {
                evt.persist()
                setUserList((prevList) =>
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
              {userList?.map(
                (user) =>
                  !user?.archive && (
                    <UserAvatarCard
                      key={user?.id}
                      value={user}
                      onUpdate={() => onUpdate(user)}
                      onRemove={() => onRemove(user)}
                    />
                  )
              )}
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
