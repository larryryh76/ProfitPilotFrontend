// src/components/Chart.js
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://profitpilot-backend.onrender.com/api/tokens/performance',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Convert data for recharts
        const formatted = response.data.map((point, i) => ({
          time: point.timestamp || `T${i + 1}`,
          value: point.value,
        }));

        setChartData(formatted);
      } catch (error) {
        console.error('Error fetching token performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  if (loading) return <div className="text-orange-500">Loading chart...</div>;

  return (
    <div className="w-full h-64 bg-[#1a1a1a] p-4 rounded-lg shadow-md">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', borderColor: '#ff8c00' }}
            labelStyle={{ color: '#ff8c00' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff8c00"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#ff8c00' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
