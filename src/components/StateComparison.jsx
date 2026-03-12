import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DataContext } from '../context/DataContext';
import { Award, MapPin, Building2, Car, TrendingUp, Ship, Factory } from 'lucide-react';

const StateComparison = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedStateName, setSelectedStateName] = useState('');

  const states = data?.states || [];

  // Sort by growth for better visualization
  const sortedStates = [...states].sort((a, b) => b.growth - a.growth);
  const selectedState = sortedStates.find((s) => s.state === selectedStateName) || sortedStates[0];
  const chartWidth = Math.max(sortedStates.length * 72, 960);
  const stateHistory = selectedState ? data?.stateYearlyRecords?.[selectedState.state] || [] : [];

  const stateLeadership = useMemo(() => {
    if (!selectedState) return [];
    return data?.stateProductLeadership?.[selectedState.state] || [];
  }, [data, selectedState]);

  const stateLeadershipSummary = useMemo(() => {
    const domestic = stateLeadership.reduce((sum, item) => sum + item.domestic, 0);
    const exports = stateLeadership.reduce((sum, item) => sum + item.exports, 0);
    const combined = domestic + exports;
    return {
      domestic,
      exports,
      combined,
      exportMix: combined ? ((exports / combined) * 100).toFixed(1) : '0.0'
    };
  }, [stateLeadership]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-80 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">State-wise Manufacturing Performance</h3>
        
        <div className="overflow-x-auto pb-2">
          <div style={{ width: `${chartWidth}px`, minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedStates} margin={{ top: 8, right: 16, left: 8, bottom: 12 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="growth" fill="#10b981" name="Growth %" radius={[8, 8, 0, 0]} onClick={(entry) => setSelectedStateName(entry.state)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Click a bar or state card to open deeper state records.</p>

        {/* State Rankings */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-500" />
              Top Performing States
            </h4>
            <div className="space-y-2">
              {sortedStates.slice(0, 4).map((state, idx) => (
                <motion.div
                  key={state.state}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex justify-between items-center p-3 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${selectedState?.state === state.state ? 'border-green-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedStateName(state.state)}
                >
                  <div className="flex items-center">
                    <span className="font-bold text-manufacturing-orange mr-3">#{idx + 1}</span>
                    <span className="font-medium text-gray-800">{state.state}</span>
                  </div>
                  <span className="text-green-600 font-semibold">+{state.growth}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              All States Overview
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {states.map((state, idx) => (
                <div
                  key={`${state.state}-${idx}`}
                  className={`flex justify-between items-center p-2 text-sm border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 ${selectedState?.state === state.state ? 'bg-green-50' : ''}`}
                  onClick={() => setSelectedStateName(state.state)}
                >
                  <span className="text-gray-700">{state.state}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-manufacturing-teal h-2 rounded-full"
                        style={{ width: `${Math.min(state.growth * 12, 100)}%` }}
                      />
                    </div>
                    <span className="text-gray-600 font-medium w-10">{state.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drill-down panel */}
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl border border-gray-200 p-5"
          >
            <h4 className="text-base font-semibold text-gray-800 mb-3">
              {selectedState.state} Deep Dive
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Current Growth</p>
                <p className="text-xl font-bold text-green-700 flex items-center gap-1"><TrendingUp className="w-4 h-4" />{selectedState.growth}%</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Investment</p>
                <p className="text-xl font-bold text-blue-700 flex items-center gap-1"><Building2 className="w-4 h-4" />₹{selectedState.investment}Cr</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">VAHAN Registrations</p>
                <p className="text-xl font-bold text-amber-700 flex items-center gap-1"><Car className="w-4 h-4" />{selectedState.vehicleRegistrations?.toLocaleString()}</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Lead domestic output</p>
                <p className="text-xl font-bold text-sky-700 flex items-center gap-1"><Factory className="w-4 h-4" />{stateLeadershipSummary.domestic.toLocaleString()}</p>
              </div>
              <div className="bg-violet-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Lead exports</p>
                <p className="text-xl font-bold text-violet-700 flex items-center gap-1"><Ship className="w-4 h-4" />{stateLeadershipSummary.exports.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Manufacturing Cities</p>
              <p className="text-sm text-gray-600">{selectedState.mainCities?.join(', ')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Past Growth Records (2021-2025)</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={stateHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Past Investment Records (Cr)</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={stateHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}Cr`} />
                    <Line type="monotone" dataKey="investment" stroke="#2563eb" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
              <div className="rounded-xl border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">Lead product</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Sector</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Domestic</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Exports</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Export mix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateLeadership.map((item) => (
                      <tr key={`${item.sector}-${item.product}`} className="border-b border-gray-100 last:border-0">
                        <td className="p-3 font-medium text-gray-800">{item.product}</td>
                        <td className="p-3 text-gray-700">{item.sector}</td>
                        <td className="p-3 text-gray-700">{item.domestic.toLocaleString()}</td>
                        <td className="p-3 text-gray-700">{item.exports.toLocaleString()}</td>
                        <td className="p-3 text-gray-700">{item.exportMix}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4 space-y-3">
                <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-800 mb-1">State product leadership</p>
                  <p>{selectedState.state} currently appears in {stateLeadership.length} tracked product leadership lines across manufacturing sectors.</p>
                </div>
                {stateLeadership[0] && (
                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm text-blue-900">
                    Biggest lead line: {stateLeadership[0].product} in {stateLeadership[0].sector}, with {stateLeadership[0].domestic.toLocaleString()} domestic and {stateLeadership[0].exports.toLocaleString()} export units attributed to the state leadership basket.
                  </div>
                )}
                <div className="rounded-lg bg-violet-50 border border-violet-100 p-3 text-sm text-violet-900">
                  Export orientation across lead lines: {stateLeadershipSummary.exportMix}%.
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm text-gray-700">
                  Source basis: leadership lines are aligned to sector product reporting agencies exposed in the sector view and attributed to leading states listed for each product category.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StateComparison;
