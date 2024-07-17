import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({ label, buttonText, to}) => {

  return (
    <div className='py-2 text-sm flex gap-1 justify-center'>
       <div>{label}</div>
       <Link className='underline cursor-pointer hover:text-blue-600' to={to}>{buttonText}</Link>
    </div>
  )
}

export default BottomWarning