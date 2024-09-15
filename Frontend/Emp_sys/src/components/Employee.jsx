import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employee = () => {

  const [employee,setEmployee]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
     axios.get('/employee')
     .then((result)=>{
      if(result.data.Status){
        setEmployee(result.data.Result);
      }else{
        alert(result.data.Error);
      }
     })
     .catch((err)=>console.log(err));
  },[]);


  const handleDelete = (id)=>{
    axios.delete('/delete_employee/'+id)
    .then((result)=>{
      if(result.data.Status){
        window.location.reload();
      }
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3' >
      <table className='table'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Image</th>
              <th>Employee Email</th>
              <th>Employee Salary</th>
              <th>Employee Address</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map((emp)=>(
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td><img src={"http://localhost:5000/images/"+emp.image} alt=""  style={{
                    width:"40px", height:"40px", borderRadius:"50%"
                  }}/></td>
                  <td>{emp.email}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.address}</td>
                  <td>
                    <Link to={'/dashboard/edit_employee/'+emp.id} className='btn btn-info btn-sm mx-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' onClick={()=>handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
