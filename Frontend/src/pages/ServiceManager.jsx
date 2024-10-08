// ServiceManager.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

const ServiceManager = () => {
  const [descripcion, setDescripcion] = useState("");
  const [usuario, setUsuario] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);  // Estado para disponibilidad
  const [serviceId, setServiceId] = useState(null);  // Estado para almacenar el ID del servicio a modificar
  const [services, setServices] = useState([]); // Estado para almacenar todos los servicios

  // Function to fetch all services
  async function fetchServices() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/Servicios/');
      setServices(response.data); // Store services in state
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  }

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to add a new service
  async function addRequest() {
    if (
      descripcion.trim() === "" ||
      usuario.trim() === "" ||
      localizacion.trim() === "" ||
      categoria.trim() === ""
    ) {
      swal("Por favor, completa todos los campos.");
      return;
    }
    try {
      const newService = { descripcion, usuario, localizacion, categoria, disponibilidad };
      await axios.post("http://127.0.0.1:8000/api/v1/Servicios/", newService);
      swal("Servicio agregado correctamente");
      setDescripcion(""); // Clear input after submission
      setUsuario("");
      setLocalizacion("");
      setCategoria("");
      setDisponibilidad(true);
      fetchServices(); // Re-fetch services to update the list
    } catch (error) {
      console.error("Error al agregar el servicio:", error);
    }
  }

  // Function to update an existing service
  async function updateRequest() {
    if (serviceId === null) {
      swal("Selecciona un servicio para modificar");
      return;
    }
    try {
      const updatedService = { descripcion, usuario, localizacion, categoria, disponibilidad };
      await axios.put(`http://127.0.0.1:8000/api/v1/Servicios/${serviceId}/`, updatedService);
      swal("Servicio actualizado correctamente");
      fetchServices(); // Re-fetch services to update the list
    } catch (error) {
      console.error("Error al modificar el servicio:", error);
    }
  }

  // Function to delete a service
  async function deleteRequest() {
    if (serviceId === null) {
      swal("Selecciona un servicio para borrar");
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/Servicios/${serviceId}/`);
      swal("Servicio eliminado correctamente");
      fetchServices(); // Re-fetch services to update the list
      setServiceId(null); // Clear the service ID input
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={descripcion}
          placeholder="Descripcion"
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          value={usuario}
          placeholder="Usuario"
          onChange={(e) => setUsuario(e.target.value)}
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
        <button type="button" onClick={addRequest}>
          Enviar Información
        </button>
      </form>

      {/* Form to update an existing service */}
      <form>
        <input
          type="number"
          value={serviceId}
          placeholder="ID del servicio a modificar"
          onChange={(e) => setServiceId(e.target.value)}
        />
        <button type="button" onClick={updateRequest}>
          Modificar Servicio
        </button>
      </form>

      {/* Button to delete a service */}
      <form>
        <input
          type="number"
          value={serviceId}
          placeholder="ID del servicio a borrar"
          onChange={(e) => setServiceId(e.target.value)}
        />
        <button type="button" onClick={deleteRequest}>
          Borrar Servicio
        </button>
      </form>

      {/* List of services */}
      <h2>Servicios Disponibles:</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.descripcion} - {service.usuario} ({service.localizacion}, {service.categoria})
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServiceManager;
