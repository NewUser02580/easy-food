import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { Chart, registerables } from "chart.js";
import "./Dashboard.css";

Chart.register(...registerables);

const Dashboard = ({ url }) => {
  const { token } = useContext(StoreContext);
  const revenueChartRef = useRef(null);
  const statusChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const statusChartInstance = useRef(null);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [last7Data, setLast7Data] = useState({ labels: [], data: [] });

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });

    if (response.data.success) {
      const data = response.data.data;
      const paid = data.filter((o) => o.payment === true);

      let total = 0;
      let today = 0;
      let todayCount = 0;
      const todayDate = new Date().toISOString().slice(0, 10);

      paid.forEach((order) => {
        total += order.amount;
        const orderDate = new Date(order.date).toISOString().slice(0, 10);
        if (orderDate === todayDate) {
          today += order.amount;
          todayCount++;
        }
      });

      setTotalRevenue(total);
      setTodayRevenue(today);
      setTotalOrders(paid.length);
      setTodayOrders(todayCount);
      setAvgOrderValue(paid.length ? Math.round(total / paid.length) : 0);

      const recent = [...paid]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentOrders(recent);

      const sc = {};
      paid.forEach((o) => {
        sc[o.status] = (sc[o.status] || 0) + 1;
      });
      setStatusCounts(sc);

      const labels = [];
      const revenues = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        const ds = d.toISOString().slice(0, 10);
        labels.push(d.toLocaleDateString("en-IN", { weekday: "short" }));
        revenues.push(
          paid
            .filter((o) => new Date(o.date).toISOString().slice(0, 10) === ds)
            .reduce((s, o) => s + o.amount, 0)
        );
      }
      setLast7Data({ labels, data: revenues });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!last7Data.labels.length) return;
    if (revenueChartInstance.current) revenueChartInstance.current.destroy();
    revenueChartInstance.current = new Chart(revenueChartRef.current, {
      type: "bar",
      data: {
        labels: last7Data.labels,
        datasets: [
          {
            label: "Revenue",
            data: last7Data.data,
            backgroundColor: "#378ADD",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: {
            grid: { color: "rgba(128,128,128,0.1)" },
            ticks: {
              callback: (v) => "₹" + v,
              font: { size: 11 },
            },
          },
        },
      },
    });
  }, [last7Data]);

  useEffect(() => {
    const labels = Object.keys(statusCounts);
    if (!labels.length) return;
    if (statusChartInstance.current) statusChartInstance.current.destroy();
    statusChartInstance.current = new Chart(statusChartRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: labels.map((l) => statusCounts[l]),
            backgroundColor: ["#378ADD", "#1D9E75", "#BA7517", "#D4537E"],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: "65%",
      },
    });
  }, [statusCounts]);

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered";
    if (status === "Out for delivery") return "status-out";
    return "status-processing";
  };

  return (
    <div className="dashboard">
      <div className="db-header">
        <h2>Dashboard</h2>
        <span className="db-live">Live</span>
      </div>

      <div className="metrics">
        <div className="metric">
          <p className="metric-label">Total orders</p>
          <p className="metric-value">{totalOrders}</p>
          <p className="metric-sub">All time paid</p>
        </div>
        <div className="metric">
          <p className="metric-label">Total revenue</p>
          <p className="metric-value">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <p className="metric-sub">All time</p>
        </div>
        <div className="metric">
          <p className="metric-label">Today's revenue</p>
          <p className="metric-value">₹{todayRevenue.toLocaleString("en-IN")}</p>
          <p className="metric-sub">{todayOrders} order{todayOrders !== 1 ? "s" : ""} today</p>
        </div>
        <div className="metric">
          <p className="metric-label">Avg order value</p>
          <p className="metric-value">₹{avgOrderValue.toLocaleString("en-IN")}</p>
          <p className="metric-sub">Per paid order</p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <p className="chart-title">Revenue — last 7 days</p>
          <div className="chart-legend">
            <span><span className="legend-dot" style={{ background: "#378ADD" }}></span>Daily revenue</span>
          </div>
          <div className="chart-wrap">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </div>

        <div className="chart-card">
          <p className="chart-title">Order status</p>
          <div className="chart-legend" id="status-legend">
            {Object.keys(statusCounts).map((s, i) => (
              <span key={s}>
                <span className="legend-dot" style={{ background: ["#378ADD", "#1D9E75", "#BA7517", "#D4537E"][i] }}></span>
                {s} {statusCounts[s]}
              </span>
            ))}
          </div>
          <div className="chart-wrap">
            <canvas ref={statusChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="recent-card">
        <p className="recent-title">Recent orders</p>
        {recentOrders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          recentOrders.map((order, index) => (
            <div key={index} className="order-row">
              <div>
                <p className="order-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="order-items">
                  {order.items.map((i) => i.name + " x" + i.quantity).join(", ")}
                </p>
              </div>
              <div className="order-right">
                <span className="order-amt">₹{order.amount}</span>
                <span className={`status-pill ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;