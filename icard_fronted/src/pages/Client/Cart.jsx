import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router'

import { useProduct } from '../../hooks'
import { getProductsCart } from '../../api/cart'
import { ListProductCart } from '../../components/Client'

export function Cart() {
  const [products, setProducts] = useState(null)
  const [reloadCart, setReloadCart] = useState(false)

  const { getProductById } = useProduct()
  const { tableNumber } = useParams()

  useEffect(() => {
    const loadProductsCart = async () => {
      const idProductsCart = getProductsCart()

      const productsArray = []

      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct)

        if (response) {
          productsArray.push(response)
        }
      }

      setProducts(productsArray)
    }

    loadProductsCart()
  }, [reloadCart])

  const onReloadCart = () => setReloadCart((prev) => !prev)

  return (
    <div>
      <h1>Carrito</h1>

      {!products ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Cargando...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center">
          <p>Tu carrito está vacío</p>

          <Link to={`/client/${tableNumber}/orders`}>
            <Button variant="primary">Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  )
}