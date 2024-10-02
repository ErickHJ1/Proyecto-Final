import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbars from "../Components/Navbar";
import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";

const HomePage = () => {
  const [data, setData] = useState([]);

  // Fetching services data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/Servicios/");
      const specificData = response.data.map((item) => ({
        nombre: item.nombre, // Ensure `nombre` exists in your API response
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

  return (
    <>
      <Navbars />
      {/* Renderizar los datos */}
      <div className="contenedor">
        {data.length > 0 ? (
          data.map((item, index) => (
            <ul className="productos" key={index}>
              <Box maxWidth="240px">
                <Card size="9">
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                      alt="Bold typography"
                      style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: 140,
                        backgroundColor: 'var(--gray-5)',
                      }}
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <Strong>{item.nombre}</Strong>
                    {item.descripcion}, localizacion: {item.localizacion}, categoria: {item.categoria}
                  </Text>
                </Card>
              </Box>
            </ul>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
