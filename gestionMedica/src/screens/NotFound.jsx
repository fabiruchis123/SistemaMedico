import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="mt-2 text-gray-500">Página no encontrada</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Volver al inicio
      </Link>
    </div>
  )
}
