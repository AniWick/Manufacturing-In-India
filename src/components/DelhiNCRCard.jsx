import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Building2, Car, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataContext } from '../context/DataContext';

const DelhiNCRCard = () => {
  const { data, loading } = useContext(DataContext);

  if (loading || !data?.delhiNcrMetrics) {
    return null;
  }

  const metrics = data.delhiNcrMetrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 shadow-md"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Delhi/NCR Dedicated Card</h3>
          <p className="text-sm text-gray-600 mt-1">Separate regional metrics for Delhi, Noida, Gurgaon, Faridabad and Ghaziabad</p>
        </div>
        <div className="px-3 py-2 bg-sky-600 rounded-lg text-white text-sm font-semibold">Regional Cluster</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">Growth</p>
          <p className="text-xl font-bold text-sky-700 flex items-center gap-1"><TrendingUp className="w-4 h-4" />{metrics.growth}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">Investment</p>
          <p className="text-xl font-bold text-indigo-700 flex items-center gap-1"><Building2 className="w-4 h-4" />Rs {metrics.investment}Cr</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-sky-100">
          <p className="text-xs text-gray-600">VAHAN Registrations</p>
          <p className="text-xl font-bold text-amber-700 flex items-center gap-1"><Car className="w-4 h-4" />{metrics.vehicleRegistrations.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700">Cities: {metrics.keyCities.join(', ')}</p>
        <p className="text-sm text-gray-600">Focus: {metrics.topSectors.join(', ')}</p>
      </div>

      <div className="bg-white border border-sky-100 rounded-lg p-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Delhi/NCR Year-wise Records (2021-2025)</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={metrics.yearly}>
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
