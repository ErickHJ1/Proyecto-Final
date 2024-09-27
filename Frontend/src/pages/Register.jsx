import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
const Register = () => {
    const [correo, setCorreo] = useState('')
    const [nombre, setUsuario] = useState('')
    const [clave, setPass] = useState('')
    const navigate = useNavigate()
    
    return(
        <>
        
        <h1>Registro</h1>
        <div className="base">
            <div className="wrapper">
                <div className="input-box">
        <input placeholder="correo" type="text" value={correo} onChange={e => setCorreo(e.target.value)}/>
        </div>
        <div className="input-box">
        <input placeholder="usuario" type="text" value={nombre} onChange={e => setUsuario(e.target.value)}/>
        </div>
        <div className="input-box">
        <input placeholder="password" type="password" value={clave} onChange={e => setPass(e.target.value)}/>
        </div>
        <button className="btn" onClick={addUser}>Registrarse</button>
        <a href="/login">Ya tienes una cuenta?</a>
            </div>
        </div>
        </>
    )
    async function addUser() {
        if (correo.trim() ==='' && usuario.trim() ==='' && pass.trim() === '') {
            alert("A")
            return
        } else {
        try {
            const newUser = { correo, nombre, contraseña:clave};
            await axios.post('http://127.0.0.1:8000/api/v1/usuario/', newUser);
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
        }
        navigate("/login")
    }
}
}
export default Register