import React from "react"
import Style from "./Footer.module.css"
import { useFormik } from "formik"
import paypal from "../../assets/paypal.svg"
import amazon from "../../assets/amazon-pay.svg"
import visa from "../../assets/visa.svg"
import googleplay from "../../assets/google-play.svg"
import applestore from "../../assets/app-store.svg"
function Footer() {
  function subscribe() {
    console.log(formik.values.mail)
  }
  let formik = useFormik({
    initialValues: {
      mail: ``,
    },
    onSubmit: subscribe,
  })
  return (
    <>
      <div className="bg-body-secondary p-5 text-start">
        <h2>Get the FreshCart App</h2>
        <p>We will Send you A Link , open </p>
        <form className="d-flex gap-2" onSubmit={formik.handleSubmit}>
          <input
            id="mail"
            placeholder="Your Mail"
            name="mail"
            className="form-control"
            value={formik.values.mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit" className="btn bg-main text-white p-3">
            Subscribe
          </button>
        </form>
        <div className="d-flex py-2 gap-5 align-items-center  justify-content-between">
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
            <li className="nav-item">
              <h6>Payment Partner</h6>
            </li>
            <li className="nav-item">
              <img src={paypal} width={45} />
            </li>
            <li className="nav-item">
              <img src={amazon} width={45} />
            </li>
            <li className="nav-item">
              <img src={visa} width={45} />
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
            <li className="nav-item">
              <h6>Download Application Now:</h6>
            </li>
            <li className="nav-item">
              <img src={googleplay} width={35} />
            </li>
            <li className="nav-item">
              <img src={applestore} width={35} />
            </li>
          </ul>
        </div>
        <p className="fs-6 text-center">Developed by Karim ElGarhy</p>
      </div>
    </>
  )
}

export default Footer
