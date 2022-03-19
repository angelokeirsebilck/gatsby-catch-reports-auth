import React, { useState, useEffect } from "react"

import axios from "axios"

import Layout from "../components/layout"

const ResetPassword = ({ location }) => {
  const [password, setPassword] = useState("")
  const [changed, setChanged] = useState(false)
  const params = new URLSearchParams(location.search)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!password) {
      return
    }
    try {
      const { data } = await axios.post(
        `${process.env.GATSBY_API_URL}/auth/reset-password`,
        {
          password,
          token: params.get("token"),
          email: params.get("email"),
        }
      )
      setChanged(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <h2>Change password</h2>

      {changed ? (
        <p>Done</p>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <input
            name="password"
            onChange={e => setPassword(e.target.value)}
            className="form-input"
          />
          <button>Submit</button>
        </form>
      )}
    </Layout>
  )
}
export default ResetPassword
