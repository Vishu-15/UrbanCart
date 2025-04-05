import React from "react";
import "./Stats.css";
import { FaUsers, FaShoppingCart, FaStar, FaTruck } from "react-icons/fa";

const Stats = () => {
  const statsData = [
    { icon: <FaUsers />, value: "50K+", label: "Happy Customers" },
    { icon: <FaShoppingCart />, value: "20K+", label: "Orders Delivered" },
    { icon: <FaStar />, value: "4.8/5", label: "Average Rating" },
    { icon: <FaTruck />, value: "500+", label: "Cities Covered" },
  ];

  return (
    <div className="stats-container">
      {statsData.map((stat, idx) => (
        <div className="stat-card" key={idx}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
