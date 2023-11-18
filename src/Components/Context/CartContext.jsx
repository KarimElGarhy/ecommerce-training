import axios from "axios"
import { createContext } from "react"

export let CartContext = createContext()

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
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

  return (
    <CartContext.Provider value={{ addToCart, getCartItems }}>
      {props.children}
    </CartContext.Provider>
  )
}
