import React from "react"
import Style from "./Brands.module.css"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
import { Helmet } from "react-helmet"

function Brands() {
  function getAllBrands() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }

  let { data, isLoading } = useQuery("getAllBrands", getAllBrands)
  let brands = data?.data.data

  return (
    <div className="row py-5">
      <h1>Brands</h1>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
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
          {brands?.map((brand) => (
            <div className="col-md-2 g-3" key={brand._id}>
              <img className="w-100 object-fit-content " src={brand.image} />
              <h5 className="mt-2">{brand.name}</h5>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Brands
