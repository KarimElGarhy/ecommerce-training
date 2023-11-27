import React from "react"
import Style from "./ForgetPassword.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
function ForgetPassword() {
  let navigate = useNavigate()
  async function forgetPassword(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    )
    console.log(data)
    if (data.statusMsg == `success`) {
      navigate("/resetPassword")
    }
  }
  let validateScheme = Yup.object({
    email: Yup.string().email(`email is invalid`).required(`email is required`),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateScheme,
    onSubmit: forgetPassword,
  })
  return (
    <div className="row py-5">
      <h1>Forget Password </h1>
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

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white my-2"
        >
          send code
        </button>
      </form>
    </div>
  )
}

export default ForgetPassword
