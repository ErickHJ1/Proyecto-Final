import React, { useState } from 'react';
import axios from 'axios'; // Librería para hacer peticiones HTTP
import { useNavigate } from 'react-router-dom'; // Hook para navegación entre páginas
import swal from 'sweetalert'; // Librería para mostrar alertas
import Cookies from 'js-cookie'; // Librería para almacenar cookies
import '../App.css';

const Register = () => {
  // Estados para almacenar el correo, nombre de usuario y clave ingresados por el usuario
  const [correo, setCorreo] = useState('');
  const [nombre, setUsuario] = useState('');
  const [clave, setPass] = useState('');
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  // Función para validar el formato de correo electrónico
  const validarCorreo = (correo) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo
    return re.test(String(correo).toLowerCase()); // Devuelve true si el correo es válido
  };

  // Función asincrónica para registrar un nuevo usuario
  async function addUser() {
    // Validar que todos los campos estén completos
    if (correo.trim() === '' || nombre.trim() === '' || clave.trim() === '') {
      swal('Por favor, completa todos los campos.', 'error'); // Muestra alerta de error
      return;
    }

    // Validar el formato del correo
    if (!validarCorreo(correo)) {
      swal('Por favor, ingresa un correo electrónico válido.', 'error'); // Muestra alerta de error
      return;
    }

    try {
      // 1. Crear un objeto con los datos del usuario
      const newUser = { username: nombre, email: correo, password: clave };
      // Hacer una solicitud POST para registrar al usuario
      await axios.post('http://127.0.0.1:8000/registro/', newUser);

      // 2. Iniciar sesión automáticamente después del registro (comentado por ahora)
      // const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      //   email: correo,
      //   password: clave,
      // });
      // const { access, refresh } = response.data; // Obtener los tokens de acceso y refresco

      // 3. Guardar los tokens JWT en cookies (comentado por ahora)
      // Cookies.set('access_token', access, { expires: 1 }); // Expira en 1 día
      // Cookies.set('refresh_token', refresh, { expires: 7 }); // Expira en 7 días

      // Muestra un mensaje de éxito al usuario
      swal('Usuario registrado con éxito', 'Bienvenido', 'success');
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión

    } catch (error) {
      // Manejo de errores en caso de fallo en el registro
      console.error('Error al agregar el usuario:', error);
      swal('Error al registrar el usuario', 'Inténtalo de nuevo', 'error'); // Muestra una alerta de error
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
            onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado de 'correo'
          />
        </div>
        <div className="input-box">
          <input
            placeholder="Usuario"
            type="text"
            value={nombre}
            onChange={(e) => setUsuario(e.target.value)} // Actualiza el estado de 'nombre'
          />
        </div>
        <div className="input-box">
          <input
            placeholder="Password"
            type="password"
            value={clave}
            onChange={(e) => setPass(e.target.value)} // Actualiza el estado de 'clave'
          />
        </div>
        <button onClick={addUser}>Registrarse</button> {/* Botón para registrar al usuario */}
        <a href="/login">¿Ya tienes una cuenta?</a> {/* Enlace a la página de inicio de sesión */}
      </div>
    </div>
  );
};

export default Register;
