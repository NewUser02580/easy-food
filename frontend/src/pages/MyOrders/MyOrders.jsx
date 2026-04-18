import React, { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { assets } from "../../assets/assets"

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    )
    if (response.data.success) setData(response.data.data)
  }

  useEffect(() => { if (token) fetchOrders() }, [token])

  const getStatusClass = (status) => {
    if (status === "Delivered") return "delivered"
    if (status === "Out for delivery") return "out"
    return "processing"
  }

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <h2>My Orders</h2>
        {data.length > 0 && <p>{data.length} order{data.length > 1 ? "s" : ""} placed</p>}
      </div>

      {data.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
        </div>
      ) : (
        <div className="orders-list">
          {data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Order" />
              <p className="order-items-text">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} ×${item.quantity}`
                    : `${item.name} ×${item.quantity}, `
                )}
              </p>
              <p className="order-amount">₹{order.amount}.00</p>
              <span className="order-count">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </span>
              <p className="order-status">
                <span className={`status-dot ${getStatusClass(order.status)}`}></span>
                {order.status}
              </p>
              <button className="track-btn" onClick={fetchOrders}>Track Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders