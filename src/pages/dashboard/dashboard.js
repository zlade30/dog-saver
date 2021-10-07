import React, { useContext, useEffect, useState } from 'react'
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import ArrowLeftIcon from 'remixicon-react/ArrowLeftLineIcon'
import Divider from 'components/divider/Divider'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import UserAvatarCard from 'components/avatar/UserAvatarCard'
import DogAvatarCard from 'components/avatar/DogAvatarCard'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUserListAction } from 'redux/actions/user.action'
import { UserContext } from 'contexts/user.context'
import {
  dogOptions,
  orderOptions,
  userFilterOptions,
  userSortOptions
} from 'utils/helpers'
import { getDogsAction } from 'redux/actions/dog.action'
import UserLineIcon from 'remixicon-react/UserLineIcon'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Dashboard = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [index, setIndex] = useState(0)
  const [userList, setUserList] = useState([])
  const [dogList, setDogList] = useState([])

  const { user } = useContext(UserContext)

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  const [announcements, setAnnouncements] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

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

  const DogIcon2 = ({ color = '#334D67' }) => (
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

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(
        getUserListAction({
          data: {
            filterBy: userFilterOptions[0].value,
            sortBy: userSortOptions[0].value,
            order: orderOptions[0].value
          },
          onSuccess: (payload) => {
            setUserList(payload)
          },
          onFailure: (error) => {
            console.log(error)
          }
        })
      )
    }

    dispatch(
      getDogsAction({
        data: {
          emailOwner: user?.email,
          filterBy: dogOptions[0].value,
          sortBy: userSortOptions[0].value,
          order: orderOptions[0].value
        },
        onSuccess: (payload) => {
          setDogList(payload)
        },
        onFailure: (error) => {
          console.log(error)
        }
      })
    )
  }, [])

  return (
    <div className="container">
      <div className="right-container">
        <h1>Announcements</h1>
        <div className="swipeable">
          {index !== 0 && (
            <ArrowLeftIcon
              onClick={() => setIndex(index - 1)}
              className="swipeable-arrow-l cursor-pointer"
            />
          )}
          <AutoPlaySwipeableViews
            style={{ width: '80%' }}
            interval={5000}
            index={index}
            onChangeIndex={handleChangeIndex}>
            {announcements.map((item) => (
              <AnnouncementMessage key={item} />
            ))}
          </AutoPlaySwipeableViews>
          {index !== announcements?.length - 1 && (
            <ArrowLeftIcon
              onClick={() => setIndex(index + 1)}
              className="swipeable-arrow-r cursor-pointer"
            />
          )}
          <div className="swipeable-dots-cont">
            {announcements.map((item, i) => (
              <div
                key={item}
                onClick={() => setIndex(i)}
                className="swipeable-dots"
                style={{ backgroundColor: i === index ? 'white' : '' }}
              />
            ))}
          </div>
        </div>
        <div className="flex">
          {user?.role === 'admin' ? (
            <div style={{ width: '50%', marginTop: 10 }}>
              <h1>Users</h1>
              <div className="card">
                <div className="card-header">
                  <User3LineIcon className="sidebar-menu-icon" size={20} />
                  <label>New Users</label>
                </div>
                <Divider width="95%" />
                {userList?.length ? (
                  <div className="avatar-container">
                    {userList?.slice(0, 3)?.map((item) => (
                      <UserAvatarCard
                        key={item?.id}
                        value={item}
                        isShowAction={false}
                      />
                    ))}
                    {userList?.length ? (
                      <ArrowLeftIcon
                        onClick={() => history.push('/users')}
                        className="usercard-arrow-r cursor-pointer"
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                ) : (
                  <div className="empty-panel">
                    <UserLineIcon size={80} />
                    <label className="empty-panel-label">Data is empty</label>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div />
          )}
          <div
            style={{
              width: user?.role === 'admin' ? '50%' : '100%',
              marginTop: 10
            }}>
            <h1>{user?.role === 'admin' ? 'Dogs' : 'My Dogs'}</h1>
            <div
              className="card"
              style={{ width: user?.role === 'admin' ? '' : '100%' }}>
              <div className="card-header">
                <DogIcon />
                <label>New Dogs</label>
              </div>
              <Divider width={user?.role === 'admin' ? '95%' : '98%'} />
              {dogList?.length ? (
                <div className="avatar-container">
                  {dogList
                    ?.slice(0, user?.role === 'admin' ? 3 : 6)
                    ?.map((item) => (
                      <DogAvatarCard
                        key={item?.id}
                        value={item}
                        isShowAction={false}
                      />
                  ))}
                  {dogList?.length ? (
                    <ArrowLeftIcon
                      onClick={() => history.push('/users')}
                      className="usercard-arrow-r cursor-pointer"
                    />
                  ) : (
                    <div />
                  )}
                </div>
              ) : (
                <div className="empty-panel">
                  <DogIcon2 />
                  <label className="empty-panel-label">Data is empty</label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
