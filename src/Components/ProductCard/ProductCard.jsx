/* eslint-disable react/prop-types */
import React, { useContext } from "react"
import Style from "./ProductCard.module.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CartContext } from "../Context/CartContext"
import toast from "react-hot-toast"
import { WishlistContext } from "../Context/WishlistContext"

function ProductCard(props) {
  let { addToCart, setFirstNumberOfItems } = useContext(CartContext)
  let { addToWishList, initNumberOfWishListItems } = useContext(WishlistContext)
  async function addCart(id) {
    let x = await addToCart(props.id)
    if (x.data.status == "success") {
      toast.success(x.data.message)
      setFirstNumberOfItems(x.data.numOfCartItems)
    } else {
      toast.error(x.data.message)
    }
  }

  async function addToWishListUser(id) {
    let x = await addToWishList(props.id)

    if (x.data.status == "success") {
      toast.success(x.data.message)
      initNumberOfWishListItems()
    } else {
      toast.error(x.data.message)
    }
  }
  return (
    <div
      className=" product col-md-3 d-flex justify-content-center"
      key={props.id}
    >
      <div className="card">
        <Link to={`/product/${props.id}/${props.slug}`}>
          <img
            src={props.imageCover}
            className="card-img-top"
            alt={props.title}
          />
        </Link>
        <div className="card-body ">
          <Link to={`/product/${props.id}/${props.title}`} className="nav-link">
            <h5 className="card-title">
              {props.title.split(" ").splice(0, 2).join(" ")}
            </h5>
          </Link>
          <p className={Style.cardCategory}>Category : {props.category}</p>
          <div className="d-flex justify-content-between">
            <p className="d-flex gap-2 align-items-center">
              <FontAwesomeIcon
                color="#0aad0a"
                icon="fa-solid fa-money-bill-wave"
              />
              {props.productPrice} EGP
            </p>

            <p className="d-flex gap-2 align-items-center">
              <FontAwesomeIcon color="#F4CE14" icon="fa-solid fa-star" />
              {props.ratingsAverage}
            </p>
          </div>
          <Link
            onClick={() => addCart(props?.id)}
            className="btn bg-main text-white"
          >
            Add To Cart
          </Link>

          <button
            onClick={() => {
              addToWishListUser(props?.id)
            }}
            className="btn text-start"
          >
            {" "}
            <FontAwesomeIcon
              color="red"
              icon="fa-solid fa-heart"
            ></FontAwesomeIcon>{" "}
            {"Add To Wishlist"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
