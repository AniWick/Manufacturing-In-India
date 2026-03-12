import React, { useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Car, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataContext } from '../context/DataContext';

const aggregateYearlyMetrics = (records) => {
  const yearlyMap = new Map();

  records.forEach((recordSet) => {
    recordSet.forEach((entry) => {
      const existing = yearlyMap.get(entry.year) || {
        year: entry.year,
        growthWeight: 0,
        investment: 0,
        vehicleRegistrations: 0
      };

      existing.growthWeight += entry.growth * entry.investment;
      existing.investment += entry.investment;
      existing.vehicleRegistrations += entry.vehicleRegistrations;
      yearlyMap.set(entry.year, existing);
    });
  });

  return Array.from(yearlyMap.values())
    .sort((left, right) => Number(left.year) - Number(right.year))
    .map((entry) => ({
      year: entry.year,
      growth: entry.investment ? Number((entry.growthWeight / entry.investment).toFixed(1)) : 0,
      investment: entry.investment,
      vehicleRegistrations: entry.vehicleRegistrations
    }));
};

const buildIndiaSummary = (data) => {
  const states = data?.states || [];
  const sectors = data?.sectors || [];
  const yearly = aggregateYearlyMetrics(Object.values(data?.stateYearlyRecords || {}));

  if (!states.length || !yearly.length) {
    return null;
  }

  return {
    title: 'India Manufacturing Report Card',
    subtitle: 'National manufacturing performance across all tracked states and sectors',
    badge: 'National Snapshot',
    growth: data.currentGrowth,
    investment: states.reduce((sum, state) => sum + state.investment, 0),
    vehicleRegistrations: states.reduce((sum, state) => sum + state.vehicleRegistrations, 0),
    locationsLabel: 'Top states',
    locations: [...states]
      .sort((left, right) => right.investment - left.investment)
      .slice(0, 5)
      .map((state) => state.state),
    focusLabel: 'Leading sectors',
    focusAreas: [...sectors]
      .sort((left, right) => right.share - left.share)
      .slice(0, 3)
      .map((sector) => sector.name),
    chartTitle: 'India Year-wise Records (2021-2025)',
    yearly
  };
};

const buildRegionSummary = (data, selectedCluster) => {
  if (!selectedCluster) {
    return null;
  }

  const clusterCities = (data?.cityProfiles || []).filter((city) => selectedCluster.cities.includes(city.city));
  const yearly = aggregateYearlyMetrics(clusterCities.map((city) => city.history || []));

  if (!clusterCities.length || !yearly.length) {
    return null;
  }

  const investment = clusterCities.reduce((sum, city) => sum + city.currentInvestment, 0);

  return {
    title: `${selectedCluster.name} Report Card`,
    subtitle: `Current manufacturing snapshot for ${selectedCluster.cities.join(', ')}`,
    badge: 'Regional Cluster',
    growth: selectedCluster.avgGrowth,
    investment,
    vehicleRegistrations: clusterCities.reduce((sum, city) => sum + city.vehicleRegistrations, 0),
    locationsLabel: 'Cities',
    locations: selectedCluster.cities,
    focusLabel: 'Focus',
    focusAreas: selectedCluster.focusSectors,
    chartTitle: `${selectedCluster.name} Year-wise Records (2021-2025)`,
    yearly
  };
};

const DelhiNCRCard = ({ variant = 'india', selectedCluster = null }) => {
  const { data, loading } = useContext(DataContext);

  const summary = useMemo(() => {
    if (!data) {
      return null;
    }

    if (variant === 'region') {
      return buildRegionSummary(data, selectedCluster);
    }

    return buildIndiaSummary(data);
  }, [data, selectedCluster, variant]);

  if (loading || !summary) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{summary.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{summary.subtitle}</p>
        </div>
        <div className="px-3 py-2 bg-sky-600 rounded-lg text-white text-sm font-semibold">{summary.badge}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">Growth</p>
          <p className="text-xl font-bold text-sky-700 flex items-center gap-1"><TrendingUp className="w-4 h-4" />{summary.growth}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">Investment</p>
          <p className="text-xl font-bold text-indigo-700 flex items-center gap-1"><Building2 className="w-4 h-4" />Rs {summary.investment.toLocaleString()}Cr</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">VAHAN Registrations</p>
          <p className="text-xl font-bold text-amber-700 flex items-center gap-1"><Car className="w-4 h-4" />{summary.vehicleRegistrations.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700">{summary.locationsLabel}: {summary.locations.join(', ')}</p>
        <p className="text-sm text-gray-600">{summary.focusLabel}: {summary.focusAreas.join(', ')}</p>
      </div>

      <div className="bg-white border border-sky-100 rounded-lg p-3">
        <p className="text-sm font-medium text-gray-700 mb-2">{summary.chartTitle}</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={summary.yearly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value, key) => key === 'investment' ? `Rs ${value}Cr` : key === 'vehicleRegistrations' ? value.toLocaleString() : `${value}%`} />
            <Line type="monotone" dataKey="growth" stroke="#0284c7" strokeWidth={3} />
            <Line type="monotone" dataKey="investment" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DelhiNCRCard;
