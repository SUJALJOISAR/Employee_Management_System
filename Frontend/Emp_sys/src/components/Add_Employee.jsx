import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_Employee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        salary: '',
        image: '',
        category_id: ''
    });

    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/auth/category')
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                }
                else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('password',employee.password);
        formData.append('address',employee.address);
        formData.append('salary',employee.salary);
        formData.append('image',employee.image);
        formData.append('category_id',employee.category_id);
        // console.log('Employee data before sending:', formData);  // Check if category_id is present and not null
        axios.post('/auth/add_employee', formData)
            .then((result) => {
                if(result.data.Status){
                    navigate("/dashboard/employee");
                }
                else{
                    alert(result.data.error);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'><strong>Name:</strong></label>
                        <input className='form-control rounded-0'
                            type="text"
                            id="inputName"
                            autoComplete='off'
                            placeholder='Enter Name'
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail" className='form-label'><strong>Email:</strong></label>
                        <input className='form-control rounded-0'
                            type="text"
                            id="inputEmail"
                            autoComplete='off'
                            placeholder='Enter Email'
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputPassword" className='form-label'><strong>Password:</strong></label>
                        <input className='form-control rounded-0'
                            type="text"
                            id="inputPassword"
                            autoComplete='off'
                            placeholder='Enter password'
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className='form-label'><strong>Salary:</strong></label>
                        <input className='form-control rounded-0'
                            type="text"
                            id="inputSalary"
                            autoComplete='off'
                            placeholder='Enter Salary'
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'><strong>Address:</strong></label>
                        <input className='form-control rounded-0'
                            type="text"
                            id="inputAddress"
                            autoComplete='off'
                            placeholder='Enter Address'
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputCategory" className='form-label'><strong>Category:</strong></label>
                        <select
                            name="category"
                            id="category"
                            className='form-select'
                            value={employee.category_id || ''}
                            onChange={(e) => setEmployee({ ...employee, category_id: parseInt(e.target.value) })}  // Ensure category_id is always an integer
                            required  // Make category selection required
                        >
                            <option value="" disabled>Select a category</option>  {/* Default placeholder */}
                            {category.map((c) => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12 mb-2'>
                        <label htmlFor="inputGroupFile" className='form-label'><strong>Select Image:</strong></label>
                        <input className='form-control rounded-0'
                            type="file"
                            name='image'
                            id="inputGroupFile"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary w-100 rounded-0'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add_Employee
