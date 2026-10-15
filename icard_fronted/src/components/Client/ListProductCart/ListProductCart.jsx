import { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

import { useOrder, useTable } from '../../../hooks'
import { removeProductCartApi, cleanProductCartApi } from '../../../api/cart'

import './ListProductCart.scss'

export function ListProductCart(props) {
  const { products = [], onReloadCart } = props

  const [total, setTotal] = useState(0)

  const { addOrderToTable } = useOrder()
  const { getTableByNumber } = useTable()

  const { tableNumber } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const totalTemp = products.reduce((acc, product) => {
      return acc + Number(product.price)
    }, 0)

    setTotal(totalTemp.toFixed(2))
  }, [products])

  const removeProduct = (index) => {
    removeProductCartApi(index)
    onReloadCart()
  }

  const createOrder = async () => {
    try {
      if (products.length === 0) {
        toast.warning('El carrito está vacío')
        return
      }

      const tableData = await getTableByNumber(tableNumber)

      if (!tableData || tableData.length === 0) {
        toast.error('La mesa no existe')
        return
      }

      const idTable = tableData[0].id

      for await (const product of products) {
        await addOrderToTable(idTable, product.id)
      }

      cleanProductCartApi()
      navigate(`/client/${tableNumber}/orders`)
    } catch (error) {
      console.error(error)
      toast.error('Error al realizar el pedido')
    }
  }

  return (
    <div className="list-product-cart">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={`${product.id}-${index}`} className="list-product-cart__product">
            <div className="list-product-cart__info">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.title}
                  roundedCircle
                  className="list-product-cart__image"
                />
              )}

              <span>{product.title}</span>
            </div>

            <span>{product.price} €</span>

            <button
              type="button"
              className="list-product-cart__remove"
              onClick={() => removeProduct(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))
      ) : (
        <p className="text-muted">No hay productos en el carrito.</p>
      )}

      <Button
        type="button"
        variant="primary"
        className="w-100 mt-3"
        onClick={createOrder}
        disabled={products.length === 0}
      >
        Realizar pedido ({total} €)
      </Button>
    </div>
  )
}