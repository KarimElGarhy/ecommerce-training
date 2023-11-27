import React, { useContext } from "react"
import Style from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "../../assets/freshcart-logo.svg"
import { userContext } from "../Context/UserContext"
import basketShop from "../../assets/shopping-basket.svg"
import { CartContext } from "../Context/CartContext"
import { WishlistContext } from "../Context/WishlistContext"
function Navbar() {
  let { userToken, setUserToken } = useContext(userContext)

  let { firstnumberOfItems, setFirstNumberOfItems } = useContext(CartContext)

  let { numberOfWishListItems, setNumberOfWishListItems } =
    useContext(WishlistContext)

  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userId")

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
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      All Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <img src={basketShop} className="img-fluid" width={30} />{" "}
                      {firstnumberOfItems == undefined ? (
                        ``
                      ) : (
                        <span className="bg-main text-white p-1 rounded-1">
                          {firstnumberOfItems}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">
                      <FontAwesomeIcon
                        color="red"
                        width={30}
                        icon="fa-solid fa-heart"
                      ></FontAwesomeIcon>
                      <span className="bg-main text-white p-1 rounded-1">
                        {numberOfWishListItems}
                      </span>
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
