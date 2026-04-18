import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from "react-toastify"

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId })
    if (response.data.success) {
      toast.success("Order placed successfully! 🎉")
      navigate("/myorders")
    } else {
      toast.error("Payment verification failed")
      navigate("/")
    }
  }

  useEffect(() => { verifyPayment() }, [])

  return (
    <div className='verify'>
      <div className="verify-card">
        <div className="verify-spinner"></div>
        <h3>Verifying Payment</h3>
        <p>Please wait while we confirm your payment. Do not close this page.</p>
      </div>
    </div>
  )
}

export default Verify