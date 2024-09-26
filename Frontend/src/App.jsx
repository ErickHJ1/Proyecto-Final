import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </Router>

  )
}

export default App
