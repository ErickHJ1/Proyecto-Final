import "../styles/Navbar.css" // Importamos los estilos para el navbar

const Navbar = () => {
  return(
    <nav className="Navbar"> {/* Contenedor principal de la barra de navegación */}
      <div className="left"> {/* Sección izquierda de la barra de navegación */}
        <a href="/profile" className="Nav">Perfil</a> {/* Enlace al perfil del usuario */}
        <a href="/contact" className="Nav">ContactUs</a>  {/* Enlace a la sección de contacto */}
        <a href="/manager" className="Nav">Servicios</a> {/* Enlace a la sección de servicios */}
        <a href="/home" className="Nav">Home</a> {/* Enlace a la página de inicio */}
      </div>
      <div className="right"> {/* Sección derecha de la barra de navegación */}
        <div className="buscador"> {/* Contenedor de la barra de búsqueda */}
          <box-icon name='search-alt-2' className="icono-busqueda"></box-icon> {/* Icono de búsqueda */}
          <input 
            type="text" 
            className="input-buscador" 
            placeholder="Busca Servicios" // Placeholder en la barra de búsqueda
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar; // Exportamos el componente Navbar
