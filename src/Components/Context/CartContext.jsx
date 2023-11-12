import axios from "axios"
import { createContext } from "react"

export let cartContext = createContext()
export default function CartContextProvider(props) {
  let userToken = localStorage.getItem(`userToken`)
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers: userToken }
      )
      .then((response) => response)
      .catch((error) => error)
  }

  return (
    <cartContext.Provider value={{ addToCart }}>
      {props.children}
    </cartContext.Provider>
  )
}
