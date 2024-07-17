import React from 'react'

const Button = ({label, onPress}) => {
  return (
    <div>
    <button onClick={onPress} type="button" className="text-white w-full bg-gray-800  hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
    </div>
  )
}

export default Button