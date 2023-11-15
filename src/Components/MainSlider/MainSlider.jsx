import React from "react"
import Style from "./MainSlider.module.css"
import Slider from "react-slick"

import slidimgOne from "../../assets/slider-image-1.jpeg"
import slidimgTwo from "../../assets/slider-image-2.jpeg"
import slidimgThree from "../../assets/slider-image-3.jpeg"
import img1 from "../../assets/blog-img-1.jpeg"
import img2 from "../../assets/blog-img-2.jpeg"

function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  return (
    <div className="row">
      <div className="col-md-9 p-0">
        <Slider {...settings}>
          <div>
            <img
              className="object-content-cover w-100 "
              src={slidimgOne}
              height={400}
            />
          </div>
          <div>
            <img
              className="object-content-cover w-100 "
              src={slidimgTwo}
              height={400}
            />
          </div>
          <div>
            <img
              className="object-content-cover w-100 "
              src={slidimgThree}
              height={400}
            />
          </div>
        </Slider>
      </div>
      <div className="col-md-3 p-0 d-flex flex-column ">
        <img height={200} src={img1} className="w-100" />
        <img height={200} src={img2} className="w-100" />
      </div>
    </div>
  )
}

export default MainSlider
