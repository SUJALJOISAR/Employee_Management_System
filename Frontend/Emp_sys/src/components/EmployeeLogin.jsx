import React, { useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EmployeeLogin = () => {
    const [values,setValues]=useState({
        email:"",
        password:""
    });

    const navigate=useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Ensure that both fields are filled before submitting
      if (values.email && values.password) {
        axios.post('/employee/employeelogin', {
          email: values.email,
          password: values.password
        })
        .then(result => {
          if(result.data.loginStatus){
            navigate('/employee_detail/'+result.data.id);
          }else{
            alert('Invalid Email or Password');
          }
        }
        )
        .catch((err) => console.error(err));
      } else {
        console.error("Please fill in both fields");
      }
    };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
          <div className='mb-3'>
              <label htmlFor="email"><strong>Email:</strong></label>
              <input className='form-control rounded-0'
               type="email" 
               name="email" 
               autoComplete='off' 
               placeholder='Enter Email'
               onChange={(e)=>setValues({...values,email:e.target.value})}/>
          </div>
          <div className='mb-3'>
              <label htmlFor="password"><strong>Password:</strong></label>
              <input className='form-control rounded-0' 
              type="password" 
              name="password" 
              autoComplete='off' 
              placeholder='Enter Password'
              onChange={(e)=>setValues({...values,password:e.target.value})}/>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
      </form>
    </div>
  </div>
  )
}

export default EmployeeLogin
