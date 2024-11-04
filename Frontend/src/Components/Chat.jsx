import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"; // Para gestionar cookies

const Chat = ({ username, message, date }) => {
    const [mensaje, setMensaje] = useState(''); // Estado para manejar el mensaje a enviar
    const token = Cookies.get('access_token'); // Obtiene el token de acceso de las cookies

    // Función para enviar el mensaje
    const envioMsj = async () => {
        const mensajeEnviar = {
            emisor: Cookies.get('usuario_id'), // ID del usuario emisor
            receptor: localStorage.getItem("idPropServicio"), // ID del receptor almacenado en localStorage
            servicio: localStorage.getItem('idServicio'), // ID del servicio almacenado en localStorage
            mensaje: mensaje, // Mensaje a enviar
        };
        console.log(mensajeEnviar); // Muestra el mensaje en la consola para depuración
        
        try {
            const peticion = await axios.post('http://127.0.0.1:8000/api/chat/', mensajeEnviar, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
                }
            });
            console.log(peticion); // Muestra la respuesta de la petición en la consola
        } catch (error) {
            console.error('Error al enviar el mensaje:', error); // Manejo de errores
        }
    }

    return (
        <>
            <div className="chat-message"> {/* Contenedor para cada mensaje */}
                <div className="chat-header"> {/* Cabecera del mensaje con el nombre de usuario */}
                    <strong>{username}</strong>
                </div>
                <input 
                    onChange={(e) => setMensaje(e.target.value)} // Actualiza el estado del mensaje al cambiar el valor del input
                    className="chat-text" 
                    value={mensaje} // Vincula el valor del input al estado mensaje
                    placeholder={message} // Muestra el mensaje como placeholder
                />
            </div>
            <button onClick={envioMsj}>Enviar</button> {/* Botón para enviar el mensaje */}
        </>
    );
};

export default Chat; // Exporta el componente Chat
