import React, { useContext } from "react"
import Style from "./ProductDetails.module.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Slider from "react-slick"
import { Helmet } from "react-helmet"
import { CartContext } from "../Context/CartContext"
import toast from "react-hot-toast"

function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  let { addToCart } = useContext(CartContext)

  let params = useParams()

  function getProductDetail(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data, isLoading } = useQuery(
    ["productDetails", params.productId], // Use an array key that includes the product ID
    () => getProductDetail(params.productId),
    {
      enabled: !!params.productId, // Only fetch when the product ID exists
    }
  )

  let OurData = data?.data.data

  async function addCart(id) {
    let x = await addToCart(OurData.id)

    if (x.data.status == "success") {
      toast.success(x.data.message)
    } else {
      toast.error(x.data.message)
    }
  }

  return (
    <div className="py-5 row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{OurData?.title}</title>
      </Helmet>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            autoplay="true"
            autoplaySpeed="2000"
            cssEase="linear"
          />
        </div>
      ) : (
        <div className="row">
          <h1 className="text-start">{OurData?.title}</h1>
          <div className="row">
            <div className="col-3">
              <Slider {...settings}>
                {OurData?.images.map((imgEle, index) => (
                  <img
                    key={index}
                    src={imgEle}
                    alt={OurData.slug}
                    className="img-fluid"
                  />
                ))}
              </Slider>
            </div>
            <div className="col-5 d-flex flex-column text-start align-content-center justify-content-center">
              <p>{OurData?.description}</p>
              <div className="d-flex justify-content-between">
                <p>
                  {" "}
                  <FontAwesomeIcon
                    color="#0aad0a"
                    icon="fa-solid fa-money-bill-wave"
                  />{" "}
                  Price : {OurData?.price} <span className="fw-bold">EGP</span>
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    color="#F4CE14"
                    icon="fa-solid fa-star"
                  />{" "}
                  Rating : {OurData?.ratingsAverage}
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon color="red" icon="fa-solid fa-users" />{" "}
                  Ratings Quantity : {OurData?.ratingsQuantity}
                </p>
              </div>
              <p>
                <FontAwesomeIcon
                  color="red"
                  icon="fa-solid fa-diagram-project"
                />{" "}
                Product Category : {OurData?.category?.name}
              </p>
              <button
                onClick={() => addCart(OurData?.id)}
                className="btn bg-main text-white w-100"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
