import React, { useContext, useEffect, useState } from "react"
import Style from "./Cart.module.css"
import { Helmet } from "react-helmet"
import axios from "axios"
import { CartContext } from "../Context/CartContext"

function Cart() {
  const [productsDetails, setProductsDetails] = useState([])
  const [numberOfItems, setNumberOfItems] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(null)

  let { getCartItems } = useContext(CartContext)

  async function getCartDetails() {
    let { data } = await getCartItems()
    setTotalCartPrice(data.data.totalCartPrice)
    setNumberOfItems(data.numOfCartItems)
    setProductsDetails(data.data.products)
  }

  useEffect(() => {
    getCartDetails()
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      <div className="row my-5 p-3 text-start">
        <h2>Shopping Cart</h2>

        <div className="col-12">
          {productsDetails.map((product) => (
            <div
              key={product._id}
              className="row border border-2 border-success rounded-2 mt-3 align-items-center "
            >
              <div className="col-1">
                <img src={product.product.imageCover} width={100} />
              </div>
              <div className="col-9">
                <h4>{product.product.title}</h4>
                <div className="d-flex justify-content-between">
                  {" "}
                  <p>
                    Item Brand: {"  "}
                    <span className="text-main fw-bold">
                      {product.product.brand.name}{" "}
                    </span>
                  </p>
                  <p>
                    Item Category: {"  "}
                    <span className="text-main fw-bold">
                      {product.product.category.name}{" "}
                    </span>
                  </p>
                  <p>
                    Item Price: {"  "}
                    <span className="text-main fw-bold">
                      {" "}
                      {product.price} EGP{" "}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center gap-3">
                <span className="border border-1 rounded-2 border-success p-2">
                  +
                </span>
                <span>{product.count}</span>
                <span className="border border-1 rounded-2 border-success p-2">
                  -
                </span>
                <button className="btn btn-danger">remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex mt-3 justify-content-between">
          <h5>
            Number Of Items :{" "}
            <span className="text-main fw-bold">{numberOfItems}</span>
          </h5>
          <h5>
            Total Cart Price:{" "}
            <span className="text-main fw-bold">{totalCartPrice}</span>
          </h5>
        </div>

        <button className="btn btn-danger w-50 mx-auto">Clear Cart</button>
      </div>
    </>
  )
}

export default Cart
