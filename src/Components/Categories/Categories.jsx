import React from "react"
import Style from "./Categories.module.css"
import axios from "axios"
import { useQuery } from "react-query"
import { Circles } from "react-loader-spinner"
import { Helmet } from "react-helmet"

function Categories() {
  function fetchAllCategories() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  }
  let { data, isLoading } = useQuery("allCategories", fetchAllCategories)
  let catImg = data?.data.data

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="row py-5">
        <h1>Categories</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
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
            {" "}
            {catImg?.map((category, index) => (
              <div key={index} className="col-3 g-3">
                <img
                  height={300}
                  className="w-100 object-fit-content"
                  src={category.image}
                />
                <h5 className="mt-2">{category.name}</h5>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Categories
