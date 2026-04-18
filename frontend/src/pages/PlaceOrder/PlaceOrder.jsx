import React, { useContext, useEffect, useState } from "react"
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: "",
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(d => ({ ...d, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] })
      }
    })
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    }
    const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      window.location.replace(response.data.session_url)
    } else {
      toast.error("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in first")
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty")
      navigate("/cart")
    }
  }, [token])

  const Field = ({ label, ...props }) => (
    <div className="form-group">
      <label>{label}</label>
      <input onChange={onChangeHandler} {...props} />
    </div>
  )

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="section-title">Delivery Information</p>

        <div className="multi-fields">
          <Field label="First Name" name="firstName" value={data.firstName} type="text" placeholder="First name" required />
          <Field label="Last Name" name="lastName" value={data.lastName} type="text" placeholder="Last name" required />
        </div>
        <Field label="Email Address" name="email" value={data.email} type="email" placeholder="your@email.com" required />
        <Field label="Street Address" name="street" value={data.street} type="text" placeholder="Street address" required />
        <div className="multi-fields">
          <Field label="City" name="city" value={data.city} type="text" placeholder="City" required />
          <Field label="State" name="state" value={data.state} type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <Field label="ZIP Code" name="zipcode" value={data.zipcode} type="text" placeholder="ZIP code" required />
          <Field label="Country" name="country" value={data.country} type="text" placeholder="Country" required />
        </div>
        <Field label="Phone Number" name="phone" value={data.phone} type="tel" placeholder="+91 00000 00000" required />
      </div>

      <div className="place-order-right">
        <div className="order-summary-card">
          <h2>Order Summary</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr className="summary-divider" />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr className="summary-divider" />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment →</button>
          <p className="secure-note">🔒 Secure &amp; encrypted payment</p>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder