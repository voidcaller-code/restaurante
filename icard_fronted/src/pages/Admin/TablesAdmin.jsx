import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useTable } from '../../hooks'

export function TablesAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, tables, getTables, deleteTable } = useTable()

  useEffect(() => {
    getTables()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addTable = () => {
    setTitleModal('Crear mesa')
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateTable = (data) => {
    setTitleModal('Actualizar mesa')
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        table={data}
      />
    )
    openCloseModal()
  }

  const onDeleteTable = async (data) => {
    const result = window.confirm(`¿Eliminar mesa ${data.number}?`)

    if (result) {
      await deleteTable(data.id)
      onRefetch()
    }
  }

  return (
    <>
      <HeaderPage
        title="Mesas"
        btnTitle="Crear nueva mesa"
        btnClick={addTable}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
        />
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </>
  )
}