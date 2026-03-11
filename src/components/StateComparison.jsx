import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DataContext } from '../context/DataContext';
import { Award, MapPin, Building2, Car, TrendingUp } from 'lucide-react';

const StateComparison = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedStateName, setSelectedStateName] = useState('');

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-80 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const states = data?.states || [];

  // Sort by growth for better visualization
  const sortedStates = [...states].sort((a, b) => b.growth - a.growth);
  const selectedState = sortedStates.find((s) => s.state === selectedStateName) || sortedStates[0];

  const stateHistory = selectedState ? data?.stateYearlyRecords?.[selectedState.state] || [] : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">State-wise Manufacturing Performance</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedStates}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value) => `${value}%`}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="growth" fill="#10b981" name="Growth %" radius={[8, 8, 0, 0]} onClick={(entry) => setSelectedStateName(entry.state)} />
          </BarChart>
        </ResponsiveContainer>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StateComparison;
