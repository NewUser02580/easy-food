import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const getDotClass = (status) => {
    if (status === "Delivered") return "dot dot-delivered";
    if (status === "Out for delivery") return "dot dot-out";
    return "dot dot-processing";
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? item.name + " x" + item.quantity
                  : item.name + " x" + item.quantity + ", "
              )}
            </p>
            <p className="order-amount">₹{order.amount}.00</p>
            <p className="order-count">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
            <p className="order-status">
              <span className={getDotClass(order.status)}></span>
              {order.status}
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;