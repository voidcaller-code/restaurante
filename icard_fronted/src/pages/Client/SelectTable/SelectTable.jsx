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
      setError('Enter a table ID')
      return
    }

    const exist = await isExistTable(idTable)

    if (exist) {
      navigate(`/client/${idTable}`)
    } else {
      setError('The table ID does not exist')
    }
  }

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Welcome to iCard</h1>
        <h2>Enter your table ID</h2>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Example: 1"
              type="number"
              value={idTable}
              onChange={(event) => setIdTable(event.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Enter
          </Button>
        </Form>

        {error && <p className="select-table__content-error">{error}</p>}
      </div>
    </div>
  )
}
