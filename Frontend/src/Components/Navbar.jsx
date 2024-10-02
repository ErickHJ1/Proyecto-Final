import "../styles/Navbar.css"

const Navbar = () => {
  return(
    <nav className="Navbar">
      <div className="left">
        <a href="/AboutUs" className="Nav">AboutUs</a>  
        <a href="/" className="Nav">Servicios</a>
        <a href="" className="Nav">Home</a>
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