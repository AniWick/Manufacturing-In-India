import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DataContext } from '../context/DataContext';

const RegionalClusterCards = ({ selectedClusterName, onSelectCluster }) => {
  const { data, loading } = useContext(DataContext);

  const clusters = data?.regionalClusters || [];
  const selectedCluster = clusters.find((cluster) => cluster.name === selectedClusterName) || clusters[0];
  const clusterCities = useMemo(() => {
    if (!selectedCluster || !data?.cityProfiles) return [];
    return data.cityProfiles.filter((city) => selectedCluster.cities.includes(city.city));
  }, [data, selectedCluster]);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Regional Sector Deck</h3>
          <p className="text-sm text-gray-600">Interchange between major manufacturing regions and inspect their dedicated sector and city cards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {clusters.map((cluster) => (
          <button
            key={cluster.name}
            onClick={() => onSelectCluster?.(cluster.name)}
            className={`text-left p-4 rounded-xl border transition-all ${selectedCluster?.name === cluster.name ? 'bg-blue-600 text-white border-blue-700' : 'bg-white border-gray-200 hover:border-blue-300'}`}
          >
            <p className="font-semibold text-sm">{cluster.name}</p>
            <p className={`text-xs mt-2 ${selectedCluster?.name === cluster.name ? 'text-blue-100' : 'text-gray-600'}`}>
              Rs {cluster.combinedInvestment}Cr | {cluster.avgGrowth}% growth
            </p>
          </button>
        ))}
      </div>

      {selectedCluster && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 bg-white border border-gray-200 rounded-xl p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{selectedCluster.name}</h4>
              <p className="text-sm text-gray-600 mb-1">Cities: {selectedCluster.cities.join(', ')}</p>
              <p className="text-sm text-gray-600 mb-1">Combined Investment: Rs {selectedCluster.combinedInvestment}Cr</p>
              <p className="text-sm text-gray-600">Average Growth: {selectedCluster.avgGrowth}%</p>
            </div>
            <div className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">
              {selectedCluster.focusSectors.length} priority sectors
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Regional Sector Cards</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCluster.focusSectors.map((sector) => (
                  <div key={sector} className="bg-white rounded-lg border border-gray-200 p-3">
                    <p className="text-xs text-gray-500">Sector Focus</p>
                    <p className="font-semibold text-gray-800 mt-1">{sector}</p>
                    <p className="text-xs text-gray-600 mt-2">Aligned to {selectedCluster.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Key City Cards</p>
              <div className="space-y-3">
                {clusterCities.map((city) => (
                  <div key={city.city} className="bg-white rounded-lg border border-gray-200 p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{city.city}</p>
                      <p className="text-xs text-gray-500 mt-1">{city.leadSector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-700">Rs {city.currentInvestment}Cr</p>
                      <p className="text-xs text-gray-500">{city.currentGrowth}% growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegionalClusterCards;
