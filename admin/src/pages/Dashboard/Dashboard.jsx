import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Dashboard.css";

const [todayOrders, setTodayOrders] = useState(0);
const [avgOrderValue, setAvgOrderValue] = useState(0);

const Dashboard = ({ url }) => {
  const { token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });

    if (response.data.success) {
      const data = response.data.data;
      setOrders(data);

      let total = 0;
      let today = 0;

      const todayDate = new Date().toDateString();

      data.forEach((order) => {
        total += order.amount;

        const orderDate = new Date(order.createdAt).toDateString();
        if (orderDate === todayDate) {
          today += order.amount;
        }
      });

      setTotalRevenue(total);
      setTodayRevenue(today);
      setTotalOrders(data.length);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

        <div className="card">
          <h3>Today’s Revenue</h3>
          <p>₹{todayRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;