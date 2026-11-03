import { Badge, Button, Image } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { addProductCart, getProductsCart } from '../../../api/cart'

import './ListProducts.scss'

export function ListProducts(props) {
  const { products = [] } = props

  const addCart = (product) => {
    const quantityInCart = getProductsCart().filter(
      (productId) => Number(productId) === product.id,
    ).length

    if (quantityInCart >= product.stock) {
      toast.warning(`Solo hay ${product.stock} unidades disponibles`)
      return
    }

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

              <div className="list-products-client__details">
                <span>{product.title}</span>
                <Badge bg="light" text="dark">
                  Disponibles: {product.stock}
                </Badge>
              </div>
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
