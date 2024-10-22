import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import swal from 'sweetalert';



const ServiceManager = () => {
  const [descripcion, setDescripcion] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [services, setServices] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    // Chequear la cookie del usuario al montar el componente
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        setLoggedUser(JSON.parse(userCookie));
      } catch (error) {
        console.error("Error al parsear la cookie:", error);
        swal("Error", "Cookie de usuario inválida", "error");
      }
    } else {
      swal("Debes iniciar sesión").then(() => {
        window.location.href = "/login";
      });
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      fetchServices();
    }
  }, [loggedUser]);

  async function fetchServices() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      const userServices = response.data.filter(
        (service) => service.usuario === loggedUser.usuario_id
      );
      setServices(userServices);
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
        usuario: loggedUser.usuario_id,
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

  function resetForm() {
    setDescripcion("");
    setLocalizacion("");
    setCategoria("");
    setDisponibilidad(true);
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
        <button type="button" onClick={addRequest}>
          Agregar Servicio
        </button>
      </form>

      <h2>Servicios de {loggedUser?.email}:</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id_servicio}>
            {service.descripcion} - {service.categoria} ({service.localizacion})
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServiceManager;
