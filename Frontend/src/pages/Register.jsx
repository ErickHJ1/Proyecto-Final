import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import '../App.css'

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
      const newUser = { correo, nombre, contraseña: clave };
      await axios.post('http://127.0.0.1:8000/api/v1/usuario/', newUser);
      navigate('/login');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
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

