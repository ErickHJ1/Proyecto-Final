import Cookies from "js-cookie"
import Chat from "../Components/Chat"


const Dm = () => {
     const nombreUsuario = Cookies.get('idPropServicio')
return(
    <>
    <Chat username={nombreUsuario}/>
    </>
)
}

export default Dm