import React, { useContext, useEffect } from "react"
import Style from "./Layout.module.css"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { Toaster } from "react-hot-toast"

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  )
}

export default Layout
