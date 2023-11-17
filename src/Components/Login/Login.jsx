import React, { useContext, useState } from "react"
import Style from "./Login.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Hourglass } from "react-loader-spinner"
import { userContext } from "../Context/UserContext"
import { Helmet } from "react-helmet"
function Login() {
  let { setUserToken } = useContext(userContext)
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function loginSubmit(values) {
    setIsLoading(true)
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      })
    if (data.message == `success`) {
      localStorage.setItem("userToken", data.token)
      setUserToken(data.token)
      setIsLoading(false)
      navigate(`/`)
    }
  }

  let validateScheme = Yup.object({
    email: Yup.string().email(`email is invalid`).required(`email is required`),
    password: Yup.string()
      .min(6, `Min password is 6`)
      .max(15, `max password is 15`)
      .required(`Password Is Required !`),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: loginSubmit,
  })

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto my-5">
        <h1>Login </h1>
        {error ? (
          <div className="alert alert-danger mt-3 mb-0">{error}</div>
        ) : (
          ``
        )}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email"></label>
          <input
            id="email"
            placeholder="Your email"
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
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
            <div className="d-flex justify-content-center align-items-center my-3 gap-3">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white "
              >
                Login
              </button>
              <button className="btn bg-main text-white">
                <Link
                  className=" nav-link text-white link-underline-opacity-75-hover"
                  to="/Register"
                >
                  Register now
                </Link>
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default Login
