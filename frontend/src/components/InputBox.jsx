import React from 'react'

const InputBox = ({ label, placeHolder, onChange}) => {
  return (
    <div>
        <div className='text-left text-sm font-medium py-2' htmlFor='inputBox'>{label}</div>
        <input onChange={onChange} className='w-full px-2 py-1 border rounded-md' id="inputBox" placeholder={placeHolder}></input>
    </div>
  )
}

export default InputBox