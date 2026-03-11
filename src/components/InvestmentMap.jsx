import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataContext } from '../context/DataContext';

const InvestmentMap = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 animate-pulse">
        <div className="h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg"></div>
      </div>
    );
  }

  const locations = data?.investmentLocations || [];
  const chartLocations = locations.slice(0, 12);
  const totalInvestment = locations.reduce((sum, loc) => sum + (loc.amount || 0), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Investment Hotspots</h3>
            <p className="text-sm text-gray-600 mt-1">Manufacturing investments by city (Top 30 locations)</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">₹{totalInvestment}Cr</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Investment Distribution</h4>
            {locations.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartLocations} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
                  <defs>
                    <linearGradient id="investGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="city" angle={-45} textAnchor="end" height={120} fontSize={12} />
                  <YAxis label={{ value: 'Investment (Cr)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value) => `₹${value}Cr`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }}
                  />
                  <Bar dataKey="amount" fill="url(#investGradient)" name="Investment (Cr)" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">No investment data available</div>
            )}
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
              <h4 className="font-semibold">Top 30 Investment Cities & Sectors</h4>
            </div>
            <div className="space-y-3 p-4 max-h-96 overflow-y-auto">
              {locations.map((location, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800">{idx + 1}. {location.city}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{location.state} | <span className="font-semibold text-blue-600">{location.sector}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">₹{location.amount}Cr</p>
                      <p className="text-xs text-gray-500">{((location.amount / totalInvestment) * 100).toFixed(1)}% of total</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(location.amount / Math.max(...locations.map(l => l.amount))) * 100}%` }}
                      transition={{ delay: idx * 0.05 + 0.2, duration: 0.8 }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentMap;
