import { Button, Container, Card } from 'react-bootstrap'
import "./styles/main.scss"

export default function App() {
  return (
    <div className="container mt-5">
      <h1 className="titulo-restaurante">Restaurante iCard</h1>
      <button className="btn btn-primary">Ver menú</button>
    </div>
  )
}