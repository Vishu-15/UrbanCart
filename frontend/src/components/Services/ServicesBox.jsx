import React from 'react'
import './ServicesBox.css'
import StatsLogo from '../Stats/StatsLogo'

const ServicesBox = ({icon,title,desc}) => {
  return (
    <div className='each-service'>
      <StatsLogo>
        <span className="inner">
            <p className='icon'>{icon}</p>
        </span>
      </StatsLogo>
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
    </div>
  )
}

export default ServicesBox
