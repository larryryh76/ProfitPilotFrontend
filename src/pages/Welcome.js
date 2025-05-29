import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect to login after 10 seconds
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    navigate('/login'); // Manual continue also goes to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to ProfitPilot</h1>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 text-left">
          Here's how it works:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>You earn <strong>$0.70</strong> every 2 hours through mining.</li>
            <li>Boost your mining rate by paying $3 — each boost doubles your income rate.</li>
            <li>Invite friends using your referral code and earn <strong>$2</strong> for each registration.</li>
            <li>Create 1 token for free. Additional tokens cost <strong>$5</strong> each (max 5).</li>
            <li>Income is locked until <strong>June 6, 2025</strong> (6-month countdown).</li>
          </ul>
        </p>
        <button
          onClick={handleContinue}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition transform active:scale-95"
        >
          Let’s Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
