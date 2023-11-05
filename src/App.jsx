import React, { useContext, useEffect } from "react"
import "./App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Cart from "./Components/Cart/Cart"
import Brands from "./Components/Brands/Brands"
import Checkout from "./Components/checkout/checkout"
import Login from "./Components/Login/Login"
import Navbar from "./Components/Navbar/Navbar"
import Notfound from "./Components/Notfound/Notfound"
import Products from "./Components/Products/Products"
import Register from "./Components/Register/Register"
import Categories from "./Components/Categories/Categories"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { userContext } from "./Components/Context/UserContext"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

library.add(faTwitter, faFacebook, faYoutube, faLinkedin)
let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "Navbar", element: <Navbar /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
])

function App() {
  let { setUserToken } = useContext(userContext)
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"))
    }
  }, [])
  return <RouterProvider router={routers}></RouterProvider>
}

export default App
