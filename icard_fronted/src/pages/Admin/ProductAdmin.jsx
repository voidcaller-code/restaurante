import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import {
  HeaderPage,
  TableProductAdmin,
  AddEditProductForm,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useProduct } from '../../hooks'

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, products, getProducts, deleteProduct } = useProduct()

  useEffect(() => {
    getProducts()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addProduct = () => {
    setTitleModal('Nuevo producto')
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateProduct = (data) => {
    setTitleModal('Actualizar producto')
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    )
    openCloseModal()
  }

  const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿Eliminar producto ${data.title}?`)

    if (result) {
      await deleteProduct(data.id)
      onRefetch()
    }
  }

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo producto"
        btnClick={addProduct}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          deleteProduct={onDeleteProduct}
        />
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </>
  )
}