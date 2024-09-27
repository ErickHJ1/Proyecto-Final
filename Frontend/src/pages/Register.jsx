import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
const Register = () => {
    const [correo, setCorreo] = useState('')
    const [usuario, setUsuario] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/registro')
                console.log(response.data)
            } catch (error) {
                console.log("error")
            }
        }
        fetchUsers();
    },[])

    return(
        <>
        
        <h1>Registro</h1>
        <div className="base">
            <div className="wrapper">
                <div className="input-box">
        <input placeholder="correo" type="text" value={correo} onChange={e => setCorreo(e.target.value)}/>
        </div>
        <div className="input-box">
        <input placeholder="usuario" type="text" value={usuario} onChange={e => setUsuario(e.target.value)}/>
        </div>
        <div className="input-box">
        <input placeholder="password" type="password" value={pass} onChange={e => setPass(e.target.value)}/>
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
            const newUser = { correo, nombre, contraseña};
            await axios.post('http://127.0.0.1:8000/api/registro', newUser);
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
        }
        navigate("/login")
    }
}
}
export default Register