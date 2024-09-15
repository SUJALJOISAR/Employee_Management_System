import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
  const [adminCount,setAdminCount] = useState();
  const [employeeCount,setEmployeeCount]=useState();
  const [salaryCount,setSalaryCount]=useState();
  const [admins,setAdmins]=useState([]);

  useEffect(()=>{
    adminTotal();
    employeeTotal();
    salaryTotal();
    adminRecord();
  },[]);

  const adminTotal = ()=>{
    axios.get('/admin_count')
    .then((result)=>{
      if(result.data.Status){
        console.log(result);
        setAdminCount(result.data.Result[0].admin);
      }
    })
    .catch(err=>console.log(err));
  }

  const employeeTotal = ()=>{
    axios.get('/employee_count')
    .then((result)=>{
      if(result.data.Status){
        console.log(result);
        setEmployeeCount(result.data.Result[0].employee);
      }
    })
    .catch(err=>console.log(err));
  }

  const salaryTotal = ()=>{
    axios.get('/salary_count')
    .then((result)=>{
      if(result.data.Status){
        console.log(result);
        setSalaryCount(result.data.Result[0].salary);
      }
    })
    .catch(err=>console.log(err));
  }

  const adminRecord=()=>{
    axios.get('/admins')
    .then(result=>{
      setAdmins(result.data.Result);
    })
    .catch(err=>console.log(err));
  }


  return (
    <div>
     <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{adminCount}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{employeeCount}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{salaryCount}</h5>
        </div>
      </div>
     </div>
     <div className='mt-4 px-5 pt-3'>
     <h3>List of Admins</h3>
     <table className='table'>
      <thead>
        <tr>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          admins.map(a=>(
            <tr key={a._id}>
              <td>{a.email}</td>
              <td>
                    <button className='btn btn-info btn-sm mx-2'>Edit</button>
                    <button className='btn btn-warning btn-sm'>Delete</button>
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

export default Home
