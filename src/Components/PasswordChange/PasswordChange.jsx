import React from "react"
import Style from "./PasswordChange.module.css"
import { useFormik } from "formik"
import { Helmet } from "react-helmet"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function PasswordChange() {
  let navigate = useNavigate()
  async function userPasswordChange(values) {
    let data = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    )
    if (data.status == 200) {
      navigate("/login")
    }
  }
  let validateScheme = Yup.object({
    email: Yup.string().email(`email is invalid`).required(`email is required`),
    newPassword: Yup.string()
      .min(6, `Min password is 6`)
      .max(15, `max password is 15`)
      .required(`Password Is Required !`),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: userPasswordChange,
  })

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="row py-5">
        <h1>Password Change</h1>
        <form
          className="d-flex flex-column gap-2"
          onSubmit={formik.handleSubmit}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
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

          <input
            placeholder="Your New password"
            id="newPassword"
            className="form-control"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <>
              <div className="alert alert-danger mt-3 mb-0">
                {formik.errors.newPassword}
              </div>
            </>
          ) : (
            ""
          )}
          <button className="btn btn-primary my-3" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </>
  )
}

export default PasswordChange
