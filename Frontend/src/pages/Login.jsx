import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Cookies from 'js-cookie'; // Importamos js-cookie
import '../App.css'; // Importamos los estilos generales

const Login = ({ setUser }) => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/usuario/');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const onSubmit = (formData) => {
    const user = data.find((user) => user.nombre === formData.email);
    if (user && user.contraseña === formData.password) {
      swal("Bienvenido", user.nombre, "success");
      Cookies.set('user', JSON.stringify({ usuario_id: user.id_usuario }), { expires: 1 }); // Guardar cookie por 1 día
      setUser(user);
      navigate("/home");
    } else {
      swal("Contraseña incorrecta", "Por favor, verifique su contraseña", "error");
    }
  };
  return (
    <div className="base">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
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
