import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import swal from 'sweetalert';
import CommentCard from "../Components/ComentarCard";

const ServiceManager = () => {
  const [descripcion, setDescripcion] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // Track editing service
  const usuarioId = Cookies.get('usuario_id'); // Get UsuarioT ID from cookies
  const [comentarios,setComentarios] = useState([])
  useEffect(() => {
    if (usuarioId) {
      fetchServices();
    } else {
      swal("Debes iniciar sesión").then(() => {
        window.location.href = "/login";
      });
    }
  }, [usuarioId]);

  async function fetchServices() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/Servicios/?usuario_id=${usuarioId}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  }

  async function addRequest() {
    if (!descripcion || !localizacion || !categoria) {
      swal("Por favor, completa todos los campos.");
      return;
    }

    try {
      const newService = {
        descripcion,
        usuario: usuarioId,
        localizacion,
        categoria,
        disponibilidad,
      };

      await axios.post("http://127.0.0.1:8000/api/v1/Servicios/", newService);
      swal("Servicio agregado correctamente");
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error al agregar servicio:", error);
    }
  }
  
  const traerComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chat/caliente/privado/${usuarioId}/`);
      setComentarios(response.data); // Aquí accedemos directamente a response.data
    } catch (error) {
      console.error('Error al traer los comentarios:', error); // Manejo de errores
    }
    console.log(comentarios);
  };
  
  useEffect(() => {
    traerComentarios();
  }, [comentarios]);

  async function updateService() {
    if (!editingService) return; // Ensure we're editing a service

    try {
      const updatedService = {
        descripcion,
        localizacion,
        categoria,
        disponibilidad,
        usuario: usuarioId, // Ensure the backend receives the user ID
      };

      await axios.put(
        `http://127.0.0.1:8000/api/v1/Servicios/${editingService.id_servicio}/`,
        updatedService
      );

      swal("Servicio actualizado correctamente");
      resetForm();
      setEditingService(null); // Stop editing
      fetchServices();
    } catch (error) {
      console.error("Error al actualizar servicio:", error.response.data); // Log backend response
      swal("Error al actualizar servicio", error.response.data.detail || "Verifique los datos.", "error");
    }
  }

  async function deleteService(serviceId) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/Servicios/${serviceId}/`);
      swal("Servicio eliminado");
      fetchServices();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  }

  function resetForm() {
    setDescripcion("");
    setLocalizacion("");
    setCategoria("");
    setDisponibilidad(true);
  }

  function startEditing(service) {
    setEditingService(service); // Set the service being edited
    setDescripcion(service.descripcion);
    setLocalizacion(service.localizacion);
    setCategoria(service.categoria);
    setDisponibilidad(service.disponibilidad);
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={descripcion}
          placeholder="Descripción"
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          value={localizacion}
          placeholder="Localización"
          onChange={(e) => setLocalizacion(e.target.value)}
        />
        <input
          type="text"
          value={categoria}
          placeholder="Categoría"
          onChange={(e) => setCategoria(e.target.value)}
        />
        <label>
          Disponibilidad:
          <input
            type="checkbox"
            checked={disponibilidad}
            onChange={() => setDisponibilidad(!disponibilidad)}
          />
        </label>

        <button
          type="button"
          onClick={editingService ? updateService : addRequest}
        >
          {editingService ? "Actualizar Servicio" : "Agregar Servicio"}
        </button>
      </form>

      <h2>Tus Servicios:</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id_servicio}>
            {service.descripcion} - {service.categoria} ({service.localizacion})
            <button onClick={() => startEditing(service)}>Editar</button>
            <button onClick={() => deleteService(service.id_servicio)}>Eliminar</button>
          </li>
        ))}
      </ul>
    
      <h2>Tus mensajes</h2>

      {comentarios.map((comentario)=>{
        return(
        <CommentCard username={comentario.emisor} service={comentario.servicio} msg={comentario.mensaje}/>
      ) 
      })}
    </>

  );
};

export default ServiceManager;
