import React from 'react';

const BusinessInfo = () => {
  return (
    <section id="info-negocio">
      <h2>Información del Negocio</h2>

      {/* Detalles relevantes */}
      <div className="detalles">
        <h3>Detalles Relevantes</h3>
        <p><strong>Nombre del negocio:</strong> Mi Negocio</p>
        <p><strong>Descripción:</strong> Somos una tienda especializada en productos orgánicos.</p>
        <p><strong>Teléfono:</strong> <a href="tel:+123456789">+1 234 567 89</a></p>
        <p><strong>Email:</strong> <a href="mailto:info@minegocio.com">info@minegocio.com</a></p>
      </div>

      {/* Horarios de atención */}
      <div className="horarios">
        <h3>Horarios de Atención</h3>
        <ul>
          <li>Lunes a Viernes: 9:00 AM - 6:00 PM</li>
          <li>Sábados: 10:00 AM - 4:00 PM</li>
          <li>Domingos: Cerrado</li>
        </ul>
      </div>

      {/* Ubicación */}
      <div className="ubicacion">
        <h3>Ubicación</h3>
        <p>Dirección: Calle Falsa 123, Ciudad, País</p>
        <div id="mapa">
          {/* Mapa de Google Maps embebido */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9861711916574!2d-84.19995602538555!3d9.935108190166993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0ff10cde6416b%3A0xc30a9ee35999e9cc!2sFWD%20Santa%20Ana!5e0!3m2!1sen!2scr!4v1727902463228!5m2!1sen!2scr"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación del negocio"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;
