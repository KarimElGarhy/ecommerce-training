import React, { useContext, useEffect, useState } from "react"
import Style from "./Wishlist.module.css"
import { WishlistContext } from "../Context/WishlistContext"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Circles } from "react-loader-spinner"

function Wishlist() {
  const [productsDetails, setProductsDetails] = useState([])
  let { getUserWishList, removeWishListItem, initNumberOfWishListItems } =
    useContext(WishlistContext)

  async function getWishListItems() {
    let { data } = await getUserWishList()
    setProductsDetails(data.data)
  }

  async function removeItem(id) {
    let { data } = await removeWishListItem(id)
    getWishListItems()
    initNumberOfWishListItems()
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
                    <img src={product.imageCover} width={100} />
                  </div>
                  <div className="col-9">
                    <h4>
                      <Link to={`/product/${product.id}/${product.slug}`}>
                        {product.title}
                      </Link>
                    </h4>
                    <div className="d-flex justify-content-between">
                      {" "}
                      <p>
                        Item Brand: {"  "}
                        <span className="text-main fw-bold">
                          {product.brand?.name}
                        </span>
                      </p>
                      <p>
                        Item Category: {"  "}
                        <span className="text-main fw-bold">
                          {product.category?.name}{" "}
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
                    <button
                      onClick={() => removeItem(product._id)}
                      className="btn btn-danger"
                    >
                      remove from wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
