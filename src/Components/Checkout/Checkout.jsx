import React, { useContext, useState } from "react"
import Style from "./Checkout.module.css"
import { Helmet } from "react-helmet"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Hourglass } from "react-loader-spinner"
import { CartContext } from "../Context/CartContext"

function Checkout() {
  const [isLoading, setIsLoading] = useState(false)
  let { payment } = useContext(CartContext)

  async function payOnline(values) {
    setIsLoading(true)
    let { data } = await payment(values)
    console.log(data)
    if (data.status == `success`) {
      window.location.href = data.session.url
      setIsLoading(false)
    }
  }

  let phoneRegex = /^01[0125][0-9]{8}$/

  let valiadteScheme = Yup.object({
    details: Yup.string()
      .min(3, `Min Length is 3`)
      .max(25, `Max Length is 25`)
      .required(`Details is Required.`),
    phone: Yup.string()
      .matches(phoneRegex, `the phone is invalid`)
      .required(`phone is required`),
    city: Yup.string()
      .max(25, `Max Length is 25`)
      .required(`City is Required.`),
  })
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: valiadteScheme,
    onSubmit: payOnline,
  })
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
      </Helmet>
      <form className="py-5" onSubmit={formik.handleSubmit}>
        <h1>Checkout</h1>
        <label htmlFor="details"></label>
        <input
          id="details"
          placeholder="Your details"
          name="details"
          type="text"
          className="form-control"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details ? (
          <>
            <div className="alert alert-danger mt-3 mb-0">
              {formik.errors.details}
            </div>
          </>
        ) : (
          ""
        )}

        <label htmlFor="phone"></label>
        <input
          id="phone"
          placeholder="Your phone"
          name="phone"
          type="tel"
          className="form-control"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <>
            <div className="alert alert-danger mt-3 mb-0">
              {formik.errors.phone}
            </div>
          </>
        ) : (
          ""
        )}

        <label htmlFor="city"></label>
        <input
          id="city"
          placeholder="Your city"
          name="city"
          type="text"
          className="form-control"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city ? (
          <>
            <div className="alert alert-danger mt-3 mb-0">
              {formik.errors.city}
            </div>
          </>
        ) : (
          ""
        )}

        {isLoading ? (
          <button className="btn bg-main text-white mt-5">
            <Hourglass
              visible={true}
              height="20"
              width="20"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#fff", "#fff"]}
            />
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-5"
          >
            Pay Now
          </button>
        )}
      </form>
    </>
  )
}

export default Checkout
