import React from "react"
import Style from "./ResetPassword.module.css"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function ResetPassword() {
  let navigate = useNavigate()
  async function VerifyResetPassword(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    )
    console.log(data)
    if (data.status == "Success") {
      navigate(`/passwordChange`)
    }
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: VerifyResetPassword,
  })
  return (
    <div className="row py-5">
      <h1>Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode"></label>
        <input
          id="resetCode"
          placeholder="Your reset Code"
          name="resetCode"
          type="text"
          className="form-control"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <>
            <div className="alert alert-danger mt-3 mb-0">
              {formik.errors.resetCode}
            </div>
          </>
        ) : (
          ""
        )}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white my-3"
        >
          Verify
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
