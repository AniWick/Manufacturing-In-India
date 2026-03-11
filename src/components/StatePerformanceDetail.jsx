import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, DollarSign, MapPin } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const StatePerformanceDetail = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 animate-pulse">
        <div className="h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg"></div>
      </div>
    );
  }

  const states = data?.states || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">All States Manufacturing Performance</h3>
          <p className="text-sm text-gray-600 mt-1">Complete ranking of {states.length} states by growth metrics</p>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white sticky top-0">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Rank</th>
                <th className="text-left px-6 py-4 font-semibold">State</th>
                <th className="text-left px-6 py-4 font-semibold">Growth Rate</th>
                <th className="text-left px-6 py-4 font-semibold">Total Investment</th>
                <th className="text-left px-6 py-4 font-semibold">Main Manufacturing Hubs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {states.map((state, idx) => {
                const growthColor = state.growth >= 8 ? 'text-green-700 bg-green-50' : state.growth >= 6 ? 'text-blue-700 bg-blue-50' : 'text-orange-700 bg-orange-50';
                const bgColor = idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-gray-50 to-white';

                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`${bgColor} hover:bg-purple-100 transition-colors border-b border-gray-200 last:border-b-0`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        {state.rank <= 5 ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.02 + 0.1 }}
                            className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full"
                          >
                            <Award className="w-4 h-4 text-amber-600" />
                            <span className="font-bold text-amber-700 text-sm">#{state.rank}</span>
                          </motion.div>
                        ) : (
                          <span className="font-semibold text-gray-600 text-lg">#{state.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-base">{state.state}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm ${growthColor}`}>
                        <TrendingUp className="w-4 h-4" />
                        +{state.growth}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-gray-900">₹{state.investment}Cr</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{state.mainCities?.join(', ')}</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-md"
          >
            <p className="text-sm font-medium text-gray-600">Total States Tracked</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{states.length}</p>
            <p className="text-xs text-gray-600 mt-2">Across India</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-300 shadow-md"
          >
            <p className="text-sm font-medium text-gray-600">Average Growth Rate</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {states.length > 0 ? (states.reduce((sum, s) => sum + s.growth, 0) / states.length).toFixed(1) : '0'}%
            </p>
            <p className="text-xs text-gray-600 mt-2">Year-on-year</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 shadow-md"
          >
            <p className="text-sm font-medium text-gray-600">Total Investment</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              ₹{states.length > 0 ? (states.reduce((sum, s) => sum + (s.investment || 0), 0) / 1000).toFixed(0) : '0'}K Cr
            </p>
            <p className="text-xs text-gray-600 mt-2">Committed capital</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatePerformanceDetail;
