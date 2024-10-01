import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage'
import './App.css'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/Register'
import AuthProvider from './contexts/authprovider'
import AboutUs from './pages/AboutUs'
import ServiceManager from './pages/ServiceManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/aboutus' element={<AboutUs/>}></Route>
        <Route path="/Manager" element={<ServiceManager/>}/>
      </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
