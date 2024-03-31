import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
const PerformanceReport = () => {
  const news = [
    {
      name: "India News",
      feed: "12$",
      views: "125",
    },
    {
      name: "News Nation",
      feed: "5$",
      views: "120",
    },
    {
      name: "Bharat News",
      feed: "7$",
      views: "140",
    },
    {
      name: "ZEE News",
      feed: "20$",
      views: "100",
    },
    {
      name: "Republic News",
      feed: "21$",
      views: "1000",
    },
    {
      name: "Hindustan News",
      feed: "30$",
      views: "20000",
    },
    {
      name: "AAj Tak",
      feed: "15$",
      views: "500",
    },
  ];

  return (
    <>
      <h1 className="text-center mt-4 text-decoration-underline">
        Data Anyliysis
      </h1>
      <ResponsiveContainer width="100%" aspect={3} className="m-auto">
        <BarChart data={news}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#8883d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PerformanceReport;
