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
          value={`${window.location.origin}/client/${table.id}`}
          size={220}
        />

        <p className="mt-3 mb-0">Table {table.id}</p>
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
            <th className="table-tables-admin__number-cell">Table ID</th>
            <th className="table-tables-admin__type-cell">Type</th>
            <th className="table-tables-admin__capacity-cell">Capacity</th>
            <th className="table-tables-admin__actions-cell">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tables.retData.length > 0 ? (
            tables.retData.map((table) => (
              <tr key={table.id}>
                <td className="table-tables-admin__number-cell">
                  {table.id}
                </td>

                <td className="table-tables-admin__type-cell">
                  {getTableTypeLabel(table.tipo)}
                </td>

                <td className="table-tables-admin__capacity-cell">
                  {table.capacity}
                </td>

                <td className="table-tables-admin__actions-cell">
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
              <td colSpan="4" className="text-center">
                No tables are registered.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="QR code"
        size="sm"
      >
        {contentModal}
      </ModalBasic>
    </>
  )
}

function getTableTypeLabel(type) {
  return {
    NI: 'Children',
    ES: 'Standard',
    VIP: 'VIP',
  }[type] || type
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
