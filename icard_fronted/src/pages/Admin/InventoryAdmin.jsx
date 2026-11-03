import { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'

import {
  AddEditInventoryForm,
  HeaderPage,
  RestockInventoryForm,
  TableInventoryAdmin,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useBranch, useInventory } from '../../hooks'

export function InventoryAdmin() {
  const [modal, setModal] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [refetch, setRefetch] = useState(false)
  const { selectedBranch, loadingBranches } = useBranch()
  const { inventory, loading, error, getInventory } = useInventory()

  useEffect(() => {
    if (selectedBranch) getInventory(selectedBranch.id)
  }, [getInventory, refetch, selectedBranch])

  const closeModal = () => setModal(null)
  const onRefetch = () => setRefetch((current) => !current)

  const openCreateModal = () => {
    setSelectedItem(null)
    setModal('create')
  }

  const openEditModal = (item) => {
    setSelectedItem(item)
    setModal('edit')
  }

  const openRestockModal = (item) => {
    setSelectedItem(item)
    setModal('restock')
  }

  const title = selectedBranch
    ? `Inventory - ${selectedBranch.name}`
    : 'Inventory'

  return (
    <>
      <HeaderPage
        title={title}
        btnTitle={selectedBranch ? 'Add product' : null}
        btnClick={openCreateModal}
      />

      {error && (
        <Alert variant="danger">Unable to load inventory.</Alert>
      )}

      {loadingBranches || (selectedBranch && loading) ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : selectedBranch ? (
        <TableInventoryAdmin
          inventory={inventory}
          onEdit={openEditModal}
          onRestock={openRestockModal}
        />
      ) : (
        <Alert variant="warning">No branch is available.</Alert>
      )}

      <ModalBasic
        show={modal === 'create' || modal === 'edit'}
        onClose={closeModal}
        title={modal === 'edit' ? 'Edit inventory' : 'Add product'}
        size="small"
      >
        {(modal === 'create' || modal === 'edit') && (
          <AddEditInventoryForm
            branchId={selectedBranch?.id}
            inventoryItem={modal === 'edit' ? selectedItem : null}
            excludedProductIds={inventory.map((item) => item.product)}
            onClose={closeModal}
            onRefetch={onRefetch}
          />
        )}
      </ModalBasic>

      <ModalBasic
        show={modal === 'restock'}
        onClose={closeModal}
        title="Restock"
        size="small"
      >
        {selectedItem && (
          <RestockInventoryForm
            inventoryItem={selectedItem}
            onClose={closeModal}
            onRefetch={onRefetch}
          />
        )}
      </ModalBasic>
    </>
  )
}
