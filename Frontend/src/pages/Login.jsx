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
        const response = await axios.post('http://localhost:8000/logintoken/', {
            email: formData.email,
            password: formData.password,
        });
    
        if (response.data.access_token) {
            Cookies.set('usuario_id', response.data.usuario_id, { expires: 1 }); 
            Cookies.set('access_token', response.data.access_token, { expires: 1 });

            // Guardar usuario en localStorage para `ProtectedRoute`
            setUser(response.data);  // Esto asegura que el usuario esté "logueado"
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
