import React from "react"
import Style from "./Products.module.css"
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts"
import { Helmet } from "react-helmet"

function Products() {
  return (
    <div className="pt-5">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <h1>All Products</h1>
      <FeaturedProducts />
    </div>
  )
}

export default Products
