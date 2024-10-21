import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";  // Importamos la librería de cookies
import swal from 'sweetalert';

const ServiceManager = () => {
  const [descripcion, setDescripcion] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [services, setServices] = useState([]); // Almacena los servicios del usuario
  const [selectedService, setSelectedService] = useState(null); // Servicio seleccionado para modificar

  // Obtenemos el usuario logueado desde las cookies
  const loggedUser = JSON.parse(Cookies.get('user') || '{}');

  // Función para obtener los servicios del usuario logueado
  async function fetchServices() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/Servicios/');
      const userServices = response.data.filter(
        service => service.usuario === loggedUser.usuario_id // Filtrar servicios por el usuario logueado
      );
      setServices(userServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  // Llamar a fetchServices cuando el componente se monte
  useEffect(() => {
    fetchServices();
  }, []);

  // Función para agregar un nuevo servicio
  async function addRequest() {
    const user = Cookies.get('user'); // Obtener cookie

    if (descripcion.trim() === "" || localizacion.trim() === "" || categoria.trim() === "") {
      swal("Por favor, completa todos los campos.");
      return;
    }

    const loggedUser = JSON.parse(user); // Parsear cookie a objeto

    if (!user) {
      swal("No", "error")
      return
    }

    if (!loggedUser.usuario_id) {
      swal("ID de usuario no encontrado en la cookie.");
      return;
    }
  

    try {
      const newService = {
        descripcion,
        usuario: loggedUser.usuario_id, // Usar el ID del usuario logueado
        localizacion,
        categoria,
        disponibilidad,
      };

      await axios.post("http://127.0.0.1:8000/api/v1/Servicios/", newService);
      swal("Servicio agregado correctamente");
      resetForm();
      fetchServices(); // Actualizar la lista de servicios
    } catch (error) {
      console.error("Error al agregar el servicio:", error);
    }
  }

  // Función para modificar un servicio existente
  async function updateRequest() {
    if (!selectedService) {
      swal("Selecciona un servicio para modificar");
      return;
    }

    try {
      const updatedService = {
        descripcion,
        usuario: loggedUser.usuario_id,// Aseguramos que el servicio pertenezca al usuario logueado
        localizacion,
        categoria,
        disponibilidad,
      };

      await axios.put(`http://127.0.0.1:8000/api/v1/Servicios/${selectedService.id_servicio}/`, updatedService);
      swal("Servicio modificado correctamente");
      resetForm();
      fetchServices(); // Actualizar la lista de servicios
    } catch (error) {
      console.error("Error al modificar el servicio:", error);
    }
  }

  // Función para eliminar un servicio
  async function deleteRequest(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/Servicios/${id}/`);
      swal("Servicio eliminado correctamente");
      fetchServices(); // Actualizar la lista de servicios
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  }

  // Función para cargar los datos del servicio seleccionado en el formulario
  function selectService(service) {
    setSelectedService(service);
    setDescripcion(service.descripcion);
    setLocalizacion(service.localizacion);
    setCategoria(service.categoria);
    setDisponibilidad(service.disponibilidad);
  }

  // Función para limpiar el formulario después de agregar o modificar
  function resetForm() {
    setSelectedService(null);
    setDescripcion("");
    setLocalizacion("");
    setCategoria("");
    setDisponibilidad(true);
  }

  return (
    <>
      {/* Formulario para agregar o modificar un servicio */}
      <form>
        <input
          type="text"
          value={descripcion}
          placeholder="Descripcion"
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          value={localizacion}
          placeholder="Localizacion"
          onChange={(e) => setLocalizacion(e.target.value)}
        />
        <input
          type="text"
          value={categoria}
          placeholder="Categoria"
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
        {selectedService ? (
          <button type="button" onClick={updateRequest}>
            Modificar Servicio
          </button>
        ) : (
          <button type="button" onClick={addRequest}>
            Agregar Servicio
          </button>
        )}
        {selectedService && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      {/* Listado de servicios disponibles */}
      <h2>Servicios Disponibles para {loggedUser.nombre}:</h2>
      <ul>
        {services.map(service => (
          <li key={service.id_servicio}>
            {service.descripcion} - {service.categoria} ({service.localizacion})
            <button onClick={() => selectService(service)}>Modificar</button>
            <button onClick={() => deleteRequest(service.id_servicio)}>Borrar</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServiceManager;
