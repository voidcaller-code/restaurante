import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaEdit, FaQrcode, FaTrash } from 'react-icons/fa'
import { QRCodeSVG } from 'qrcode.react'

import { ModalBasic } from '../../../Common'

import './TableTablesAdmin.scss'

export function TableTablesAdmin(props) {
  const { tables = [], updateTable, deleteTable } = props

  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(null)

  const openCloseModal = () => setShowModal((prev) => !prev)

  const showQr = (table) => {
    setContentModal(
      <div className="table-tables-admin__qr">
        <QRCodeSVG
          value={`${window.location.origin}/client/${table.number}`}
          size={220}
        />

        <p className="mt-3 mb-0">Mesa {table.number}</p>
      </div>
    )

    openCloseModal()
  }

  return (
    <>
      <Table
        responsive
        striped
        bordered
        hover
        className="table-tables-admin align-middle"
      >
        <thead>
          <tr>
            <th>Mesa número</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tables.length > 0 ? (
            tables.map((table) => (
              <tr key={table.id}>
                <td>{table.number}</td>

                <td className="text-end">
                  <Actions
                    table={table}
                    updateTable={updateTable}
                    deleteTable={deleteTable}
                    showQr={showQr}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No hay mesas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Código QR"
        size="sm"
      >
        {contentModal}
      </ModalBasic>
    </>
  )
}

function Actions(props) {
  const { table, updateTable, deleteTable, showQr } = props

  return (
    <div className="table-tables-admin__actions">
      <Button
        type="button"
        variant="outline-primary"
        size="sm"
        onClick={() => showQr(table)}
      >
        <FaQrcode />
      </Button>

      <Button
        type="button"
        variant="warning"
        size="sm"
        onClick={() => updateTable(table)}
      >
        <FaEdit />
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => deleteTable(table)}
      >
        <FaTrash />
      </Button>
    </div>
  )
}