import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';


function App() {
  return (
    <>
    <Routes>
      <Route path="/adminlogin" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
