import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

const Edit_Employee = () => {
    const navigate=useNavigate();
    const { id } = useParams(); //it will take the id from the url that we pass
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        address: '',
        salary: '',
        category_id: ''
    });

const [category,setCategory] = useState([]);
  useEffect(()=>{
    axios.get('/category')
    .then((result)=>{
     if(result.data.Status){
      setCategory(result.data.Result);
     }
     else{
      alert(result.data.Error);
     }
    })
    .catch((err)=>console.log(err));

    axios.get('/employee/'+id)
    .then((result)=>{
        setEmployee({
            ...employee,
            name: result.data.Result[0].name,
            email: result.data.Result[0].email,
            address: result.data.Result[0].address,
            salary: result.data.Result[0].salary,
        })
    })
    .catch(err=>console.log(err));
  },[]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.put('/edit_employee/'+id,employee)
    .then((result)=>{
        // console.log(result.data);
        navigate('/dashboard/employee');
    }).catch((err)=>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
            <div className='col-12'>
                <label htmlFor="inputName" className='form-label'><strong>Name:</strong></label>
                <input className='form-control rounded-0'
                    type="text"
                    id="inputName"
                    autoComplete='off'
                    placeholder='Enter Name'
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
            </div>
            <div className='col-12'>
                <label htmlFor="inputEmail" className='form-label'><strong>Email:</strong></label>
                <input className='form-control rounded-0'
                    type="text"
                    id="inputEmail"
                    autoComplete='off'
                    placeholder='Enter Email'
                    value={employee.email}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
            </div>
            <div className='col-12'></div>
            <div className='col-12'>
                <label htmlFor="inputSalary" className='form-label'><strong>Salary:</strong></label>
                <input className='form-control rounded-0'
                    type="text"
                    id="inputSalary"
                    autoComplete='off'
                    placeholder='Enter Salary'
                    value={employee.salary}
                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
            </div>
            <div className='col-12'>
                <label htmlFor="inputAddress" className='form-label'><strong>Address:</strong></label>
                <input className='form-control rounded-0'
                    type="text"
                    id="inputAddress"
                    autoComplete='off'
                    placeholder='Enter Address'
                    value={employee.address}
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
            <div className='col-12'>
                <button className='btn btn-primary w-100 rounded-0'>Edit Employee</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Edit_Employee
