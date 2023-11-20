import React, { useContext, useEffect, useState } from "react"
import Style from "./Cart.module.css"
import { Helmet } from "react-helmet"
import axios from "axios"
import { CartContext } from "../Context/CartContext"
import { useNavigate } from "react-router-dom"
import { Circles } from "react-loader-spinner"
function Cart() {
  const [productsDetails, setProductsDetails] = useState([])
  const [numberOfItems, setNumberOfItems] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let { getCartItems, removeCartItem, clearCartItems, changeItemQuantity } =
    useContext(CartContext)

  async function removeCartItems() {
    clearCartItems()
    setProductsDetails([])
  }

  async function removeItem(id) {
    let { data } = await removeCartItem(id)
    setProductsDetails(data.data.products)
    setNumberOfItems(data.numOfCartItems)
    setProductsDetails(data.data.products)
  }
  async function getCartDetails() {
    let { data } = await getCartItems()
    setTotalCartPrice(data.data.totalCartPrice)
    setNumberOfItems(data.numOfCartItems)
    setProductsDetails(data.data.products)
  }
  async function changeCount(id, newCount) {
    setIsLoading(true)
    try {
      let { data } = await changeItemQuantity(id, newCount)
      setTotalCartPrice(data.data.totalCartPrice)
      setNumberOfItems(data.numOfCartItems)
      setProductsDetails(data.data.products)

      if (newCount === 0) {
        await removeItem(id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCartDetails()
  }, [])
  let navigate = useNavigate()
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="py-5">
        <h2>Shopping Cart</h2>

        {productsDetails.length <= 0 ? (
          <>
            <h4>
              There Is no Products on Cart Please Add More Products to be able
              to see it here.
            </h4>
            <button className="btn btn-primary" onClick={() => navigate(`/`)}>
              Back To Home
            </button>
          </>
        ) : (
          <div className="row my-5 p-3 text-start">
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
                  <div className="col-2">
                    {" "}
                    {isLoading ? (
                      <div>
                        {" "}
                        <Circles
                          height="20"
                          width="20"
                          color="#4fa94d"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        <button
                          onClick={() =>
                            changeCount(product.product._id, product.count + 1)
                          }
                          className="border border-1 rounded-2 border-success p-2"
                        >
                          +
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() =>
                            changeCount(product.product._id, product.count - 1)
                          }
                          className="border border-1 rounded-2 border-success p-2"
                        >
                          -
                        </button>
                        <button
                          onClick={() => removeItem(product.product._id)}
                          className="btn btn-danger"
                        >
                          remove
                        </button>
                      </div>
                    )}
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

            <button
              onClick={() => removeCartItems()}
              className="btn btn-danger w-50 mx-auto"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
