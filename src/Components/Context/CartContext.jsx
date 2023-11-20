import axios from "axios"
import { createContext } from "react"

export let CartContext = createContext()

export default function CartContextProvider(props) {
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
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
