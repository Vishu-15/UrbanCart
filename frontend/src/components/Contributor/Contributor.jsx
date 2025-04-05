import React from 'react'
import "./Contributor.css"
import {Link} from 'react-router-dom'

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import contributorImage from "../../assets/images/contributor-img.png"

const Contributor = ({name,role}) => {
  return (
    <div class="contributor">
      <img src={contributorImage} alt="" />
      <div className="name">{name}</div>
      <div className="role">{role}</div>
      <div className="socials">
        <Link to="" className='social' ><TwitterIcon/></Link>
        <Link to="" className='social' ><InstagramIcon/></Link>
        <Link to="" className='social' ><LinkedInIcon/></Link>
      </div>
    </div>
  )
}

export default Contributor
