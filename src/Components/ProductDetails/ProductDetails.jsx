import React from "react"
import Style from "./ProductDetails.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ProductDetails() {
  let prams = useParams()

  console.log(prams.productId)
  function getProductDetail(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data, isFetching, isLoading } = useQuery(`productDetails`, () =>
    getProductDetail(prams.productId)
  )
  let OurData = data?.data.data
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          {" "}
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row">
          <h1 className="text-start">{OurData.title}</h1>
          <div className="row">
            <div className="col-3">
              <img
                className="img-fluid"
                alt={OurData.slug}
                src={OurData.imageCover}
              />
            </div>
            <div className="col-5 d-flex flex-column text-start align-content-center justify-content-center">
              <p>{OurData.description}</p>
              <div className="d-flex justify-content-between">
                <p>
                  {" "}
                  <FontAwesomeIcon
                    color="#0aad0a"
                    icon="fa-solid fa-money-bill-wave"
                  />{" "}
                  Price : {OurData.price} <span className="fw-bold">EGP</span>
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    color="#F4CE14"
                    icon="fa-solid fa-star"
                  />{" "}
                  Rating : {OurData.ratingsAverage}
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon color="red" icon="fa-solid fa-users" />{" "}
                  Ratings Quantity : {OurData.ratingsQuantity}
                </p>
              </div>
              <p>
                <FontAwesomeIcon
                  color="red"
                  icon="fa-solid fa-diagram-project"
                />{" "}
                Product Category : {OurData.category?.name}
              </p>
              <button className="btn bg-main text-white w-100">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductDetails
