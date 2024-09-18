import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const navigate=useNavigate();
  return localStorage.getItem("valid") ? children : navigate('/')
}

export default PrivateRoutes
