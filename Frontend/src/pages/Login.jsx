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
      // Request JWT token from the Django backend
      const response = await axios.post('http://127.0.0.1:8000/zaguatelogueado/', {
        email: formData.email,
        password: formData.password,
      });
      console.log(response.access_token);
      
      const { access, refresh } = response.data; // Extract tokens

      // Store the tokens in cookies or local storage
      Cookies.set('access_token', access, { expires: 1 }); // Expires in 1 day
      Cookies.set('refresh_token', refresh, { expires: 7 }); // Refresh token expires in 7 days
 
      // Optionally, fetch user data with the access token
      const userResponse = await axios.get(
        'http://127.0.0.1:8000//',
        { headers: { Authorization: `Bearer ${access}` } }
      );

      const user = userResponse.data;
      setUser(user); // Set the user state
      swal("Bienvenido", user.nombre, "success");
      navigate("/home"); // Redirect to home page

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
