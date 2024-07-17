import React, { useEffect } from 'react';
import Header from '../components/Header';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setResponseMessage(response.data.message);
      if (response.data.success) {
        navigate(`/dashboard/${response.data.firstName}`);
      }
    } catch (error) {
      setResponseMessage(error.response.data.message); // Set error response message from backend
    }
  };

  return (
    <div className='bg-slate-300 h-screen flex items-center justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 p-2 h-max px-4 text-center'>
          <div className='py-2'>
            <Header label={'Sign In'} />
          </div>
          <SubHeading label={'Enter your credentials to access your account'} />
          <InputBox
            onChange={e => setUsername(e.target.value)}
            label={'E mail'}
            placeHolder='example@gmail.com'
          />
          <InputBox
            onChange={e => setPassword(e.target.value)}
            label={'Password'}
            placeHolder='Password'
          />
          <div className='pt-4'>
            <Button onPress={handleSubmit} label={'Sign In'} />
            <div className='text-sm text-red-600'>{responseMessage}</div>
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={'Sign Up'} to={'/signup'} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
