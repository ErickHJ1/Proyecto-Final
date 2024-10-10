import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbars from "../Components/Navbar";
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import "../App.css"; // Importamos los estilos generales'
import "../styles/Modal.css"


const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

  // Función para obtener los datos de los servicios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      const specificData = response.data.map((item) => ({
        nombre: item.nombre, // Asegúrate de que 'nombre' exista en tu API
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

  // Función para manejar el clic en un producto y mostrarlo en el modal
  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
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
                      src="Frontend\src\assets\GatoMewing.jpg"
                      alt="Bold typography"
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
          <p>No data available</p>
        )}

        {/* Modal */}
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
              <img
                src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt={selectedProduct.nombre}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
