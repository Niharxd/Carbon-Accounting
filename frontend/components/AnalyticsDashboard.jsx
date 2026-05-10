'use client';

import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchLogs } from '@/services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const response = await fetchLogs();
      setLogs(response.logs || []);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data. Please ensure backend is running.');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
    
    // Listen for prediction events to auto-refresh
    const handlePredictionMade = () => {
      setTimeout(() => loadLogs(), 1000); // Delay to ensure DB is updated
    };
    
    window.addEventListener('predictionMade', handlePredictionMade);
    
    return () => {
      window.removeEventListener('predictionMade', handlePredictionMade);
    };
  }, []);

  // Prepare data for Emission Trend Line Chart
  const emissionTrendData = {
    labels: logs.slice(0, 10).reverse().map((log, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Emissions (kg CO₂)',
        data: logs.slice(0, 10).reverse().map((log) => log.emissions),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Prepare data for Carbon Intensity by Region Bar Chart
  const regionData = logs.reduce((acc, log) => {
    if (!acc[log.region]) {
      acc[log.region] = { total: 0, count: 0 };
    }
    acc[log.region].total += log.emissions;
    acc[log.region].count += 1;
    return acc;
  }, {});

  const carbonIntensityData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        label: 'Average Emissions by Region (kg CO₂)',
        data: Object.values(regionData).map((r) => (r.total / r.count).toFixed(2)),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-8 text-center">
          <p className="text-red-200">{error}</p>
          <button
            onClick={loadLogs}
            className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-12">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-300">No data available. Make some predictions to see analytics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 space-y-8">
      {/* Analytics Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-400">Historical emission data and trends</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emission Trend Chart */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Emission Trend</h3>
          <div className="h-64">
            <Line data={emissionTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Carbon Intensity by Region Chart */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Average Emissions by Region</h3>
          <div className="h-64">
            <Bar data={carbonIntensityData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Logs Table */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Calculations</h3>
          <button
            onClick={loadLogs}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
          >
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">CPU</th>
                <th className="py-3 px-4 text-gray-400 font-medium">RAM</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Storage</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Region</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Emissions</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 10).map((log, index) => (
                <tr key={log.id || index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white">{log.cpu}</td>
                  <td className="py-3 px-4 text-white">{log.ram} GB</td>
                  <td className="py-3 px-4 text-white">{log.storage} GB</td>
                  <td className="py-3 px-4 text-white">{log.region}</td>
                  <td className="py-3 px-4 text-green-400 font-semibold">
                    {log.emissions.toFixed(2)} kg CO₂
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
