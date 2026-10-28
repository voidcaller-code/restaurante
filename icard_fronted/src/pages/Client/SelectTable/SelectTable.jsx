import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { useTable } from '../../../hooks'

import './SelectTable.scss'

export function SelectTable() {
  const [idTable, setIdTable] = useState('')
  const [error, setError] = useState(null)

  const { isExistTable } = useTable()
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()

    setError(null)

    if (!idTable) {
      setError('No has introducido ninguna mesa')
      return
    }

    const exist = await isExistTable(idTable)

    if (exist) {
      navigate(`/client/${idTable}`)
    } else {
      setError('El identificador de la mesa no existe')
    }
  }

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce el identificador de tu mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Ejemplo: 1"
              type="number"
              value={idTable}
              onChange={(event) => setIdTable(event.target.value)}
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
