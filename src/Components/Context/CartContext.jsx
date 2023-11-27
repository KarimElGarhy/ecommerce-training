import axios from "axios"
import { createContext, useEffect, useState } from "react"

export let CartContext = createContext()

export default function CartContextProvider(props) {
  useEffect(() => {
    getIntItemsNumbers()
  }, [])
  const [firstnumberOfItems, setFirstNumberOfItems] = useState(0)
  const [cartId, setCartId] = useState(null)

  async function getIntItemsNumbers() {
    let { data } = await getCartItems()
    setFirstNumberOfItems(data?.numOfCartItems)
    setCartId(data?.data._id)
  }

  function payment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error)
  }
  let headers = {
    token: localStorage.getItem("userToken"),
  }

  function changeItemQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error)
  }

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error)
  }

  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error)
  }

  function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => error)
  }

  function clearCartItems() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error)
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        removeCartItem,
        clearCartItems,
        changeItemQuantity,
        firstnumberOfItems,
        setFirstNumberOfItems,
        payment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
