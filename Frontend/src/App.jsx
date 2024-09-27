import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/Register'
import AuthProvider from './contexts/authprovider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
