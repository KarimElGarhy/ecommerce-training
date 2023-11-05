import React, { useContext, useEffect } from "react"
import Style from "./Layout.module.css"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  )
}

export default Layout