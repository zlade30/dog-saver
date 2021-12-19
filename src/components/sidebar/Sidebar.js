import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Divider from 'components/divider/Divider'
import AvatarSelection from 'components/avatar/AvatarSelection'
import LogoutBoxRLineIcon from 'remixicon-react/LogoutBoxRLineIcon'
import DashboardLineIcon from 'remixicon-react/DashboardLineIcon'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import GovernmentLineIcon from 'remixicon-react/GovernmentLineIcon'
import HomeLineIcon from 'remixicon-react/HomeLineIcon'
import BookLine from 'remixicon-react/BookLineIcon'
import { useHistory, useLocation } from 'react-router'
import PencilLineIcon from 'remixicon-react/PencilLineIcon'
import FileLineIcon from 'remixicon-react/FileLineIcon'
import RightModal from 'components/modal/RightModal'
import { adminUpdateUserAction } from 'redux/actions/user.action'
import { useDispatch } from 'react-redux'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import { toast } from 'react-toastify'
import { uploadUserImageAction } from 'redux/actions/utils.action'

const DogIcon = ({ color = '#334D67' }) => (
  <svg
    className="sidebar-menu-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 7.25C21 6.5625 20.4375 6 19.75 6H18.1875V5.96875C17.9062 5.40625 17.3125 5 16.625 5H14.25C14.2188 5 14.2188 5.03125 14.1875 5.03125V5L13.3438 4.15625C13.0312 3.84375 12.5 4.0625 12.5 4.5V10H8.75C7.75 10 6.875 10.4062 6.21875 11H5.75C5.03125 11 4.5 10.4688 4.5 9.75C4.5 9.34375 4.15625 9 3.75 9C3.3125 9 3 9.34375 3 9.75C3 11.0938 3.96875 12.2188 5.21875 12.4688C5.0625 12.875 5 13.3125 5 13.75V19C5 19.5625 5.4375 20 6 20H8.5C9.03125 20 9.5 19.5625 9.5 19V16H13.5V19C13.5 19.5625 13.9375 20 14.5 20H17C17.5312 20 18 19.5625 18 19V11.5H18.25C19.75 11.5 20.9688 10.2812 21 8.75V7.25ZM16.5 12.4062V18.5H15V14.5H8V18.5H6.5V13.75C6.5 12.5312 7.5 11.5312 8.75 11.5H12.9062L16.5 12.4062ZM19.5 7.5V8.75C19.5 9.46875 18.9375 10 18.25 10H16.5V10.875L14 10.25V6.75C14 6.625 14.0938 6.5 14.25 6.5H16.625C16.7188 6.5 16.8125 6.5625 16.8438 6.65625L17.2812 7.5H19.5ZM16.5 7.5C16.5 7.25 16.25 7 16 7C15.7188 7 15.5 7.25 15.5 7.5C15.5 7.78125 15.7188 8 16 8C16.25 8 16.5 7.78125 16.5 7.5Z"
      fill={color}
    />
  </svg>
)

const HornIcon = ({ color = '#334D67' }) => (
  <svg
    className="sidebar-menu-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 9.78125V5.03125C20 4.75 19.7812 4 19 4C18.75 4 18.5312 4.09375 18.375 4.25L15.6875 6.375C14.375 7.4375 12.6875 8 11 8H5C3.875 8 3 8.90625 3 10V13C3 14.125 3.875 15 5 15L4.96875 16C4.96875 17.25 5.25 18.4375 5.78125 19.4688C5.9375 19.8125 6.28125 20 6.65625 20H9.96875C10.7812 20 11.2812 19.0938 10.7812 18.4375C10.2812 17.75 9.96875 16.9375 9.96875 16C9.96875 15.6562 10.0312 15.3438 10.0938 15H11C12.6875 15 14.375 15.5938 15.6875 16.6562L18.375 18.7812C18.5312 18.9375 18.75 19 18.9688 19C19.75 19 19.9688 18.3125 19.9688 18V13.25C20.5938 12.9062 20.9688 12.25 20.9688 11.5312C21 10.7812 20.5938 10.125 20 9.78125ZM6.96875 18.5C6.625 17.7188 6.46875 16.875 6.46875 16C6.46875 15.5625 6.53125 15.2188 6.5625 15H8.59375C8.5 15.3438 8.46875 15.6875 8.46875 16C8.46875 16.9062 8.6875 17.75 9.0625 18.5H6.96875ZM10.5 13.5H5C4.71875 13.5 4.5 13.2812 4.5 13V10C4.5 9.75 4.71875 9.5 5 9.5H10.5V13.5ZM18.5 16.9688L16.625 15.5C15.3125 14.4375 13.6875 13.7812 12 13.5938V9.4375C13.6875 9.25 15.3125 8.59375 16.625 7.53125L18.5 6.0625V16.9688Z"
      fill={color}
    />
  </svg>
)

