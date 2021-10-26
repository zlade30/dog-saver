import DogAvatarCard from 'components/avatar/DogAvatarCard'
import AdoptModal from 'components/modal/AdoptModal'
import ClaimModal from 'components/modal/ClaimModal'
import OptionModal from 'components/modal/OptionModal'
import React from 'react'

const Impound = () => {
  return (
    <div className="container">
      <OptionModal isOpen={false} />
      <ClaimModal isOpen={true} />
      <AdoptModal isOpen={false} />
      <div className="right-container">
        <div className="w-full justify-between">
          <h1>Dog Impound</h1>
        </div>
        <div className="user-list-panel">
          <div className="panel">
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
            <DogAvatarCard value={{}} isImpound />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impound
