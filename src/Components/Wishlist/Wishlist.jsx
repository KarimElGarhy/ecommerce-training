import React, { useContext, useEffect, useState } from "react"
import Style from "./Wishlist.module.css"
import { WishlistContext } from "../Context/WishlistContext"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Circles } from "react-loader-spinner"

function Wishlist() {
  const [productsDetails, setProductsDetails] = useState([])
  let { getUserWishList, removeWishListItem } = useContext(WishlistContext)

  async function getWishListItems() {
    let { data } = await getUserWishList()
    setProductsDetails(data.data)
    console.log(productsDetails)
  }

  async function removeItem(id) {
    let { data } = await removeWishListItem(id)
    setProductsDetails(data?.data)
    console.log(productsDetails)
  }
  useEffect(() => {
    getWishListItems()
  }, [])

  let navigate = useNavigate()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>wishlist</title>
      </Helmet>
      <div className="py-5">
        <h2>Wishlist</h2>
      </div>
    </>
  )
}

export default Wishlist
