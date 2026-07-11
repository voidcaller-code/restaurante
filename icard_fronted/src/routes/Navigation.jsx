import { Link, Routes, Route } from 'react-router';
import routes from './routes';

function Home() {
  return (
    <div className="mt-4">
      <h2>Inicio</h2>
      <p>Bienvenido al restaurante iCard.</p>
    </div>
  )
}

function Menu() {
  return (
    <div className="mt-4">
      <h2>Menú</h2>
      <p>Aquí irá el menú del restaurante.</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mt-4">
      <h2>Página no encontrada</h2>
    </div>
  )
}


export function Navigation() {
  return (
    <>
      <nav className="d-flex gap-2 mt-4 mb-4">
        <Link to="/" className="btn btn-primary">
          Inicio
        </Link>

        <Link to="/menu" className="btn btn-outline-primary">
          Menú
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}