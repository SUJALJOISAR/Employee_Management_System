import React, { useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate=useNavigate();
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
      <h2 className='text-center'>Login As</h2>
       <div className='d-flex justify-content-between mt-5 mb-2'>
       <button type='button' className='btn btn-primary' onClick={()=>{navigate('/adminlogin')}}>Admin</button>
       <button type='button' className='btn btn-success'onClick={()=>{navigate('/employeelogin')}}>Employee</button>
       </div>
    </div>
  </div>
  )
}

export default Start
