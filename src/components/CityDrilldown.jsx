import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { DataContext } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CityDrilldown = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedCityName, setSelectedCityName] = useState('');

  const cityProfiles = data?.cityProfiles || [];
  const topCities = cityProfiles.slice(0, 30);
  const selectedCity = topCities.find((city) => city.city === selectedCityName) || topCities[0];

  const sectorMixData = useMemo(() => {
    if (!selectedCity?.sectorMix) return [];
    return Object.entries(selectedCity.sectorMix).map(([name, value]) => ({
      name: name.replace(/_/g, ' '),
      value
    }));
  }, [selectedCity]);

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-800">City-level Drill-down (Top 30)</h3>
      <p className="text-sm text-gray-600 mt-1 mb-4">Click a city to view trend, sector mix and investment history</p>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 mb-5">
        {topCities.map((city) => (
          <button
            key={city.city}
            onClick={() => setSelectedCityName(city.city)}
            className={`text-left p-2 rounded-lg border text-xs transition-all ${selectedCity?.city === city.city ? 'bg-orange-600 text-white border-orange-700' : 'bg-white border-amber-200 hover:border-orange-300'}`}
          >
            <p className="font-semibold truncate">{city.city}</p>
            <p className={`${selectedCity?.city === city.city ? 'text-orange-100' : 'text-gray-500'} truncate`}>{city.state}</p>
          </button>
        ))}
      </div>

      {selectedCity && (
        <div className="bg-white rounded-xl border border-amber-200 p-4">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{selectedCity.city} Inner Data</h4>
            <p className="text-sm text-gray-600">
              {selectedCity.state} | Cluster: {selectedCity.cluster} | Lead sector: {selectedCity.leadSector}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Investment History (2021-2025)</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={selectedCity.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rs ${value}Cr`} />
                  <Line type="monotone" dataKey="investment" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Growth and Vehicle Trend</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={selectedCity.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="growth" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="vehicleRegistrations" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Sector Mix</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sectorMixData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="value" fill="#fb923c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CityDrilldown;
