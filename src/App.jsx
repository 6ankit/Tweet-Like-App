import React from 'react'
import { Login } from './components/Login'
import { Routes, Route } from "react-router-dom";
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
const App = () => {
  return (
    <React.Fragment>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </React.Fragment>
  )
}

export default App