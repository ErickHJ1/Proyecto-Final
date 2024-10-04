// App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './Components/utils/ProtectedRoute';
import ServiceManager from './pages/ServiceManager';
import Register from './pages/Register';
import Contact from './pages/Contact';

function App() {
  const [user, setUser] = useLocalStorage('user', null); // Asegúrate de que user se inicie como null

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <Routes>
          <Route element={<ProtectedRoute canActivate={!!user} redirectPath='/login' />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/manager' element={<ServiceManager />} />
            <Route path='/' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route path='/login' element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
