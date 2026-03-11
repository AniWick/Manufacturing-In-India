import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const GrowthChart = () => {
  const data = [
    { month: 'Jan 2025', value: 5.2 },
    { month: 'Feb 2025', value: 5.8 },
    { month: 'Mar 2025', value: 6.1 },
    { month: 'Apr 2025', value: 5.9 },
    { month: 'May 2025', value: 6.3 },
    { month: 'Jun 2025', value: 6.7 },
    { month: 'Jul 2025', value: 7.1 },
    { month: 'Aug 2025', value: 7.5 },
    { month: 'Sep 2025', value: 8.2 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Manufacturing Growth Trend</h3>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-manufacturing-teal mr-2" />
            <span className="text-sm text-gray-600">+10.8% vs last year</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={['0%', '10%']} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Growth %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GrowthChart;
