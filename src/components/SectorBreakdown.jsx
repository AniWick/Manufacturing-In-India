import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DataContext } from '../context/DataContext';

const SectorBreakdown = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const sectors = data?.sectors || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sector-wise Growth Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart for Growth Rates */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Growth Rates by Sector</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sectors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="growth" fill="#8884d8" name="Growth %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for Market Share */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Market Share Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sectors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, share }) => `${name}: ${share}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="share"
                >
                  {sectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Details Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Sector</th>
                <th className="text-left p-3 font-semibold text-gray-700">Growth %</th>
                <th className="text-left p-3 font-semibold text-gray-700">Market Share %</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-white transition-colors">
                  <td className="p-3">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: sector.color }}
                      />
                      {sector.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      +{sector.growth}%
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{sector.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default SectorBreakdown;
