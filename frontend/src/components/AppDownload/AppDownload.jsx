import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <div className="app-download-text">
        <p>For a better experience,<br />download the <em>EasyFood</em> app</p>
        <span>Available on iOS &amp; Android — free to download</span>
      </div>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="Get it on Google Play" />
        <img src={assets.app_store} alt="Download on App Store" />
      </div>
    </div>
  )
}

export default AppDownload