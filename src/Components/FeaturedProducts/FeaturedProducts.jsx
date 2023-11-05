import React from "react"
import Style from "./FeaturedProducts.module.css"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
function FeaturedProducts() {
  function getFeaturedProducts() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
  }

  let { data, isLoading, isError } = useQuery(
    "featuredProducts",
    getFeaturedProducts
  )
  console.log(data?.data.data)

  return (
    <div className="container py-5">
      <h1 className="text-start">Featured Products</h1>
      <div className="row g-3 py-5">
        {/* Card */}

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
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
          <>
            {data?.data.data.map((product) => (
              <div
                className="col-md-3 d-flex justify-content-center"
                key={product.id}
              >
                <div className="card">
                  <img
                    src={product.imageCover}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      Category : {product.category.name}
                    </p>
                    <a href="#" className="btn bg-main text-white">
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Card End */}
      </div>
    </div>
  )
}

export default FeaturedProducts
