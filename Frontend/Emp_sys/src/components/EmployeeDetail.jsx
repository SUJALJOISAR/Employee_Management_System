import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EmployeeDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        axios.get('/employee/detail/' + id)
            .then((result) => {
                console.log(result.data);
                setEmployee(result.data[0]);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLogout=()=>{
        axios.get('/employee/logout')
        .then(result=>{
            if(result.data.Status){
                navigate('/start');
            }
        })
    }

    return (
        <div>
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={"http://localhost:5000/images/"+employee.image} alt="" style={{
                    width:"80px", height:"80px", borderRadius:"50%" }} />
                    <div className='d-flex align-items-center flex-column mt-5'>
                        <h3>Name:{employee.name}</h3>
                        <h3>Email:{employee.email}</h3>
                        <h3>Salary:₹{employee.salary}</h3> 
                    </div>
                    <div>
                        <button className='btn btn-primary me-2'>Edit</button>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
            </div>
        </div>
    )
}

export default EmployeeDetail
