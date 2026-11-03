import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useBranch, useTable } from '../../hooks'

export function TablesAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, tables, getTables, deleteTable } = useTable()
  const { selectedBranch } = useBranch()

  useEffect(() => {
    if (!selectedBranch) return

    getTables(selectedBranch.id)
  }, [refetch, selectedBranch, getTables])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addTable = () => {
    setTitleModal('Create table')
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        branchId={selectedBranch?.id}
      />
    )
    openCloseModal()
  }

  const updateTable = (data) => {
    setTitleModal('Update table')
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
    const result = window.confirm(`Delete table ${data.id}?`)

    if (result) {
      await deleteTable(data.id)
      onRefetch()
    }
  }

  return (
    <>
      <HeaderPage
        title={`Tables${selectedBranch ? ` - ${selectedBranch.name}` : ''}`}
        btnTitle={selectedBranch ? 'Create new table' : null}
        btnClick={addTable}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
        />
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} size="large">
        {contentModal}
      </ModalBasic>
    </>
  )
}
