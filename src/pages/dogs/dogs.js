import Button from 'components/buttons/Button'
import LoadingOverlay from 'components/loading-overlays/LoadingOverlay'
import RightModal from 'components/modal/RightModal'
import ConfirmationModal from 'components/modal/ConfirmationModal'
import SearchField from 'components/text-fields/SearchField'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import UserFillIcon from 'remixicon-react/UserFillIcon'
import Select from 'react-select'
import DogAvatarCard from 'components/avatar/DogAvatarCard'
import {
  dogFilterOptions,
  orderOptions,
  selectStyles,
  userSortOptions
} from 'utils/helpers'

const Dogs = () => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmContent, setConfirmContent] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formValues, setFormValues] = useState()
  const [profile, setProfile] = useState(null)
  const [filterBy, setFilterBy] = useState(dogFilterOptions[0].value)
  const [sortBy, setSortBy] = useState(userSortOptions[0].value)
  const [order, setOrder] = useState(orderOptions[0].value)
  const [dogList, setDogList] = useState([])

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

  const handleYesAction = () => {}

  const onSubmit = () => {}

  const onUpdate = () => {}

  const onRemove = () => {}

  const onRestore = () => {}
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
        initialValues={formValues}
        isUpdate={isUpdate}
      />
      <div className="right-container">
        <div className="w-full justify-between">
          <h1>Dogs</h1>
          <div className="justify-between" style={{ width: 1050 }}>
            <div className="flex items-center">
              <label className="margin-t-10 margin-r-10">Filter By:</label>
              <div style={{ width: 150 }}>
                <Select
                  styles={selectStyles}
                  defaultValue={dogFilterOptions[0]}
                  options={dogFilterOptions}
                  onChange={(selected) => setFilterBy(selected.value)}
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
                // setUserList(() =>
                //   list.filter((product) =>
                //     `${product.firstName} ${product.lastName}`
                //       .toLowerCase()
                //       .includes(evt?.target?.value?.toLowerCase())
                //   )
                // )
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
          {dogList?.length ? (
            <div className="panel">
              {dogList?.map((user) => (
                <DogAvatarCard
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
              <DogIcon size={100} />
              <label className="empty-panel-label">Data is empty</label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dogs
