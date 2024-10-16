import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Importamos js-cookie
import swal from "sweetalert";
import Navbars from "../Components/Navbar";
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import "../App.css";
import "../styles/Modal.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [valoraciones, setValoraciones] = useState([]);

  // Obtener servicios desde la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      const specificData = response.data.map((item) => ({
        id: item.id_servicio,
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        localizacion: item.localizacion,
      }));
      setData(specificData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleProductClick = async (item) => {
    setSelectedProduct(item);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/Valoracion/?servicio=${item.id}`
      );
      setValoraciones(response.data);
    } catch (error) {
      console.error("Error al obtener valoraciones:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setComentario("");
    setPuntuacion(0);
  };

  const submitComment = async () => {
    const user = JSON.parse(Cookies.get("user")); // Leemos la cookie del usuario
    if (!user) {
      swal("No estás autenticado");
      return;
    }

    if (!comentario.trim()) {
      swal("El comentario no puede estar vacío.");
      return;
    }

    const newComentario = {
      usuario: user.id_usuario, // Enviamos el ID del usuario logueado
      servicio: selectedProduct.id,
      puntuacion,
      comentario,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/Valoracion/", newComentario);
      swal("Comentario agregado correctamente");
      setComentario("");
      setPuntuacion(0);
      handleProductClick(selectedProduct); // Refrescar comentarios
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <>
      <Navbars />
      <div className="contenedor">
        {data.length > 0 ? (
          data.map((item, index) => (
            <ul className="productos" key={index}>
              <Box maxWidth="240px">
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
          <p>No hay servicios disponibles</p>
        )}

        {selectedProduct && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h2>{selectedProduct.nombre}</h2>
              <p>{selectedProduct.descripcion}</p>
              <p>Localización: {selectedProduct.localizacion}</p>
              <p>Categoría: {selectedProduct.categoria}</p>

              <h3>Comentarios:</h3>
              <ul>
                {valoraciones.map((valoracion) => (
                  <li key={valoracion.id_valoracion}>
                    {valoracion.comentario} - {valoracion.puntuacion} estrellas
                  </li>
                ))}
              </ul>

              <textarea
                placeholder="Escribe tu comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <input
                type="number"
                min="1"
                max="5"
                value={puntuacion}
                onChange={(e) => setPuntuacion(e.target.value)}
              />
              <button onClick={submitComment}>Enviar comentario</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
