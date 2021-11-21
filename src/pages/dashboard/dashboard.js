/* eslint-disable react/prop-types */
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAnnouncementsAction } from 'redux/actions/announcement.action'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import ArrowLeftIcon from 'remixicon-react/ArrowLeftLineIcon'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Dashboard = () => {
  const dispatch = useDispatch()
  const [announcements, setAnnouncement] = useState([])
  const [index, setIndex] = useState(0)

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

  useEffect(() => {
    dispatch(
      getAnnouncementsAction({
        onSuccess: (payload) => setAnnouncement(payload.slice(0, 5)),
        onFailed: (error) => console.error(error)
      })
    )
  }, [])

  return (
    <div className="container">
      <div className="right-container" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full" style={{ width: '98%', height: 900 }}>
          <h1>Recent Announcement</h1>
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
                <AnnouncementMessage key={item} item={item} role="user" />
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'justify',
              marginTop: 40,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12
            }}>
            <label
              style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
              What should I do if I see an injured stray animal?
            </label>
            <label style={{ fontSize: 14 }}>
              YOU are their best chance of survival. Calling PAWS does not
              guarantee that the animal will be rescued due to limited space at
              the shelter and not enough volunteers. Our vet can assist in
              emergency cases if the reporting citizen is willing to transport
              and foster the animal.
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'justify',
              marginTop: 10,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12
            }}>
            <label
              style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
              What can I do about stray dogs in my neighborhood?
            </label>
            <label style={{ fontSize: 14 }}>
              Dogs multiply very quickly when they are not spayed/neutered
              (kapon). They will multiply even more if there is food source
              within a community (holding capacity). Both of them can be
              addressed with proper TNR or Trap, Neuter, Return.
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'justify',
              marginTop: 10,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12
            }}>
            <label
              style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
              Should I feed the stray animals in my area?
            </label>
            <label style={{ fontSize: 14 }}>
              Feeding stray animals in your area may cause a surge in stray
              population within your community due to a rise in holding
              capacity. Holding capacity is the source of food that attracts
              animals to a particular area. We highly encourage you to consider
              organizing a Trap Neuter Return (TNR) program with your local
              government, as well as animal welfare organizations, to control
              the stray animal population before engaging in managed feeding.
              Managed feeding entails a designated feeder adhering to a fixed
              feeding schedule, providing just the right amount of food. Excess
              food may attract other strays from neighboring communities.
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'justify',
              marginTop: 10,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12
            }}>
            <label
              style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
              Can you help find a home for my pet?
            </label>
            <label style={{ fontSize: 14 }}>
              Responsible pet ownership is a lifetime commitment, which is why
              we don’t take in abandoned pets. We can assist in rehoming your
              pet by advertising within our networks, NOT by admitting your pet
              at the shelter, and ONLY if conditions and qualifications are met.
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
