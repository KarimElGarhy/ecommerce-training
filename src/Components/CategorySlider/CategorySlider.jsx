import React from "react"
import Style from "./CategorySlider.module.css"
import Slider from "react-slick"
import axios from "axios"
import { useQuery } from "react-query"
function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  }
  function fetchAllCategories() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  }
  let { data } = useQuery("allCategories", fetchAllCategories)
  let catImg = data?.data.data

  return (
    <div className="pt-5">
      <Slider {...settings}>
        {catImg?.map((category) => (
          <img
            key={category._id}
            height={200}
            className="w-100 object-fit-cover"
            src={category.image}
          />
        ))}
      </Slider>
    </div>
  )
}

export default CategorySlider
