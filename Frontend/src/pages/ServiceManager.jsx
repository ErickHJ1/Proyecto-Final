import { useEffect, useState } from "react";
import axios from "axios";

const ServiceManager = () => {
  const [descripcion, setDescripcion] = useState("")
  const [usuario, setUsuario] = useState("")
  const [localizacion, setLocalizacion] = useState("")
  const [categoria, setCategoria] = useState("")
  useEffect(() => {
      async function fetchUsers() {
          try {
              const response = await axios.get('http://127.0.0.1:8000/api/v1/Servicios/')
              console.log(response.data)
          } catch (error) {
              console.log("error")
          }
      }
      fetchUsers();
  },[])
  async function addRequest() {
      if (descripcion.trim() ==='' && usuario.trim() ==='' && localizacion.trim() === '' && categoria.trim() === '') {
          alert("A")
          return
      } else {
      try {
          const newUser = { descripcion, usuario, localizacion, categoria};
          await axios.post('http://127.0.0.1:8000/api/v1/Servicios/', newUser);
      } catch (error) {
          console.error('Error al agregar la tarea:', error);
      }
  }
}

  return (
      <>
      <form>
          <input type="text" value={descripcion} placeholder="Correo" onChange={e => setDescripcion(e.target.value)}/>
          <input type="text" value={usuario} placeholder="Usuario" onChange={e => setUsuario(e.target.value)}/>
          <input type="text" value={localizacion} placeholder="Mensaje" onChange={e => setLocalizacion(e.target.value)}/>
          <input type="text" value={categoria} placeholder="Categoria" onChange={e => setCategoria(e.target.value)}/>
          <button type="button" onClick={addRequest}>Enviar Informacion</button>
      </form>
      </>
  )
};

export default ServiceManager;
