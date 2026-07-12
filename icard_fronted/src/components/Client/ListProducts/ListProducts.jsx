import { Button, Image } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { addProductCart } from '../../../api/cart'

import './ListProducts.scss'

export function ListProducts(props) {
  const { products = [] } = props

  const addCart = (product) => {
    addProductCart(product.id)
    toast.success(`${product.title} añadido al carrito`)
  }

  return (
    <div className="list-products-client">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="list-products-client__product">
            <div className="list-products-client__info">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.title}
                  className="list-products-client__image"
                />
              )}

              <span>{product.title}</span>
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => addCart(product)}
            >
              <FaPlus />
            </Button>
          </div>
        ))
      ) : (
        <p className="text-muted">No hay productos disponibles.</p>
      )}
    </div>
  )
}