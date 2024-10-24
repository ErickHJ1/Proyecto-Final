import "../styles/Navbar.css"

const Navbar = () => {
  return(
    <nav className="Navbar">
      <div className="left">
        <a href="/profile" className="Nav">Perfil</a>
        <a href="/contact" className="Nav">ContactUs</a>  
        <a href="/manager" className="Nav">Servicios</a>
        <a href="/home" className="Nav">Home</a>
        </div>
        <div className="right">
          <div className="buscador">
          <box-icon name='search-alt-2' className="icono-busqueda"></box-icon>
          <input type="text" className="input-buscador" placeholder="Busca Servicios"/>
          </div>
      </div>

      </nav>
  )
}
export default Navbar