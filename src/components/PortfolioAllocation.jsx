import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DataContext } from '../context/DataContext';
import { TrendingUp } from 'lucide-react';

const PortfolioAllocation = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedState, setSelectedState] = useState(0);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 animate-pulse">
        <div className="h-80 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg"></div>
      </div>
    );
  }

  const states = data?.states || [];
  const topStates = states.filter(s => s.state);
  const currentState = topStates[selectedState] || topStates[0];

  // Convert portfolio object to array
  const portfolioData = currentState?.portfolio
    ? Object.entries(currentState.portfolio).map(([name, value]) => ({
        name: name.replace(/_/g, ' ').toUpperCase().substring(0, 15),
        value: parseInt(value),
        fullName: name.replace(/_/g, ' ').toUpperCase()
      }))
        .sort((left, right) => right.value - left.value)
    : [];

  const colors = ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#6b7280', '#14b8a6', '#f97316', '#64748b', '#84cc16', '#a855f7'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Sector Portfolio by State</h3>

        {/* State Selector */}
        <div className="mb-8 bg-white rounded-xl p-4 shadow-md">
          <label className="text-sm font-semibold text-gray-700 block mb-3">Select State to View Portfolio</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(Number(e.target.value))}
            className="w-full p-4 border-2 border-green-300 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            {topStates.map((state, idx) => (
              <option key={idx} value={idx}>
                {state.state} • ₹{state.investment}Cr • Growth: {state.growth}% • Rank: #{state.rank}
              </option>
            ))}
          </select>
        </div>

        {/* Portfolio Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center"
            key={selectedState}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-4 self-start w-full">Sector Distribution (%)</h4>
            {portfolioData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={360}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 w-full rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">All sector labels</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {portfolioData.map((item, index) => (
                      <div key={item.fullName} className="flex items-center justify-between gap-3 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs text-gray-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors[index % colors.length] }}
                          />
                          <span className="truncate">{item.fullName}</span>
                        </div>
                        <span className="font-semibold text-gray-900 flex-shrink-0">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center">No portfolio data</div>
            )}
          </motion.div>

          {/* Portfolio Details Card */}
          <motion.div
            key={`details-${selectedState}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                <p className="font-semibold">Sector Breakdown for {currentState?.state}</p>
              </div>
              
              {portfolioData.length > 0 ? (
                <div className="p-6 flex-1 space-y-3">
                  {portfolioData.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-800 text-sm">{item.fullName}</span>
                          <span className="font-bold text-gray-700">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: idx * 0.05 + 0.2, duration: 0.6 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: colors[idx % colors.length] }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-6 flex items-center justify-center text-gray-400">
                  <p>No portfolio data for this state</p>
                </div>
              )}

              {/* Investment Summary */}
              <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-green-50 to-emerald-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Investment:</span>
                  <span className="text-xl font-bold text-green-600">₹{currentState?.investment}Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Growth Rate:</span>
                  <span className="text-xl font-bold text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />+{currentState?.growth}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Rank:</span>
                  <span className="text-xl font-bold text-blue-600">#{currentState?.rank}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioAllocation;
