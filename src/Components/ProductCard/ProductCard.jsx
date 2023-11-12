/* eslint-disable react/prop-types */
import React from "react"
import Style from "./ProductCard.module.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ProductCard(props) {
  return (
    <div
      className=" product col-md-3 d-flex justify-content-center"
      key={props.id}
    >
      <div className="card">
        <Link to={`/product/${props.productLink}/${props.slug}`}>
          <img
            src={props.imageCover}
            className="card-img-top"
            alt={props.title}
          />
        </Link>
        <div className="card-body ">
          <Link
            to={`/product/${props.productLink}/${props.title}`}
            className="nav-link"
          >
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
          <Link to={props.addToCart} className="btn bg-main text-white">
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
