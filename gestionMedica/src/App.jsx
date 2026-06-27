import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Login from './screens/Login'   
import RegistrarMedico from './screens/RegistrarMedico'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/registrar-medico" element={<RegistrarMedico />} />
        <Route path="/home" element={<Home />} />   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


