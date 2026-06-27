import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Login from './screens/Login'   

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/home" element={<Home />} />   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


