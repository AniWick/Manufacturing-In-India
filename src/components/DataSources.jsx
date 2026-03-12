import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const DataSources = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const sources = data?.dataSources || [
    { name: 'Ministry of Statistics & Programme Implementation', weight: 25 },
    { name: 'Central Bank of India (RBI)', weight: 20 },
    { name: 'Corporate Affairs Ministry', weight: 15 },
    { name: 'Industry Association Reports', weight: 20 },
    { name: 'State Government Data', weight: 15 },
    { name: 'Sector-specific Agencies', weight: 5 }
  ];
  const sectorProfiles = data?.sectorReportingProfiles || {};

  const totalWeight = sources.reduce((sum, s) => sum + s.weight, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">Data Sources & Methodology</h3>
        </div>

        <div className="space-y-3">
          {sources.map((source, idx) => {
            const percentage = (source.weight / totalWeight) * 100;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{source.name}</p>
                      <p className="text-xs text-gray-600 mt-1">Data Contribution Weight</p>
                    </div>
                  </div>
                  <span className="font-bold text-indigo-600 text-lg">{source.weight}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: idx * 0.08 + 0.2, duration: 0.8 }}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {Object.keys(sectorProfiles).length > 0 && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Sector Reporting Benchmarks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(sectorProfiles).map(([sectorName, profile]) => (
                <div key={sectorName} className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="font-medium text-gray-800">{sectorName}</p>
                  <p className="text-xs text-gray-600 mt-1">Primary: {profile.primaryAgency} | Exports: {profile.exportAgency}</p>
                  <p className="text-xs text-gray-600 mt-1">Cadence: {profile.cadence}</p>
                  <p className="text-xs text-gray-500 mt-1">{profile.benchmarkSeries}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-900 mb-2">Data Collection & Updates</h4>
          <ul className="text-sm text-indigo-800 space-y-1 list-disc list-inside">
            <li>Monthly IIP data sourced from Ministry of Statistics & Programme Implementation</li>
            <li>Investment data collected from RBI quarterly reports and state industrial departments</li>
            <li>State performance metrics updated quarterly with latest available data</li>
            <li>This dashboard aggregates data from {sources.length} major authoritative sources</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default DataSources;
