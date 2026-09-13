import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { useTable } from '../../../hooks'

import './SelectTable.scss'

export function SelectTable() {
  const [tableNum, setTableNum] = useState('')
  const [error, setError] = useState(null)

  const { isExistTable } = useTable()
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()

    setError(null)

    if (!tableNum) {
      setError('No has introducido ninguna mesa')
      return
    }

    const exist = await isExistTable(tableNum)

    if (exist) {
      navigate(`/client/${tableNum}`)
    } else {
      setError('El número de la mesa no existe')
    }
  }

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce tu número de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Ejemplo: 135, 873, 904, 337"
              type="number"
              value={tableNum}
              onChange={(event) => setTableNum(event.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Entrar
          </Button>
        </Form>

        {error && <p className="select-table__content-error">{error}</p>}
      </div>
    </div>
  )
}