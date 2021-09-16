import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <Loader type="ThreeDots" color="#42C2D3" height={100} width={100} />
    </div>
  )
}

export default LoadingOverlay
