import React, { useContext } from "react"
import Style from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "../../assets/freshcart-logo.svg"
import { userContext } from "../Context/UserContext"

function Navbar() {
  let { userToken, setUserToken } = useContext(userContext)

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setUserToken(null)
    navigate(`/login`)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                </>
              ) : (
                ``
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <Link to="https://twitter.com" target="_blank">
                  <FontAwesomeIcon
                    className="mx-2"
                    icon="fa-brands fa-twitter"
                  />
                </Link>
                <Link to="https://facebook.com" target="_blank">
                  <FontAwesomeIcon
                    className="mx-2"
                    icon="fa-brands fa-facebook"
                  />
                </Link>
                <Link to="https://youtube.com" target="_blank">
                  <FontAwesomeIcon
                    className="mx-2"
                    icon="fa-brands fa-youtube"
                  />
                </Link>
                <Link to="https://linkedin.com" target="_blank">
                  <FontAwesomeIcon
                    className="mx-2"
                    icon="fa-brands fa-linkedin"
                  />
                </Link>
              </li>
              {userToken == null ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      register
                    </Link>
                  </li>
                </>
              ) : (
                ``
              )}
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={() => logOut()}
                      className="nav-link cursor-pointer"
                      to="/logout"
                    >
                      logout
                    </span>
                  </li>
                </>
              ) : (
                ``
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar