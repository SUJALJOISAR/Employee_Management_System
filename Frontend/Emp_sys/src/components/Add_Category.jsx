import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_Category = () => {
  const [category,setCategory]=useState();
  const navigate=useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(category){
      axios.post('/add_category',{category:category})
      .then(result => {
        if(result.data.Status){
          navigate('/dashboard/category')
      }else{
        alert(result.data.Error);
      }
    })
      .catch(err=>console.error(err));
    }
   
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
          <div className='mb-3'>
              <label htmlFor="category"><strong>Category:</strong></label>
              <input className='form-control rounded-0'
               type="text" 
               name="category" 
               autoComplete='off' 
               placeholder='Enter Category'
               onChange={(e)=>setCategory(e.target.value)}/>
          </div>
          <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Category</button>
      </form>
    </div>
  </div>
  )
}

export default Add_Category
