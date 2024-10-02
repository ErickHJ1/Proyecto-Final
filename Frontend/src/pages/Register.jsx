import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import swal from 'sweetalert';

const Register = () => {
    const [correo, setCorreo] = useState('');
    const [nombre, setUsuario] = useState('');
    const [clave, setPass] = useState('');
    const navigate = useNavigate();

    // Función para validar el formato del correo electrónico
    const validarCorreo = (correo) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(correo).toLowerCase());
    };

    async function addUser() {
        if (correo.trim() === '' || nombre.trim() === '' || clave.trim() === '') {
            swal("Por favor, completa todos los campos.", );
            return;
        }

        if (!validarCorreo(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        try {
            const newUser = { correo, nombre, contraseña: clave };
            await axios.post('http://127.0.0.1:8000/api/v1/usuario/', newUser);
            navigate("/login");
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
        }
    }

    return (
        <>

            <h1>Registro</h1>
            <div className="base">
                <div className="wrapper">
                    <div className="input-box">
                        <input
                            placeholder="correo"
                            type="text"
                            value={correo}
                            onChange={e => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            placeholder="usuario"
                            type="text"
                            value={nombre}
                            onChange={e => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            placeholder="password"
                            type="password"
                            value={clave}
                            onChange={e => setPass(e.target.value)}
                        />
                    </div>
                    <button className="btn" onClick={addUser}>Registrarse</button>
                    <a href="/login">Ya tienes una cuenta?</a>
                </div>
            </div>
        </>
    );
};

export default Register;
