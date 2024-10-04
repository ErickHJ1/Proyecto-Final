// File: BusinessInfo.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const BusinessInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these values with your actual EmailJS user ID, service ID, and template ID
    const serviceId = 'service_t36arsi';
    const templateId = 'template_4zydzs7';
    const userId = 'iLHqMas2iBWJrzzVu';

    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        alert('Mensaje enviado con éxito!');
      })
      .catch((err) => {
        console.error('Error al enviar el mensaje:', err);
      });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="info-negocio">
      <h2>Información del Negocio</h2>

      {/* Detalles relevantes */}
      <div className="detalles">
        <h3>Detalles Relevantes</h3>
        <p><strong>Nombre del negocio:</strong> ServiceTrading</p>
        <p><strong>Descripción:</strong> Somos una tienda especializada en productos orgánicos.</p>
        <p><strong>Teléfono:</strong> <a href="tel:+123456789">+1 234 567 89</a></p>
        <p><strong>Email:</strong> <a href="mailto:info@minegocio.com">info@minegocio.com</a></p>
      </div>

      {/* Formulario de contacto */}
      <div className="contacto">
        <h3>Contacta con nosotros</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <label>
            Correo Electrónico:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <label>
            Mensaje:
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </label>
          <br />
          <button type="submit">Enviar Mensaje</button>
        </form>
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
        <p>Dirección: De la Iglesia de Río Oro 300 metros norte y 50 metros este, C. Ross, Río Oro</p>
        <div id="mapa">
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
