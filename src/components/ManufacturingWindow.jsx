import React, { useContext, useEffect, useMemo, useState } from 'react';
import { X, RefreshCw, LayoutGrid, Map, Factory, Building2, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import GrowthChart from './GrowthChart';
import SectorBreakdown from './SectorBreakdown';
import StateComparison from './StateComparison';
import MetricsDashboard from './MetricsDashboard';
import InvestmentMap from './InvestmentMap';
import PortfolioAllocation from './PortfolioAllocation';
import StatePerformanceDetail from './StatePerformanceDetail';
import DataSources from './DataSources';
import DelhiNCRCard from './DelhiNCRCard';
import RegionalClusterCards from './RegionalClusterCards';
import CityDrilldown from './CityDrilldown';
import { DataContext } from '../context/DataContext';

const ManufacturingWindow = ({ isOpen, onClose }) => {
  const { data, loading, error, fetchData, refetchData } = useContext(DataContext);
  const [activePage, setActivePage] = useState('overview');
  const [selectedClusterName, setSelectedClusterName] = useState('');

  useEffect(() => {
    if (isOpen && !data) {
      fetchData();
    }
  }, [isOpen, data, fetchData]);

  useEffect(() => {
    if (!selectedClusterName && data?.regionalClusters?.length) {
      setSelectedClusterName(data.regionalClusters[0].name);
    }
  }, [data, selectedClusterName]);

  const handleDownloadData = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `manufacturing-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareReport = () => {
    if (!data) return;
    const shareText = `Indian Manufacturing Dashboard Report\n\nGrowth Rate: ${data.currentGrowth}%\nStates: ${data.states.length}\nSectors: ${data.sectors.length}\n\nCheck it out: ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Manufacturing Dashboard',
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Report copied to clipboard!');
      });
    }
  };

  const pages = useMemo(() => ([
    {
      id: 'overview',
      label: 'Overview',
      description: 'Quick national snapshot and key regional highlight cards.',
      icon: LayoutGrid
    },
    {
      id: 'regions',
      label: 'Regions',
      description: 'Switch between regional clusters and sector focus decks.',
      icon: Map
    },
    {
      id: 'sectors',
      label: 'Sectors',
      description: 'Sector performance and state portfolio concentration.',
      icon: Factory
    },
    {
      id: 'cities',
      label: 'Cities',
      description: 'Top 50 city hotspots and inner city-level drill-down.',
      icon: Building2
    },
    {
      id: 'states',
      label: 'States',
      description: 'State trends, rankings and detailed performance tables.',
      icon: Map
    },
    {
      id: 'sources',
      label: 'Sources',
      description: 'Methodology and source coverage behind the dashboard.',
      icon: Database
    }
  ]), []);

  const activePageMeta = pages.find((page) => page.id === activePage) || pages[0];
  const selectedCluster = data?.regionalClusters?.find((cluster) => cluster.name === selectedClusterName)
    || data?.regionalClusters?.[0]
    || null;

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-white overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Manufacturing Dashboard
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

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto space-y-6">
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

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{activePageMeta.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activePageMeta.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pages.map((page) => {
                    const Icon = page.icon;
                    const isActive = activePage === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => setActivePage(page.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white border-blue-700 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
                      >
                        <Icon className="w-4 h-4" />
                        {page.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6"
              >
                {activePage === 'overview' && (
                  <>
                    <MetricsDashboard />
                    <DelhiNCRCard variant="india" />
                    <GrowthChart />
                  </>
                )}

                {activePage === 'regions' && (
                  <>
                    <RegionalClusterCards
                      selectedClusterName={selectedClusterName}
                      onSelectCluster={setSelectedClusterName}
                    />
                    <DelhiNCRCard variant="region" selectedCluster={selectedCluster} />
                  </>
                )}

                {activePage === 'sectors' && (
                  <>
                    <SectorBreakdown />
                    <PortfolioAllocation />
                  </>
                )}

                {activePage === 'cities' && (
                  <>
                    <InvestmentMap />
                    <CityDrilldown />
                  </>
                )}

                {activePage === 'states' && (
                  <>
                    <StateComparison />
                    <StatePerformanceDetail />
                  </>
                )}

                {activePage === 'sources' && <DataSources />}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Footer Actions */}
      {!loading && data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-center gap-4 shadow-lg"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadData}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Download Data (JSON)
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShareReport}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Share Report
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManufacturingWindow;
