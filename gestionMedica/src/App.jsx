import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import NotFound from './screens/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
