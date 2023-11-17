import React, { useContext } from "react"
import Style from "./Cart.module.css"
import { Helmet } from "react-helmet"
import axios from "axios"
import { CartContext } from "../Context/CartContext"

function Cart() {
  let { getCartItems } = useContext(CartContext)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      <h1>Cart</h1>
    </>
  )
}

export default Cart
