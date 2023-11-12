import React from "react"
import Style from "./FeaturedProducts.module.css"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
import ProductCard from "../ProductCard/ProductCard"
function FeaturedProducts() {
  function getFeaturedProducts() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
  }

  let { data, isLoading } = useQuery("featuredProducts", getFeaturedProducts)

  return (
    <>
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
              <ProductCard
                key={product.id}
                slug={product.slug}
                productLink={product.id}
                imageCover={product.imageCover}
                title={product.title}
                category={product.category.name}
                productPrice={product.price}
                ratingsAverage={product.ratingsAverage}
              />
            ))}
          </>
        )}

        {/* Card End */}
      </div>
    </>
  )
}

export default FeaturedProducts
