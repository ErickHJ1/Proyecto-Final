import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './Components/utils/ProtectedRoute';
import ServiceManager from './pages/ServiceManager';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Dm from './pages/Dm';

function App() {
  const [user, setUser] = useLocalStorage('user');
  const [theme, setTheme] = useState('light'); // Estado del tema (claro por defecto)

  // Cargar tema guardado en sessionStorage
  useEffect(() => {
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme); // Aplicar tema al cargar la página
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    sessionStorage.setItem('theme', newTheme); // Guardar preferencia en sessionStorage
    document.documentElement.setAttribute('data-theme', newTheme); // Aplicar el nuevo tema
  };

  

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <button onClick={toggleTheme} className="btn toggle-theme">
          {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
        <Routes>
          {/* <ProtectedRoute canActivate={user} redirectPath='/login' /> */}
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/manager' element={<ServiceManager />} />
            <Route path='/' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/Dm' element={<Dm/>}></Route>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
