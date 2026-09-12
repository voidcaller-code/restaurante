import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useUser } from '../../hooks'

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  const { loading, users, getUsers, deleteUser } = useUser()

  useEffect(() => {
    getUsers()
  }, [refetch])

  const openCloseModal = () => setShowModal((prev) => !prev)
  const onRefetch = () => setRefetch((prev) => !prev)

  const addUser = () => {
    setTitleModal('Nuevo usuario')
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
    )
    openCloseModal()
  }

  const updateUser = (data) => {
    setTitleModal('Actualizar usuario')
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    )
    openCloseModal()
  }

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Eliminar usuario ${data.email}?`)

    if (result) {
      try {
        await deleteUser(data.id)
        onRefetch()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} size="large">
        {contentModal}
      </ModalBasic>
    </>
  )
}