import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Dashboard.css";

const Dashboard = ({ url }) => {
  const { token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });

    if (response.data.success) {
      const data = response.data.data;
      setOrders(data);

let total = 0;
let today = 0;
let todayCount = 0;
let validOrders = 0;

const todayDate = new Date().toISOString().slice(0, 10);

data.forEach((order) => {
  if (order.payment === true) {
    total += order.amount;
    validOrders++;

    const orderDate = new Date(order.date).toISOString().slice(0, 10);

    if (orderDate === todayDate) {
      today += order.amount;
      todayCount++;
    }
  }
});

setTotalRevenue(total);
setTodayRevenue(today);
setTotalOrders(validOrders);
setTodayOrders(todayCount);
setAvgOrderValue(validOrders ? (total / validOrders).toFixed(2) : 0);
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