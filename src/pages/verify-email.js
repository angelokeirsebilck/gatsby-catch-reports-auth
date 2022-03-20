import React, { useState, useEffect } from "react"

import axios from "axios"

import Layout from "../components/layout"

const VerifyEmail = ({ location }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(location.search)

  const verifyToken = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${process.env.GATSBY_API_URL}/auth/verify-email`,
        {
          verificationToken: params.get("token"),
          email: params.get("email"),
        }
      )
    } catch (error) {
      console.log(error.response)
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    verifyToken()
  }, [])

  if (loading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <h4>{error}</h4>
      </Layout>
    )
  }

  return (
    <Layout>
      <h2>Account Confirmed</h2>
    </Layout>
  )
}
export default VerifyEmail
