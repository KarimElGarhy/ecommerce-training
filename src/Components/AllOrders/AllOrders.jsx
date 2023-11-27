import React, { useContext, useEffect } from "react"
import Style from "./AllOrders.module.css"
import { CartContext } from "../Context/CartContext"
import axios from "axios"
import { userContext } from "../Context/UserContext"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

function AllOrders() {
  let userId = localStorage.getItem(`userId`)

  function getUserOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    )
  }
  let { data } = useQuery("ordersDetails", getUserOrders)
  let ourData = data?.data

  return (
    <div className="row py-5">
      <h1>AllOrders</h1>
      {ourData?.map((order) => (
        <div key={order.id} className="row">
          <div className="col-3">
            Order Id <span>{order.id}</span>
          </div>
          <div className="col-3">
            Payment Method: <span>{order.paymentMethodType}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllOrders
