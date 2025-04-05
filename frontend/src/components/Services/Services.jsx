import React from 'react'
import ServicesBox from './ServicesBox'
import './Services.css'

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const Services = () => {
  return (
    <div className='all-services'>
      <ServicesBox icon={<LocalShippingOutlinedIcon/>} title="FREE AND FAST DELIVERY" desc="Free delivery for all orders above Rs.500" />
      <ServicesBox icon={<SupportAgentOutlinedIcon/>} title="24/7 CUSTOMER SERVICE" desc="Friendly 24/7 Customer Support" />
      <ServicesBox icon={<VerifiedUserOutlinedIcon/>} title="MONEY BACK GUARANTEE" desc="We return money within 30 days" />
    </div>
  )
}

export default Services
