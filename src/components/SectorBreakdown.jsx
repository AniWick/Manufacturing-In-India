import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DataContext } from '../context/DataContext';

const SectorBreakdown = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedSector, setSelectedSector] = useState('');

  const sectors = data?.sectors || [];
  const activeSector = sectors.find((sector) => sector.name === selectedSector) || sectors[0];

  const sectorHistory = activeSector ? data?.sectorYearlyRecords?.[activeSector.name] || [] : [];

  const sectorLeaders = useMemo(() => {
    if (!activeSector || !data?.states) return [];
    const sectorKey = activeSector.name.toLowerCase().replace(/\s*&\s*/g, '_').replace(/\s+/g, '_');
    return data.states
      .map((state) => {
        const entries = Object.entries(state.portfolio || {});
        const match = entries.find(([key]) => key === sectorKey || key.startsWith(sectorKey.slice(0, 4)));
        return { state: state.state, value: match ? Number(match[1]) : 0, growth: state.growth };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [activeSector, data]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

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
                <Bar dataKey="growth" fill="#8884d8" name="Growth %" onClick={(entry) => setSelectedSector(entry.name)} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">Click a sector bar, pie slice, or table row to drill deeper.</p>
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
                  onClick={(entry) => setSelectedSector(entry.name)}
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
                <tr
                  key={idx}
                  className={`border-b border-gray-100 hover:bg-white transition-colors cursor-pointer ${activeSector?.name === sector.name ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedSector(sector.name)}
                >
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

        {/* Drill-down */}
        {activeSector && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl border border-gray-200 p-5"
          >
            <h4 className="text-base font-semibold text-gray-800 mb-3">{activeSector.name} Deep Dive</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Past Growth Records (2021-2025)</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={sectorHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="growth" stroke={activeSector.color || '#2563eb'} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Top States In This Sector</h5>
                <div className="space-y-2">
                  {sectorLeaders.map((leader, idx) => (
                    <div key={`${leader.state}-${idx}`} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                      <span className="text-sm font-medium text-gray-800">{leader.state}</span>
                      <span className="text-sm text-blue-700 font-semibold">{leader.value}% mix</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SectorBreakdown;
