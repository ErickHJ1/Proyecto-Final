import { useEffect, useState } from "react";
import axios from "axios"; // Librería para hacer peticiones HTTP
import Cookies from "js-cookie"; // Para manejar cookies
import swal from 'sweetalert'; // Librería para mostrar alertas
import CommentCard from "../Components/ComentarCard"; // Componente para mostrar comentarios

const ServiceManager = () => {
  // Estados para almacenar los datos del servicio y otros estados necesarios
  const [descripcion, setDescripcion] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // Almacena el servicio que se está editando
  const usuarioId = Cookies.get('usuario_id'); // Obtiene el ID del usuario desde las cookies
  const [comentarios, setComentarios] = useState([]); // Almacena los comentarios recibidos

  // Efecto para cargar los servicios si el usuario ha iniciado sesión
  useEffect(() => {
    if (usuarioId) {
      fetchServices();
    } else {
      // Alerta y redirección si el usuario no ha iniciado sesión
      swal("Debes iniciar sesión").then(() => {
        window.location.href = "/login";
      });
    }
  }, [usuarioId]);

  // Función asincrónica para obtener servicios del usuario actual
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

  // Función para agregar un nuevo servicio
  async function addRequest() {
    if (!descripcion || !localizacion || !categoria) {
      swal("Por favor, completa todos los campos."); // Alerta si faltan campos
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

      // Envía el nuevo servicio al servidor
      await axios.post("http://127.0.0.1:8000/api/v1/Servicios/", newService);
      swal("Servicio agregado correctamente");
      resetForm();
      fetchServices(); // Refresca la lista de servicios
    } catch (error) {
      console.error("Error al agregar servicio:", error);
    }
  }

  // Función para obtener comentarios
  const traerComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/chat/privado/${usuarioId}/`);
      setComentarios(response.data); // Almacena los comentarios obtenidos
    } catch (error) {
      console.error('Error al traer los comentarios:', error);
    }
    console.log(comentarios);
  };

  // Efecto para actualizar comentarios al cambiar
  useEffect(() => {
    traerComentarios();
  }, [comentarios]);

  // Función para actualizar un servicio en edición
  async function updateService() {
    if (!editingService) return; // Verifica si hay un servicio en edición

    try {
      const updatedService = {
        descripcion,
        localizacion,
        categoria,
        disponibilidad,
        usuario: usuarioId, // Enviar el ID del usuario al backend
      };

      // Enviar la actualización al servidor
      await axios.put(
        `http://127.0.0.1:8000/api/v1/Servicios/${editingService.id_servicio}/`,
        updatedService
      );

      swal("Servicio actualizado correctamente");
      resetForm();
      setEditingService(null); // Finaliza la edición
      fetchServices(); // Refresca la lista de servicios
    } catch (error) {
      console.error("Error al actualizar servicio:", error.response.data);
      swal("Error al actualizar servicio", error.response.data.detail || "Verifique los datos.", "error");
    }
  }

  // Función para eliminar un servicio
  async function deleteService(serviceId) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/Servicios/${serviceId}/`);
      swal("Servicio eliminado");
      fetchServices(); // Refresca la lista de servicios
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  }

  // Función para reiniciar el formulario
  function resetForm() {
    setDescripcion("");
    setLocalizacion("");
    setCategoria("");
    setDisponibilidad(true);
  }

  // Función para iniciar la edición de un servicio
  function startEditing(service) {
    setEditingService(service); // Almacena el servicio en edición
    setDescripcion(service.descripcion);
    setLocalizacion(service.localizacion);
    setCategoria(service.categoria);
    setDisponibilidad(service.disponibilidad);
  }

  return (
    <>
      <form>
        {/* Campos del formulario para añadir o editar un servicio */}
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

        {/* Botón para agregar o actualizar un servicio */}
        <button
          type="button"
          onClick={editingService ? updateService : addRequest}
        >
          {editingService ? "Actualizar Servicio" : "Agregar Servicio"}
        </button>
      </form>

      <h2>Tus Servicios:</h2>
      <ul>
        {/* Lista de servicios con opciones para editar y eliminar */}
        {services.map((service) => (
          <li key={service.id_servicio}>
            {service.descripcion} - {service.categoria} ({service.localizacion})
            <button onClick={() => startEditing(service)}>Editar</button>
            <button onClick={() => deleteService(service.id_servicio)}>Eliminar</button>
          </li>
        ))}
      </ul>
    
      <h2>Tus mensajes</h2>
      {/* Muestra cada comentario utilizando el componente CommentCard */}
      {comentarios.map((comentario) => (
        <CommentCard 
          username={comentario.emisor} 
          service={comentario.servicio} 
          msg={comentario.mensaje} 
        />
      ))}
    </>
  );
};

export default ServiceManager;
