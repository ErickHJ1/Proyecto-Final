import { useState } from 'react';

import axios from 'axios';
import Cookies from "js-cookie";

const Chat = ({ username, message, date }) => {
    const [mensaje,setMensaje] = useState('')
    const token = Cookies.get('access_token')
    const envioMsj=async()=>{
        const mensajeEnviar = {
            emisor: Cookies.get('usuario_id'),
            receptor:localStorage.getItem("idPropServicio"),
            servicio:localStorage.getItem('idServicio'),
            mensaje:mensaje,
        }
        const peticion = await axios.post('http://127.0.0.1:8000/api/chat/caliente/',mensajeEnviar,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        console.log(peticion);
    }

    return (
        <>
        <div className="chat-message">
            <div className="chat-header">
                <strong>{username}</strong>
            </div>
            <input onChange={(e)=>setMensaje(e.target.value)} className="chat-text">{message}</input>
        
       
        </div>
        <button onClick={envioMsj}>Enviar</button>
        </>
    );
};
export default Chat