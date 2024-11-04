import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Library to handle cookies for authentication
import swal from "sweetalert"; // Library for displaying alerts to users
import Navbars from "../Components/Navbar"; // Custom Navbar component
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes"; // UI components from Radix
import "../App.css"; // Global styling
import "../styles/Modal.css"; // Modal-specific styling
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

const HomePage = () => {
  // State to store fetched service data
  const [data, setData] = useState([]);
  // State to store the currently selected product for modal display
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State for comment input from user
  const [comentario, setComentario] = useState("");
  // State for rating input from user
  const [puntuacion, setPuntuacion] = useState(0);
  // State to store ratings (valoraciones) data for a selected service
  const [valoraciones, setValoraciones] = useState([]);
  const navigate = useNavigate();

  // Function to fetch services from the API
  const fetchUsers = async () => {
    try {
      // API call to retrieve services
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      // Map response data to only needed fields
      const specificData = response.data.map((item) => ({
        id: item.id_servicio,
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        localizacion: item.localizacion,
        usuario: item.usuario,
      }));
      setData(specificData); // Store filtered data in state
      console.log(Cookies.get('user.id')); // Debug: log user ID from cookies
    } catch (error) {
      console.error("Error al obtener datos:", error); // Log error if API call fails
    }
  };

  // useEffect to fetch services data on component mount
  useEffect(() => {
    fetchUsers(); // Call fetchUsers when component loads
  }, []);

  // Function to handle click event on a service card
  const handleProductClick = async (item) => {
    // Store service user and ID in localStorage
    localStorage.setItem('idPropServicio', item.usuario);
    localStorage.setItem('idServicio', item.id);
    setSelectedProduct(item); // Set selected product to show in modal
    try {
      // Fetch ratings for the selected service
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/Valoracion/?servicio=${item.id}`
      );
      setValoraciones(response.data); // Store ratings data in state
    } catch (error) {
      console.error("Error al obtener valoraciones:", error); // Log error if API call fails
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedProduct(null); // Clear selected product to close modal
    setComentario(""); // Reset comment input
    setPuntuacion(0); // Reset rating input
  };

  // Function to handle comment submission
  const submitComment = async () => {
    const user = Cookies.get('usuario_id'); // Get user ID from cookies

    if (!user) {
      swal("No estás autenticado"); // Alert if user is not authenticated
      return;
    }

    if (!comentario.trim()) {
      swal("El comentario no puede estar vacío."); // Alert if comment is empty
      return;
    }

    // Construct new comment object
    const newComentario = {
      usuario_comentario: user,  // User ID from cookie
      servicio: selectedProduct.id, // ID of selected service
      puntuacion, // Rating value from input
      comentario, // Comment text from input
    };

    try {
      // API call to submit comment
      await axios.post("http://127.0.0.1:8000/api/v1/Valoracion/", newComentario);
      swal("Comentario agregado correctamente"); // Success alert
      setComentario(""); // Clear comment input
      setPuntuacion(0); // Reset rating input
      handleProductClick(selectedProduct); // Refresh comments for the selected product
    } catch (error) {
      console.error("Error al agregar comentario:", error); // Log error if submission fails
    }
    console.log(newComentario); // Debug: log new comment data
  };

  return (
    <>
      <Navbars /> {/* Navbar component */}
      <div className="contenedor">
        {/* Conditional rendering based on data length */}
        {data.length > 0 ? (
          data.map((item, index) => (
            <ul className="productos" key={index}>
              <Box maxWidth="240px">
                {/* Card component for each service */}
                <Card className="card" size="9" onClick={() => handleProductClick(item)}>
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src="Frontend/src/assets/GatoMewing.jpg"
                      alt="Servicio"
                      style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        backgroundColor: "var(--gray-5)",
                      }}
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <Strong>{item.nombre}</Strong>
                    {item.descripcion}, localización: {item.localizacion}, categoría: {item.categoria}
                  </Text>
                </Card>
              </Box>
            </ul>
          ))
        ) : (
          <p>No hay servicios disponibles</p> // Message if no services are available
        )}

        {/* Modal for selected service details and comments */}
        {selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times; {/* Close button */}
              </span>
              <h2>{selectedProduct.nombre}</h2> {/* Service name */}
              <p>{selectedProduct.descripcion}</p> {/* Service description */}
              <p>Localización: {selectedProduct.localizacion}</p> {/* Location */}
              <p>Categoría: {selectedProduct.categoria}</p> {/* Category */}

              <h3>Comentarios:</h3>
              <ul>
                {/* List of comments */}
                {valoraciones.map((valoracion) => (
                  <li key={valoracion.id_valoracion}>
                    <strong>{valoracion.usuario_nombre}:</strong> {valoracion.comentario} - {valoracion.puntuacion} estrellas
                  </li>
                ))}
              </ul>

              {/* Textarea for new comment */}
              <textarea
                placeholder="Escribe tu comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              {/* Input for rating */}
              <input
                type="number"
                min="1"
                max="5"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
              />
              {/* Button to submit comment */}
              <button onClick={submitComment}>Enviar comentario</button>
              {/* Button to navigate to message page */}
              <button onClick={() => navigate('/Dm')}>Enviar mensaje</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
