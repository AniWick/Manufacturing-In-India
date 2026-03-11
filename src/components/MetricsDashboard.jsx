import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Factory, Activity } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const MetricsDashboard = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse" />
        ))}
      </motion.div>
    );
  }

  const metrics = [
    {
      label: 'Current Growth Rate',
      value: `${data?.currentGrowth || 'N/A'}%`,
      icon: TrendingUp,
      color: 'bg-manufacturing-teal',
      change: `+${(data?.currentGrowth - (data?.previousGrowth || 0)).toFixed(1)}%`
    },
    {
      label: 'Total Sectors',
      value: data?.sectors?.length || '7',
      icon: Factory,
      color: 'bg-manufacturing-orange',
      change: 'Active'
    },
    {
      label: 'States Tracked',
      value: data?.states?.length || '8',
      icon: Activity,
      color: 'bg-manufacturing-blue',
      change: 'Regions'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`${metric.color} rounded-xl p-6 text-white shadow-lg`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white/80">{metric.label}</p>
                <h3 className="text-3xl font-bold mt-2">{metric.value}</h3>
                <p className="text-sm mt-2 text-white/70">{metric.change}</p>
              </div>
              <Icon className="w-8 h-8 text-white/60" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MetricsDashboard;
