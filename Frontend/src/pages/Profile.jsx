import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Librería para manejar cookies de autenticación
import swal from 'sweetalert'; // Librería para mostrar alertas
import Navbars from "../Components/Navbar"; // Componente de la barra de navegación
import { useNavigate } from "react-router-dom"; // Hook para la navegación en React Router

const Profile = () => {
  const navigate = useNavigate(); // Hook para cambiar entre rutas
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    usuario_id: "",
    edad: "",
    lugar_vivienda: ""
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para manejar si el perfil está en modo de edición

  useEffect(() => {
    fetchProfile(); // Llama a la función para obtener el perfil cuando el componente se monta
  }, []);

  // Función para obtener los datos del perfil desde la API
  const fetchProfile = async () => {
    try {
      const token = Cookies.get("access_token"); // Obtener el token de autenticación
      const response = await axios.get("http://127.0.0.1:8000/perfil/", {
        headers: {
          Authorization: `Bearer ${token}` // Agregar token a la cabecera para autorización
        }
      });
      setUserData(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener perfil:", error); // Mostrar error si falla la solicitud
    }
  };

  // Función para manejar los cambios en los campos de entrada en modo de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value })); // Actualizar el valor correspondiente en el estado
  };

  // Función para guardar los cambios en el perfil
  const handleSave = async () => {
    try {
      const token = Cookies.get("access_token"); // Obtener el token de autenticación
      await axios.post(
        "http://127.0.0.1:8000/perfil/", // Ruta de la API para actualizar el perfil
        {
          edad: userData.edad, // Enviar solo los campos editables
          lugar_vivienda: userData.lugar_vivienda
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Cabecera de autorización
          }
        }
      );
      swal("Perfil actualizado", "Tu perfil ha sido actualizado correctamente", "success"); // Alerta de éxito
      setIsEditing(false); // Salir del modo de edición
    } catch (error) {
      console.error("Error al actualizar perfil:", error); // Mostrar error en caso de fallo
      swal("Error", "Hubo un problema al actualizar tu perfil", "error"); // Alerta de error
    }
  };

  // Función para navegar a la página de mensajes directos
  const navigateToDm = () => {
    navigate("/Dm"); // Cambia la ruta a la página de mensajes
  };

  return (
    <>
      <Navbars /> {/* Componente de la barra de navegación */}
      <div className="profile-container">
        <h2>Perfil de Usuario</h2>
        <p>ID de Usuario: {userData.usuario_id}</p>
        <p>Email: {userData.email}</p>
        <p>Nombre: {userData.username}</p>

        {isEditing ? (
          <>
            {/* Campos de entrada para editar la edad y lugar de vivienda */}
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={userData.edad}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lugar_vivienda"
              placeholder="Lugar de Vivienda"
              value={userData.lugar_vivienda}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>Guardar</button> {/* Guardar los cambios */}
            <button onClick={() => setIsEditing(false)}>Cancelar</button> {/* Cancelar edición */}
          </>
        ) : (
          <>
            {/* Mostrar la edad y lugar de vivienda en modo de solo lectura */}
            <p>Edad: {userData.edad || "No especificado"}</p>
            <p>Lugar de Vivienda: {userData.lugar_vivienda || "No especificado"}</p>
            <button onClick={() => setIsEditing(true)}>Editar Perfil</button> {/* Activar modo de edición */}
            <button onClick={navigateToDm}>Mensajes</button> {/* Navegar a mensajes */}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