const Sidebar = ({ user, onLogout, setUser }) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [profile, setProfile] = useState()
  const [showFormModal, setShowFormModal] = useState(false)
  const [userId, setUserId] = useState()
  const [showLoader, setShowLoader] = useState(false)
  const [menus, setMenus] = useState([
    {
      name: user?.role === 'admin' ? 'Overview' : 'Home',
      color: '#334D67',
      isActive: false,
      path: '/dashboard'
    },
    {
      name: 'Users',
      color: '#334D67',
      isActive: false,
      path: '/users',
      isHidden: user?.role !== 'admin'
    },
    {
      name: user?.role === 'admin' ? 'Registered Dogs' : 'My Dogs',
      color: '#334D67',
      isActive: false,
      path: '/dogs'
    },
    {
      name: 'Dog Impound',
      color: '#334D67',
      isActive: false,
      path: '/impound'
    },
    {
      name: 'Activities',
      color: '#334D67',
      isActive: false,
      path: '/activities'
    },
    {
      name: 'Announcements',
      color: '#334D67',
      isActive: false,
      path: '/announcements'
    },
    {
      name: 'Reports',
      color: '#334D67',
      isActive: false,
      path: '/reports',
      isHidden: user?.role !== 'admin'
    }
  ])

  const onSelectMenu = (menu) => {
    setMenus((prevMenus) =>
      prevMenus?.map((item) =>
        item?.name === menu?.name
          ? { ...item, isActive: true, color: '#42C2D3' }
          : { ...item, isActive: false, color: '#334D67' }
      )
    )
    history.push(menu?.path)
  }

  const onSubmit = (values) => {
    setShowLoader(true)
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
                  setUser({
                    ...values,
                    profile: response?.data,
                    phone: `${
                      values?.phone[0] !== 0
                        ? `0${values?.phone}`
                        : `${values?.phone}`
                    }`
                  })
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
            setUser({
              ...values,
              phone: `${
                values?.phone[0] !== 0
                  ? `0${values?.phone}`
                  : `${values?.phone}`
              }`
            })
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

  const onUpdate = () => {
    setUserId(user?.id)
    setShowFormModal(true)
    setFormValues({
      ...user,
      middleName: user?.middleName || '',
      suffix: user?.suffix || '',
      phone: user?.phone || '',
      address: user?.address || '',
      confirmPassword: ''
    })
  }

  const renderIcon = (menu) => {
    switch (menu?.name) {
      case 'Overview':
        return <DashboardLineIcon className="sidebar-menu-icon" size={20} />
      case 'Home':
        return <HomeLineIcon className="sidebar-menu-icon" size={20} />
      case 'Users':
        return <User3LineIcon className="sidebar-menu-icon" size={20} />
      case 'Registered Dogs':
        return <DogIcon color={menu?.color} />
      case 'Activities':
        return <BookLine className="sidebar-menu-icon" size={20} />
      case 'My Dogs':
        return <DogIcon color={menu?.color} />
      case 'Dog Impound':
        return <GovernmentLineIcon className="sidebar-menu-icon" size={20} />
      case 'Announcements':
        return <HornIcon color={menu?.color} />
      case 'Reports':
        return <FileLineIcon color={menu?.color} size={20} style={{ marginLeft: 4, marginRight: 20 }} />
    }
    return ''
  }

  return (
    <div className="sidebar">
      {showLoader && <LoadingOverlay />}
      <RightModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setProfile={setProfile}
        initialValues={formValues}
        isUpdate={true}
      />
      <div className="logo margin-b-20">
        <img className="logo-img" src="assets/icons/damilag.png" style={{ width: 50, height: 50 }} />
        BARK
      </div>
      <Divider width={290} />
      <div className="user-info-cont">
        <AvatarSelection
          width={60}
          height={60}
          src={user?.profile}
          isClickable={false}
        />
        <div className="user-info">
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <label className="bold">
              {`${user?.firstName || ''} 
                ${user?.lastName || ''}`}
            </label>
            <PencilLineIcon
              style={{ cursor: 'pointer' }}
              onClick={onUpdate}
              size={20}
              color="#42C2D3"
            />
          </div>
          <label>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </label>
        </div>
      </div>
      <div onClick={onLogout} className="logout-cont cursor-pointer">
        <label className="margin-r-10 cursor-pointer">Logout</label>
        <LogoutBoxRLineIcon size={15} />
      </div>
      <Divider width={290} />
      <div className="sidebar-menu-cont">
        {menus.map(
          (menu) =>
            !menu?.isHidden && (
              <div
                key={menu?.name}
                className="sidebar-menu"
                style={{
                  backgroundColor: location.pathname === menu.path && '#F4F6FA',
                  color: location.pathname === menu.path ? '#42C2D3' : '#334D67'
                }}
                onClick={() => onSelectMenu(menu)}>
                {renderIcon(menu)}
                <label className="cursor-pointer">{menu?.name}</label>
              </div>
            )
        )}
      </div>
    </div>
  )
}

Sidebar.defaultProps = {
  user: {},
  onLogout: () => {},
  setUser: () => {}
}

Sidebar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  setUser: PropTypes.func
}

export default Sidebar
