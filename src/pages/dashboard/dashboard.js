/* eslint-disable react/prop-types */
import AnnouncementMessage from 'components/announcement-message/AnnouncementMessage'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAnnouncementsAction } from 'redux/actions/announcement.action'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import ArrowLeftIcon from 'remixicon-react/ArrowLeftLineIcon'
import {
  getDogImpoundListAction,
  getDogsAction
} from 'redux/actions/dog.action'
import { dogOptions, orderOptions, selectStyles, userSortOptions } from 'utils/helpers'
import moment from 'moment'
import { getActivityListAction } from 'redux/actions/activities.action'
import Select from 'react-select'
import { Bar } from 'react-chartjs-2'
import { UserContext } from 'contexts/user.context'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Dashboard = () => {
  const dispatch = useDispatch()
  const [announcements, setAnnouncement] = useState([])
  const [index, setIndex] = useState(0)
  const [registeredDogs, setRegisteredDogs] = useState(0)
  const [impoundDogs, setImpoundDogs] = useState(0)
  const [claimedDogs, setClaimedDogs] = useState(0)
  const [surrenderedDogs, setSurrenderedDogs] = useState(0)
  const [adoptDogs, setAdoptDogs] = useState(0)
  const [vaccinatedDogs, setVaccinatedDogs] = useState(0)

  const { user } = useContext(UserContext)

  const [dogRecentOption, setDogRecentOption] = useState({
    label: 'Weekly',
    value: 'week'
  })

  const options = {
    scales: {
      x: {
        grid: {
          display: false
        },
        barThickness: 73
      }
    },
    scaleShowGridLines: false,
    interaction: {
      intersect: false
    },
    barPercentage: 0.6,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0])
  const [totalDogs, setTotalDogs] = useState(0)

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

  useEffect(() => {
    dispatch(
      getDogsAction({
        data: {
          emailOwner: user?.email,
          filterBy: dogOptions[0].value,
          sortBy: userSortOptions[0].value,
          order: orderOptions[0].value
        },
        onSuccess: (payload) => {
          console.log(payload)
          setVaccinatedDogs(
            payload
              ?.filter((item) => item.vaccineReceived)
              ?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setRegisteredDogs(
            payload?.filter((item) =>
              moment(item?.dateAdded?.toDate()).isSame(
                new Date(),
                dogRecentOption.value
              )
            ).length
          )
        },
        onFailure: () => {}
      })
    )

    if (user?.role === 'admin') {
      dispatch(
        getDogImpoundListAction({
          data: {
            archive: false
          },
          onSuccess: (list) => {
            const payload = list?.data
            setImpoundDogs(
              payload?.filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
            )
          },
          onFailure: () => {}
        })
      )
    }

    dispatch(
      getActivityListAction({
        data: {
          archive: false,
          emailOwner: user?.email
        },
        onSuccess: (response) => {
          setClaimedDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'claim' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setSurrenderedDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'surrender' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
          setAdoptDogs(
            response?.data
              ?.filter(
                (item) =>
                  item.type === 'adoption' &&
                  item.status === 'approved' &&
                  (user?.role === 'admin'
                    ? true
                    : user.email === item.user.email)
              )
              .filter((item) =>
                moment(item?.dateAdded?.toDate()).isSame(
                  new Date(),
                  dogRecentOption.value
                )
              ).length
          )
        },
        onFailure: () => {}
      })
    )
  }, [dogRecentOption])

  useEffect(() => {
    setChartData([
      registeredDogs,
      impoundDogs,
      surrenderedDogs,
      claimedDogs,
      adoptDogs,
      vaccinatedDogs
    ])
    setTotalDogs(
      registeredDogs +
        impoundDogs +
        surrenderedDogs +
        claimedDogs +
        adoptDogs +
        vaccinatedDogs
    )
  }, [
    registeredDogs,
    impoundDogs,
    surrenderedDogs,
    claimedDogs,
    adoptDogs,
    vaccinatedDogs
  ])

  return (
    <div className="container">
      <div className="right-container" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full" style={{ width: '98%', height: 900 }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20
            }}>
            <div>
              <div className="swipeable" style={{ width: '100%' }}>
                {index !== 0 && (
                  <ArrowLeftIcon
                    onClick={() => setIndex(index - 1)}
                    className="swipeable-arrow-l cursor-pointer"
                  />
                )}
                <AutoPlaySwipeableViews
                  style={{ width: '90%' }}
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
            </div>
          </div>
          <h1>Dog Recent Updates</h1>
          <div style={{ width: 200, marginBottom: 20 }}>
            <Select
              options={[
                { label: 'Daily', value: 'day' },
                { label: 'Weekly', value: 'week' },
                { label: 'Monthly', value: 'month' }
              ]}
              styles={selectStyles}
              value={dogRecentOption}
              onChange={(selected) => setDogRecentOption(selected)}
            />
          </div>
          <div className="flex w-full justify-between">
            {/* <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Registered Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{registeredDogs}</h1>
            </div> */}
            {user?.role !== 'admin' && (
              <div
                style={{
                  width: 200,
                  minHeight: 100,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 20,
                  marginRight: 10
                }}>
                <h5 style={{ padding: 0, margin: 0 }}>Impound Dogs</h5>
                <h1 style={{ color: '#42c2d3' }}>{impoundDogs}</h1>
              </div>
            )}
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Surrendered Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{surrenderedDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Claimed Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{claimedDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Adopt Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{adoptDogs}</h1>
            </div>
            <div
              style={{
                width: 200,
                minHeight: 100,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 20,
                marginRight: 10
              }}>
              <h5 style={{ padding: 0, margin: 0 }}>Vaccinated Dogs</h5>
              <h1 style={{ color: '#42c2d3' }}>{vaccinatedDogs}</h1>
            </div>
          </div>
          <div
            className="w-full item-center justify-center"
            style={{ marginTop: 20 }}>
            <div
              style={{
                width: '50%',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 12
              }}>
              <Bar
                data={{
                  labels: [
                    'Impound Dogs',
                    'Surrendered Dogs',
                    'Claimed Dogs',
                    'Adopt Dogs',
                    'Vaccinated Dogs'
                  ],
                  datasets: [
                    {
                      data: chartData,
                      borderWidth: 1,
                      backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ]
                    }
                  ]
                }}
                options={options}
              />
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
              <h1>Total</h1>
              <label
                style={{ color: '#42c2d3', fontSize: 80, fontWeight: 'bold' }}>
                {totalDogs}
              </label>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'justify',
                marginTop: 40,
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 12,
                height: 400,
                width: '45%',
                lineHeight: 2
              }}>
              <label
                style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
                What should I do if I see an injured stray animal?
              </label>
              <label style={{ fontSize: 14 }}>
                YOU are their best chance of survival. Calling PAWS does not
                guarantee that the animal will be rescued due to limited space
                at the shelter and not enough volunteers. Our vet can assist in
                emergency cases if the reporting citizen is willing to transport
                and foster the animal.
              </label>
            </div>
            <img
              src="assets/icons/injured.jpg"
              width="43%"
              height="400px"
              style={{
                marginTop: 40,
                padding: '20px 40px',
                borderRadius: 12
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'justify',
                marginTop: 40,
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 12,
                height: 400,
                width: '45%',
                lineHeight: 2
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
            <img
              src="assets/icons/stray.jpg"
              width="43%"
              height="400px"
              style={{
                marginTop: 40,
                padding: '20px 40px',
                borderRadius: 12
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'justify',
                marginTop: 40,
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 12,
                height: 400,
                width: '45%',
                lineHeight: 2
              }}>
              <label
                style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
                Should I feed the stray animals in my area?
              </label>
              <label style={{ fontSize: 14 }}>
                Feeding stray animals in your area may cause a surge in stray
                population within your community due to a rise in holding
                capacity. Holding capacity is the source of food that attracts
                animals to a particular area. We highly encourage you to
                consider organizing a Trap Neuter Return (TNR) program with your
                local government, as well as animal welfare organizations, to
                control the stray animal population before engaging in managed
                feeding. Managed feeding entails a designated feeder adhering to
                a fixed feeding schedule, providing just the right amount of
                food. Excess food may attract other strays from neighboring
                communities.
              </label>
            </div>
            <img
              src="assets/icons/feed.jpg"
              width="43%"
              height="400px"
              style={{
                marginTop: 40,
                padding: '20px 40px',
                borderRadius: 12
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              paddingBottom: 40
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'justify',
                marginTop: 40,
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 12,
                height: 400,
                width: '45%',
                lineHeight: 2
              }}>
              <label
                style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>
                Can you help find a home for my pet?
              </label>
              <label style={{ fontSize: 14 }}>
                Responsible pet ownership is a lifetime commitment, which is why
                we don’t take in abandoned pets. We can assist in rehoming your
                pet by advertising within our networks, NOT by admitting your
                pet at the shelter, and ONLY if conditions and qualifications
                are met.
              </label>
            </div>
            <img
              src="assets/icons/doghouse.jpg"
              width="43%"
              height="400px"
              style={{
                marginTop: 40,
                padding: '20px 40px',
                borderRadius: 12
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
