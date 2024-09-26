import axios from "axios"
import { useNavigate} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/authprovider";


const Login = () => {
    const [usuarioInput, setUsuarioInput] = useState("")
    const [passInput, setPassInput] = useState("")
    const [data, setData] = useState()
    const navegacion=useNavigate("")
    
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/registro')
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log("error")
            }
        }
        fetchUsers();
    },[])
    async function loginUser() {
        console.log("datos obtenidos con boton", data);
        if (data) {
          const user = data.find((user) => user.usuario === usuarioInput);
          if (user && user.pass === passInput) {
            console.log("usuario y contraseña correcto", user.pass);
            alert("Inicio de sesión correcto");
            localStorage.setItem("id", user.id);
            login()
            navegacion("/home");
          } else {
            alert("Usuario y contraseña no coinciden");
          }
        } else {
          console.log("No data received from the API");
        }
      }
        return (
            <div className="base">
              <div className="wrapper">
                <form>
            <h1>Login</h1>
            <div className="input-box">
            <input type="text" placeholder="Correo" value={usuarioInput} onChange={e => setUsuarioInput(e.target.value)}/>
            </div>
            <div className="input-box">
            <input type="password" placeholder="Contraseña" value={passInput} onChange={e => setPassInput(e.target.value)}/>
            </div>
            <button className="btn" type="button" onClick={loginUser}>Iniciar Sesion</button>
            </form>
              </div>
            </div>
        )
        }
    
    

export default Login