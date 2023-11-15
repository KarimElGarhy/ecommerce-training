import React, { useState } from "react"
import Style from "./Register.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Hourglass } from "react-loader-spinner"
import { Helmet } from "react-helmet"
function Register() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  async function submitRegister(values) {
    setIsLoading(true)
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      })
    if (data.message == `success`) {
      setIsLoading(false)
      navigate(`/login`)
    }
  }
  let phoneRegex = /^01[0125][0-9]{8}$/
  let validateScheme = Yup.object({
    name: Yup.string()
      .min(3, `Min length is 3`)
      .max(10, `Max length is 10`)
      .required(`name is required`),
    email: Yup.string().email(`email is invalid`).required(`email is required`),
    phone: Yup.string()
      .matches(phoneRegex, `the phone is invalid`)
      .required(`phone is required`),
    password: Yup.string()
      .min(6, `Min password is 6`)
      .max(15, `max password is 15`)
      .required(`Password Is Required !`),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        `The re Password must match the main Password`
      )
      .required("Re Password Enter Your password Again"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: submitRegister,
  })

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto my-5">
        <h1>Register New Account </h1>
        {error ? (
          <div className="alert alert-danger mt-3 mb-0">{error}</div>
        ) : (
          ``
        )}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name"></label>
          <input
            id="name"
            placeholder="Your Name"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <>
              <div className="alert alert-danger mt-3 mb-0">
                {formik.errors.name}
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

          <label htmlFor="email"></label>
          <input
            id="email"
            placeholder="Your email"
            name="email"
            type="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <>
              <div className="alert alert-danger mt-3 mb-0">
                {formik.errors.email}
              </div>
            </>
          ) : (
            ""
          )}

          <label htmlFor="password"></label>
          <input
            id="password"
            placeholder="Your password"
            name="password"
            type="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <>
              <div className="alert alert-danger mt-3 mb-0">
                {formik.errors.password}
              </div>
            </>
          ) : (
            ""
          )}

          <label htmlFor="repassword"></label>
          <input
            id="repassword"
            placeholder="Your repassword"
            name="rePassword"
            type="password"
            className="form-control"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <>
              <div className="alert alert-danger mt-3 mb-0">
                {formik.errors.rePassword}
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default Register
