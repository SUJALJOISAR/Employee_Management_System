import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import Add_Category from './components/Add_Category';
import Add_Employee from'./components/Add_Employee';
import Edit_Employee from './components/Edit_Employee';
import Start from './components/Start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDetail from './components/EmployeeDetail';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/adminlogin" element={<Login />}/>
      <Route path="/employeelogin" element={<EmployeeLogin />}/>
      <Route path="/dashboard" element={
        <PrivateRoutes><Dashboard /></PrivateRoutes>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/add_category' element={<Add_Category />}></Route>
        <Route path='/dashboard/add_employee' element={<Add_Employee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<Edit_Employee />}></Route>
      </Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
    </Routes>
    </>
  )
} 

export default App
