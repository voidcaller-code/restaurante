import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useCategory } from '../../hooks'

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, categories, getCategories, deleteCategory } = useCategory()

  useEffect(() => {
    getCategories()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addCategory = () => {
    setTitleModal('New category')
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateCategory = (data) => {
    setTitleModal('Update category')
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    )
    openCloseModal()
  }

  const onDeleteCategory = async (data) => {
    const result = window.confirm(`Delete category ${data.title}?`)

    if (result) {
      await deleteCategory(data.id)
      onRefetch()
    }
  }

  return (
    <>
      <HeaderPage
        title="Categories"
        btnTitle="New category"
        btnClick={addCategory}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          deleteCategory={onDeleteCategory}
        />
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} size="large">
        {contentModal}
      </ModalBasic>
    </>
  )
}