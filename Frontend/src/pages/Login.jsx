import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Cookies from 'js-cookie'; // For handling cookies
import '../App.css'; // Import styles

const Login = ({ setUser }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/zaguatelogueado/', {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.data.access_token) {
        // Store UsuarioT ID in cookies
        Cookies.set('usuario_id', response.data.usuario_id, { expires: 1 }); // 1 day expiration
        navigate("/home");
      }
    } catch (error) {
      setError("Error de inicio de sesión. Por favor, verifique sus credenciales.");
      swal("Error", "Correo o contraseña incorrectos", "error");
    }
  };
  

  return (
    <div className="base">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <div className="input-box mb-3">
            <label>Email</label>
            <input 
              type="text" 
              className="form-control" 
              {...register('email', { required: true })} 
            />
          </div>
          <div className="input-box mb-3">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              {...register('password', { required: true })} 
            />
          </div>
          <button className="btn" type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
