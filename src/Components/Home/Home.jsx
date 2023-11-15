import React from "react"
import Style from "./Home.module.css"
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts"
import MainSlider from "../MainSlider/MainSlider"
import CategorySlider from "../CategorySlider/CategorySlider"
import { Helmet } from "react-helmet"

function Home() {
  return (
    <div className="py-2">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <h1 className="text-start pt-5 text-center">Featured Products</h1>
      <FeaturedProducts />
    </div>
  )
}

export default Home
