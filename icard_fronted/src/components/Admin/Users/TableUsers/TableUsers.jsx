import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'

import './TableUsers.scss'

export function TableUsers(props) {
  const { users = [], updateUser, onDeleteUser } = props

  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="table-users-admin align-middle"
    >
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Activo</th>
          <th>Staff</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>

              <td>
                {user.is_active ? (
                  <FaCheck className="table-users-admin__icon table-users-admin__icon--active" />
                ) : (
                  <FaTimes className="table-users-admin__icon table-users-admin__icon--inactive" />
                )}
              </td>

              <td>
                {user.is_staff ? (
                  <FaCheck className="table-users-admin__icon table-users-admin__icon--active" />
                ) : (
                  <FaTimes className="table-users-admin__icon table-users-admin__icon--inactive" />
                )}
              </td>

              <td className="text-end">
                <Actions
                  user={user}
                  updateUser={updateUser}
                  onDeleteUser={onDeleteUser}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No hay usuarios registrados.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function Actions(props) {
  const { user, updateUser, onDeleteUser } = props

  return (
    <div className="table-users-admin__actions">
      <Button
        type="button"
        variant="warning"
        size="sm"
        onClick={() => updateUser(user)}
      >
        <FaEdit />
      </Button>

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={() => onDeleteUser(user)}
      >
        <FaTrash />
      </Button>
    </div>
  )
}