import React, { useState } from "react"; // Importar React y el hook useState
import axios from "axios"; // Importar axios para hacer peticiones HTTP
import { useForm } from "react-hook-form"; // Importar useForm para manejar formularios
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redireccionar
import swal from 'sweetalert'; // Importar swal para mostrar alertas
import Cookies from 'js-cookie'; // Importar js-cookie para manejar cookies
import '../App.css'; // Importar estilos

const Login = ({ setUser }) => {
  const { register, handleSubmit } = useForm(); // Inicializar useForm para el manejo de formularios
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redireccionar

  // Función para manejar el envío del formulario
  const onSubmit = async (formData) => {
    try {
      // Petición POST al backend para realizar el inicio de sesión
      const response = await axios.post('http://localhost:8000/logintoken/', {
        email: formData.email,
        password: formData.password,
      });
    
      // Si se recibe un token de acceso, guardar datos en cookies
      if (response.data.access_token) {
        Cookies.set('usuario_id', response.data.usuario_id, { expires: 1 }); // Guardar ID de usuario
        Cookies.set('access_token', response.data.access_token, { expires: 1 }); // Guardar token de acceso

        // Guardar usuario en el estado local para el uso en `ProtectedRoute`
        setUser(response.data);  // Esto asegura que el usuario esté "logueado"
        navigate("/home"); // Redireccionar a la página de inicio
      }
    } catch (error) {
      // Manejo de errores en caso de que el inicio de sesión falle
      setError("Error de inicio de sesión. Por favor, verifique sus credenciales."); // Establecer mensaje de error
      swal("Error", "Correo o contraseña incorrectos", "error"); // Mostrar alerta de error
    }
  };

  return (
    <div className="base">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}> {/* Manejar el envío del formulario */}
          <h1>Login</h1> {/* Título del formulario */}
          {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si existe */}
          <div className="input-box mb-3"> {/* Contenedor para el campo de email */}
            <label>Email</label>
            <input 
              type="text" 
              className="form-control" 
              {...register('email', { required: true })} // Registrar el campo email como obligatorio
            />
          </div>
          <div className="input-box mb-3"> {/* Contenedor para el campo de contraseña */}
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              {...register('password', { required: true })} // Registrar el campo de contraseña como obligatorio
            />
          </div>
          <button className="btn" type="submit">Iniciar Sesión</button> {/* Botón para enviar el formulario */}
        </form>
      </div>
    </div>
  );
};

export default Login; // Exportar el componente Login
