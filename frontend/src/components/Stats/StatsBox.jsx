import React from 'react'
import "./StatsBox.css"
import StatsLogo from "./StatsLogo.jsx"

const StatsBox = ({icon,title,description,isActive}) => {
  return (
    <div className={isActive==="true"?'each-stat stat-active':'each-stat'}>
      <StatsLogo>
            <span className="inner">
                <p className="logo">{icon}</p>
            </span>
      </StatsLogo>
        <div className='title'>{title}</div>
        <div className='description'>{description}</div>
    </div>
  )
}

export default StatsBox