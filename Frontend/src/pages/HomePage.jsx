import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Librería para manejar cookies para la autenticación
import swal from "sweetalert"; // Librería para mostrar alertas a los usuarios
import Navbars from "../Components/Navbar"; // Componente de Navbar personalizado
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes"; // Componentes de UI de Radix
import "../App.css"; // Estilos globales
import "../styles/Modal.css"; // Estilos específicos para el modal
import { useNavigate } from "react-router-dom"; // Hook de React Router para la navegación

const HomePage = () => {
  // Estado para almacenar los datos de los servicios obtenidos
  const [data, setData] = useState([]);
  // Estado para almacenar el producto actualmente seleccionado para mostrar en el modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Estado para el input del comentario del usuario
  const [comentario, setComentario] = useState("");
  // Estado para el input de la puntuación del usuario
  const [puntuacion, setPuntuacion] = useState(0);
  // Estado para almacenar los datos de las valoraciones para un servicio seleccionado
  const [valoraciones, setValoraciones] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Función para obtener servicios desde la API
  const fetchUsers = async () => {
    try {
      // Llamada a la API para recuperar los servicios
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      // Mapeamos los datos de respuesta para obtener solo los campos necesarios
      const specificData = response.data.map((item) => ({
        id: item.id_servicio,
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        localizacion: item.localizacion,
        usuario: item.usuario,
      }));
      setData(specificData); // Almacenamos los datos filtrados en el estado
      console.log(Cookies.get('user.id')); // Depuración: loguear el ID del usuario desde las cookies
    } catch (error) {
      console.error("Error al obtener datos:", error); // Loguear el error si la llamada a la API falla
    }
  };

  // useEffect para obtener los datos de los servicios al montar el componente
  useEffect(() => {
    fetchUsers(); // Llamar a fetchUsers cuando se carga el componente
  }, []);

  // Función para manejar el evento de clic en una tarjeta de servicio
  const handleProductClick = async (item) => {
    // Almacenar el usuario y el ID del servicio en localStorage
    localStorage.setItem('idPropServicio', item.usuario);
    localStorage.setItem('idServicio', item.id);
    setSelectedProduct(item); // Establecer el producto seleccionado para mostrar en el modal
    try {
      // Obtener las valoraciones para el servicio seleccionado
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/Valoracion/?servicio=${item.id}`
      );
      setValoraciones(response.data); // Almacenar los datos de las valoraciones en el estado
    } catch (error) {
      console.error("Error al obtener valoraciones:", error); // Loguear el error si la llamada a la API falla
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado para cerrar el modal
    setComentario(""); // Reiniciar el input de comentario
    setPuntuacion(0); // Reiniciar el input de puntuación
  };

  // Función para manejar el envío del comentario
  const submitComment = async () => {
    const user = Cookies.get('usuario_id'); // Obtener el ID del usuario desde las cookies

    if (!user) {
      swal("No estás autenticado"); // Alerta si el usuario no está autenticado
      return;
    }

    if (!comentario.trim()) {
      swal("El comentario no puede estar vacío."); // Alerta si el comentario está vacío
      return;
    }

    // Construir un nuevo objeto de comentario
    const newComentario = {
      usuario_comentario: user,  // ID del usuario desde la cookie
      servicio: selectedProduct.id, // ID del servicio seleccionado
      puntuacion, // Valor de la puntuación desde el input
      comentario, // Texto del comentario desde el input
    };

    try {
      // Llamada a la API para enviar el comentario
      await axios.post("http://127.0.0.1:8000/api/v1/Valoracion/", newComentario);
      swal("Comentario agregado correctamente"); // Alerta de éxito
      setComentario(""); // Limpiar el input de comentario
      setPuntuacion(0); // Reiniciar el input de puntuación
      handleProductClick(selectedProduct); // Actualizar los comentarios para el producto seleccionado
    } catch (error) {
      console.error("Error al agregar comentario:", error); // Loguear el error si la entrega falla
    }
    console.log(newComentario); // Depuración: loguear los datos del nuevo comentario
  };

  return (
    <>
      <Navbars /> {/* Componente de Navbar */}
      <div className="contenedor">
        {/* Renderizado condicional basado en la longitud de los datos */}
        {data.length > 0 ? (
          data.map((item, index) => (
            <ul className="productos" key={index}>
              <Box maxWidth="240px">
                {/* Componente de tarjeta para cada servicio */}
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
          <p>No hay servicios disponibles</p> // Mensaje si no hay servicios disponibles
        )}

        {/* Modal para los detalles del servicio seleccionado y comentarios */}
        {selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times; {/* Botón para cerrar */}
              </span>
              <h2>{selectedProduct.nombre}</h2> {/* Nombre del servicio */}
              <p>{selectedProduct.descripcion}</p> {/* Descripción del servicio */}
              <p>Localización: {selectedProduct.localizacion}</p> {/* Localización */}
              <p>Categoría: {selectedProduct.categoria}</p> {/* Categoría */}

              <h3>Comentarios:</h3>
              <ul>
                {/* Lista de comentarios */}
                {valoraciones.map((valoracion) => (
                  <li key={valoracion.id_valoracion}>
                    <strong>{valoracion.usuario_nombre}:</strong> {valoracion.comentario} - {valoracion.puntuacion} estrellas
                  </li>
                ))}
              </ul>

              {/* Textarea para nuevo comentario */}
              <textarea
                placeholder="Escribe tu comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              {/* Input para la puntuación */}
              <input
                type="number"
                min="1"
                max="5"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
              />
              {/* Botón para enviar el comentario */}
              <button onClick={submitComment}>Enviar comentario</button>
              {/* Botón para navegar a la página de mensajes */}
              <button onClick={() => navigate('/Dm')}>Enviar mensaje</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage; // Exportamos el componente HomePage
