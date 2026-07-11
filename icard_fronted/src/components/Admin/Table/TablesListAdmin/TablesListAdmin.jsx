import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaSyncAlt } from 'react-icons/fa'

import { TableAdmin } from '../TableAdmin'

import './TablesListAdmin.scss'

export function TablesListAdmin(props) {
  const { tables = [] } = props

  const [reload, setReload] = useState(false)
  const [autoReload, setAutoReload] = useState(false)

  const onReload = () => setReload((prev) => !prev)

  useEffect(() => {
    if (!autoReload) return

    const intervalId = setInterval(() => {
      onReload()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [autoReload])

  return (
    <div className="tables-list-admin">
      <div className="tables-list-admin__actions">
        <Button
          type="button"
          variant="primary"
          className="tables-list-admin__reload"
          onClick={onReload}
        >
          <FaSyncAlt />
        </Button>

        <Form.Check
          type="switch"
          id="auto-reload"
          label="Reload automático"
          checked={autoReload}
          onChange={(event) => setAutoReload(event.target.checked)}
        />
      </div>

      <div className="tables-list-admin__list">
        {tables.length > 0 ? (
          tables.map((table) => (
            <TableAdmin key={table.id || table.number} table={table} reload={reload} />
          ))
        ) : (
          <p className="text-muted">No hay mesas registradas.</p>
        )}
      </div>
    </div>
  )
}