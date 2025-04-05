import React from 'react'
import './HomeBanner.css'

import bannerImg from '../../assets/images/home-jumbo-laptop.png'

const HomeBanner = () => {
  return (
    <div className='banner'>
      <div className="banner-txt">
        <div className='banner-smtxt'>Mega Sale Active Now</div>
        <div className='banner-lgtxt'>Upto 50% Off</div>
        <div className='banner-lgtxt'>StoreWide</div>
        <div className='banner-smtxt shop-now'>Shop Now</div>
      </div>
      <div className="banner-img">
        <img src={bannerImg} alt="" />
      </div>
    </div>
  )
}

export default HomeBanner
