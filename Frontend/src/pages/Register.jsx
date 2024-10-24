import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from 'js-cookie'; // For token storage
import '../App.css';

const Register = () => {
  const [correo, setCorreo] = useState('');
  const [nombre, setUsuario] = useState('');
  const [clave, setPass] = useState('');
  const navigate = useNavigate();

  const validarCorreo = (correo) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(correo).toLowerCase());
  };

  async function addUser() {
    if (correo.trim() === '' || nombre.trim() === '' || clave.trim() === '') {
      swal('Por favor, completa todos los campos.', 'error');
      return;
    }

    if (!validarCorreo(correo)) {
      swal('Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }

    try {
      // 1. Register the user
      const newUser = { username:nombre, email:correo, password: clave };
      await axios.post('http://127.0.0.1:8000/registro/', newUser);

      // // 2. Log the user in automatically after registration
      // const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      //   email: correo,
      //   password: clave,
      // });

      // const { access, refresh } = response.data;

      // 3. Store JWT tokens
      // Cookies.set('access_token', access, { expires: 1 }); // 1 day expiration
      // Cookies.set('refresh_token', refresh, { expires: 7 }); // 7 days expiration

      swal('Usuario registrado con éxito', 'Bienvenido', 'success');
      navigate('/login'); // Redirect to home page

    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      swal('Error al registrar el usuario', 'Inténtalo de nuevo', 'error');
    }
  }

  return (
    <div className="base">
      <div className="wrapper">
        <h1>Registro</h1>
        <div className="input-box">
          <input
            placeholder="Correo"
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            placeholder="Usuario"
            type="text"
            value={nombre}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            placeholder="Password"
            type="password"
            value={clave}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button onClick={addUser}>Registrarse</button>
        <a href="/login">¿Ya tienes una cuenta?</a>
      </div>
    </div>
  );
};

export default Register;
