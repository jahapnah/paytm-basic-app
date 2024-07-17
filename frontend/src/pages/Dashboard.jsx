import React from 'react'
import { Users } from '../components/Users'
import { Balance } from '../components/Balance'
import { Appbar } from '../components/Appbar'
import { useParams } from 'react-router-dom'

const dashboard = () => {
  const { firstName } = useParams();
  
  return (
    <div>
      <Appbar firstName={firstName}/>
      <div className='m-8'>
        <Balance value={"10,000"}/>
        <Users/>
      </div>
    </div>
  )
}

export default dashboard