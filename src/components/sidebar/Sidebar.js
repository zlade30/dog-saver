import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Divider from 'components/divider/Divider'
import AvatarSelection from 'components/avatar/AvatarSelection'
import LogoutBoxRLineIcon from 'remixicon-react/LogoutBoxRLineIcon'
import Home4LineIcon from 'remixicon-react/Home4LineIcon'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import { useHistory, useLocation } from 'react-router'

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

const Sidebar = ({ user, onLogout }) => {
  const history = useHistory()
  const location = useLocation()

  const [menus, setMenus] = useState([
    {
      name: 'Home',
      color: '#334D67',
      isActive: true,
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
      name: 'Dogs',
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
      name: 'Announcements',
      color: '#334D67',
      isActive: false,
      path: '/announcements'
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

  const renderIcon = (menu) => {
    switch (menu?.name) {
      case 'Home':
        return <Home4LineIcon className="sidebar-menu-icon" size={20} />
      case 'Users':
        return <User3LineIcon className="sidebar-menu-icon" size={20} />
      case 'Dogs':
        return <DogIcon color={menu?.color} />
      case 'Dog Impound':
        return <DogIcon color={menu?.color} />
      case 'Announcements':
        return <HornIcon color={menu?.color} />
    }
    return ''
  }

  return (
    <div className="sidebar">
      <div className="logo margin-b-20">
        <img className="logo-img" src="assets/icons/dog.png" />
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
          <label className="bold">
            {`${user?.firstName || ''} 
              ${user?.lastName || ''}`}
          </label>
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
  onLogout: () => {}
}

Sidebar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
}

export default Sidebar
