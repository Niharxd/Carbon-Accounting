'use client';

import { useState } from 'react';
import { predictEmissions } from '@/services/api';

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    cpu: '',
    ram: '',
    storage: '',
    region: 'IN',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = {
        cpu: parseFloat(formData.cpu),
        ram: parseFloat(formData.ram),
        storage: parseFloat(formData.storage),
        region: formData.region,
      };

      const response = await predictEmissions(data);
      setResult(response);
      
      // Trigger analytics refresh by dispatching custom event
      window.dispatchEvent(new Event('predictionMade'));
    } catch (err) {
      setError('Failed to connect to backend. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPU Input */}
          <div>
            <label htmlFor="cpu" className="block text-sm font-medium text-gray-300 mb-2">
              CPU (cores)
            </label>
            <input
              type="number"
              id="cpu"
              name="cpu"
              value={formData.cpu}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 20"
            />
          </div>

          {/* RAM Input */}
          <div>
            <label htmlFor="ram" className="block text-sm font-medium text-gray-300 mb-2">
              RAM (GB)
            </label>
            <input
              type="number"
              id="ram"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 16"
            />
          </div>

          {/* Storage Input */}
          <div>
            <label htmlFor="storage" className="block text-sm font-medium text-gray-300 mb-2">
              Storage (GB)
            </label>
            <input
              type="number"
              id="storage"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              required
              step="0.1"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 300"
            />
          </div>

          {/* Region Select */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
              Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="IN">India (IN)</option>
              <option value="US">United States (US)</option>
              <option value="SE">Sweden (SE)</option>
              <option value="DE">Germany (DE)</option>
              <option value="FR">France (FR)</option>
              <option value="CN">China (CN)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? 'Predicting...' : 'Predict Emissions'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-900/50 border border-red-700 rounded-lg p-4">
          <p className="text-red-200 text-center">{error}</p>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Prediction Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Carbon Intensity</p>
              <p className="text-3xl font-bold text-blue-400">{result.carbon_intensity}</p>
              <p className="text-gray-500 text-xs mt-1">gCO₂/kWh</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Predicted Emissions</p>
              <p className="text-3xl font-bold text-green-400">
                {result.predicted_emissions.toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs mt-1">kg CO₂</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Input Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">CPU</p>
                <p className="text-white font-medium">{result.cpu} cores</p>
              </div>
              <div>
                <p className="text-gray-500">RAM</p>
                <p className="text-white font-medium">{result.ram} GB</p>
              </div>
              <div>
                <p className="text-gray-500">Storage</p>
                <p className="text-white font-medium">{result.storage} GB</p>
              </div>
              <div>
                <p className="text-gray-500">Region</p>
                <p className="text-white font-medium">{result.region}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
