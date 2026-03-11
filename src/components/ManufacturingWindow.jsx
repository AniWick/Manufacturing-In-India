import React, { useContext, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import GrowthChart from './GrowthChart';
import SectorBreakdown from './SectorBreakdown';
import StateComparison from './StateComparison';
import MetricsDashboard from './MetricsDashboard';
import { DataContext } from '../context/DataContext';

const ManufacturingWindow = ({ isOpen, onClose }) => {
  const { data, loading, error, fetchData, refetchData } = useContext(DataContext);

  useEffect(() => {
    if (isOpen && !data) {
      fetchData();
    }
  }, [isOpen, data, fetchData]);

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <motion.div
        className="relative top-1/2 mx-auto w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-3xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Indian Manufacturing Growth Dashboard
          </h2>
          <div className="flex items-center gap-3">
            {!loading && data && (
              <button
                onClick={refetchData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors hover:rotate-180 duration-300"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Error State */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              <p className="font-semibold">Error Loading Data</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={refetchData}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && !data ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl h-24 animate-pulse"
                  />
                ))}
              </div>
              <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl h-80 animate-pulse" />
              <div className="bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl h-96 animate-pulse" />
            </motion.div>
          ) : (
            <>
              {/* Data Last Updated */}
              {data && (
                <p className="text-xs text-gray-500 text-right">
                  Last updated: {new Date(data.lastUpdated).toLocaleString()}
                </p>
              )}

              <AnimatePresence mode="wait">
                <MetricsDashboard key="metrics" />
                <GrowthChart key="growth" />
                <SectorBreakdown key="sectors" />
                <StateComparison key="states" />
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!loading && data && (
          <div className="p-6 border-t border-gray-200 flex justify-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Download Data
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors">
              Share Report
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ManufacturingWindow;
