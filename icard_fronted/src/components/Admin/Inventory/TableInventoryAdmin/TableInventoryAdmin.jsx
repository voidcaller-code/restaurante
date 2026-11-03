import { Badge, Button, Table } from 'react-bootstrap'
import { FaEdit, FaPlus } from 'react-icons/fa'

import './TableInventoryAdmin.scss'

export function TableInventoryAdmin(props) {
  const { inventory = [], onEdit, onRestock } = props

  return (
    <Table
      responsive
      striped
      bordered
      hover
      className="table-inventory-admin align-middle"
    >
      <thead className="text-center">
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th className="table-inventory-admin__stock-cell">Stock</th>
          <th className="table-inventory-admin__status-cell">Estado</th>
          <th className="table-inventory-admin__actions-cell">Acciones</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.product_data?.title || 'Producto no disponible'}</td>
              <td>{item.product_data?.category_data?.title || 'Sin categoría'}</td>
              <td>
                <Badge bg={stockVariant(item.stock)}>{item.stock}</Badge>
              </td>
              <td>
                <Badge bg={item.active ? 'success' : 'secondary'}>
                  {item.active ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="table-inventory-admin__actions-cell">
                <div className="table-inventory-admin__actions">
                  <Button
                    type="button"
                    variant="warning"
                    size="sm"
                    title="Editar inventario"
                    aria-label={`Editar ${item.product_data?.title || 'producto'}`}
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    title="Reponer stock"
                    aria-label={`Reponer ${item.product_data?.title || 'producto'}`}
                    onClick={() => onRestock(item)}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No hay productos registrados en esta sede.</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function stockVariant(stock) {
  if (stock === 0) return 'danger'
  if (stock <= 5) return 'warning'
  return 'primary'
}
