import axios from "axios"
import { createContext, useEffect, useState } from "react"

export let WishlistContext = createContext()
export default function WishlistContextProvider(props) {
  const [numberOfWishListItems, setNumberOfWishListItems] = useState(0)
  let headers = {
    token: localStorage.getItem("userToken"),
  }
  useEffect(() => {
    initNumberOfWishListItems()
  }, [])
  async function initNumberOfWishListItems() {
    let { data } = await getUserWishList()
    setNumberOfWishListItems(data?.count)
  }
  function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error)
  }
  function removeWishListItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error)
  }
  function getUserWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => response)
      .catch((error) => error)
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishList,
        removeWishListItem,
        getUserWishList,
        numberOfWishListItems,
        setNumberOfWishListItems,
        initNumberOfWishListItems,
      }}
    >
      {" "}
      {props.children}
    </WishlistContext.Provider>
  )
}
