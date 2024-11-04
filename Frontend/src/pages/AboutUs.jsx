import React from 'react';
import Navbars from "../Components/Navbar"; // Importamos el componente de navegación
import '../App.css'; // Importamos los estilos generales

const AboutUs = () => {
  return (
    <>
      <Navbars /> {/* Incluye la barra de navegación */}
      <div className="contenedor">
        <h1>Acerca De Nosotros</h1>
        <p>
          En <strong>ServiceTrading</strong>, creemos que el trueque de servicios es una forma poderosa de construir comunidades más conectadas y solidarias.
          Nuestra plataforma te permite intercambiar habilidades y conocimientos con otros, creando oportunidades para que todos se beneficien sin necesidad de dinero.
        </p>
        <p>
          Fundada por un grupo de entusiastas del intercambio colaborativo, ServiceTrading nació de la idea de que todos tenemos algo valioso que ofrecer.
          Ya sea que seas un diseñador gráfico, un mecánico, un profesor de idiomas o un jardinero, aquí puedes encontrar a alguien que necesita tus habilidades 
          y que, a su vez, te puede ofrecer lo que tú necesitas.
        </p>
        <p>
          Nuestra misión es facilitar un espacio seguro y accesible donde las personas puedan encontrar y ofrecer servicios, fomentando relaciones de confianza y apoyo mutuo.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
