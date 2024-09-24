import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <AuthProvider>
        <Routes>
        <Route path="/" element={<Register/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path='/home' element={<HomePage/>} ></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/usuario' element={<Rutas_privada route={<Usuario/>}/>}> </Route>
        </Routes>
      </AuthProvider>
  )
}

export default App
