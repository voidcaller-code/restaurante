import { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

import { useOrder } from '../../../hooks'
import { removeProductCartApi, cleanProductCartApi } from '../../../api/cart'

import './ListProductCart.scss'

export function ListProductCart(props) {
  const { products = [], onReloadCart } = props
  const [submitting, setSubmitting] = useState(false)

  const { addOrderToTable } = useOrder()

  const { idTable } = useParams()
  const navigate = useNavigate()

  const total = products
    .reduce((acc, product) => acc + Number(product.price), 0)
    .toFixed(2)

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

      setSubmitting(true)

      for await (const product of products) {
        await addOrderToTable(idTable, product.id)
        removeProductCartApi(0)
      }

      cleanProductCartApi()
      navigate(`/client/${idTable}/orders`)
    } catch (error) {
      console.error(error)
      onReloadCart()
      toast.error(error.message || 'Error al realizar el pedido')
    } finally {
      setSubmitting(false)
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

            <span>{product.price} $</span>

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
        disabled={products.length === 0 || submitting}
      >
        {submitting ? 'Procesando pedido...' : `Realizar pedido (${total} $)`}
      </Button>
    </div>
  )
}
