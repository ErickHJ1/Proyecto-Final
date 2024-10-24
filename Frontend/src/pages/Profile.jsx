import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import swal from 'sweetalert';
import Navbars from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        username:"",
        usuario_id: "",
        edad: "",
    lugar_vivienda: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      fetchProfile();
    }, []);
    
    const fetchProfile = async () => {
        try {
            const token = Cookies.get("access_token");
      const response = await axios.get("http://127.0.0.1:8000/perfil/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("access_token");
      await axios.post(
        "http://127.0.0.1:8000/perfil/",
        {
          edad: userData.edad,
          lugar_vivienda: userData.lugar_vivienda
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      swal("Perfil actualizado", "Tu perfil ha sido actualizado correctamente", "success");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      swal("Error", "Hubo un problema al actualizar tu perfil", "error");
    }
  };

  const navigateToDm = () => {
    navigate("/Dm")
  }

  return (
    <>
    <Navbars/>
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p>ID de Usuario: {userData.usuario_id}</p>
      <p>Email: {userData.email}</p>
      <p>Nombre: {userData.username}</p>

      {isEditing ? (
        <>
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
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <p>Edad: {userData.edad || "No especificado"}</p>
          <p>Lugar de Vivienda: {userData.lugar_vivienda || "No especificado"}</p>
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
          <button onClick={navigateToDm}>Mensajes</button>
        </>
      )}
    </div>
    </>
  );
};

export default Profile;
