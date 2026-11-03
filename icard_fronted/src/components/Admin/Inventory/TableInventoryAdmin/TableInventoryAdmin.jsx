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
          <th>Product</th>
          <th>Category</th>
          <th className="table-inventory-admin__stock-cell">Stock</th>
          <th className="table-inventory-admin__status-cell">Status</th>
          <th className="table-inventory-admin__actions-cell">Actions</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.product_data?.title || 'Product unavailable'}</td>
              <td>{item.product_data?.category_data?.title || 'No category'}</td>
              <td>
                <Badge bg={stockVariant(item.stock)}>{item.stock}</Badge>
              </td>
              <td>
                <Badge bg={item.active ? 'success' : 'secondary'}>
                  {item.active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="table-inventory-admin__actions-cell">
                <div className="table-inventory-admin__actions">
                  <Button
                    type="button"
                    variant="warning"
                    size="sm"
                    title="Edit inventory"
                    aria-label={`Edit ${item.product_data?.title || 'product'}`}
                    onClick={() => onEdit(item)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    title="Restock"
                    aria-label={`Restock ${item.product_data?.title || 'product'}`}
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
            <td colSpan="5">No products are registered at this branch.</td>
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
