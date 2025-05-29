import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Boost = () => {
  const [boostRate, setBoostRate] = useState(1);
  const [totalBoosts, setTotalBoosts] = useState(0);
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': token
  };

  const fetchBoostData = async () => {
    try {
      const res = await axios.get('https://profitpilot-backend.onrender.com/api/users/profile', { headers });
      setBoostRate(res.data.boostRate);
      setTotalBoosts(res.data.totalBoosts || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoostData();
  }, []);

  return (
    <div className="boost-page">
      <h2>Boost Summary</h2>
      <p><strong>Current Boost Multiplier:</strong> x{boostRate}</p>
      <p><strong>Total Boosts Simulated:</strong> {totalBoosts}</p>
      <p><em>Each $3 boost increases your mining rate multiplier.</em></p>
      <p><em>Payment simulation active — real payments will be added later.</em></p>
    </div>
  );
};

export default Boost;
