import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ responseMessage, setResponseMessage ] = useState('');
  const navigate = useNavigate();

   // code to remove the message after 3 seconds
   useEffect(() => {
    if(responseMessage !== ''){

      let timeOut = setTimeout(() => {
        setResponseMessage('');
      }, 2000)

      return () => {
        clearTimeout(timeOut);
      }
    }
  })

  const handleSubmit = async () => {
    try {
      console.log("Hello from handle submit");
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName,
        lastName,
        username,
        password,
      });
      console.log(response)
      localStorage.setItem("token", response.data.token);
      setResponseMessage(response.data.message);
      if(response.data.success){
        navigate(`/dashboard/${firstName}`)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setResponseMessage(error.response.data.message);
    }

  };

  return (
    <div className='bg-slate-300 h-screen flex items-center justify-center'>
        <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-80 p-2 h-max px-4 text-center'>
                <div className='py-2'>
                  <Header label={"Sign Up"}/>
                </div>
                <SubHeading label={"Enter your information to create account"}/>
                <InputBox onChange={e => setFirstName(e.target.value)} label={"First Name"} placeHolder="John"/>
                <InputBox onChange={e => setLastName(e.target.value)} label={"Last Name"} placeHolder="Doe"/>
                <InputBox onChange={e => setUsername(e.target.value)} label={"E mail"} placeHolder="example@gmail.com"/>
                <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeHolder="Password"/>
                <div className='pt-4'>
                  <Button onPress={handleSubmit} label={"Sign Up"}></Button>
                  <div className='text-sm text-red-600'>{responseMessage}</div>
                </div>
                <BottomWarning label={"Already have an Account?"} buttonText={"Sign In"} to={"/signin"}/>

                </div>
        </div>
    </div>
  )
}

export default SignUp