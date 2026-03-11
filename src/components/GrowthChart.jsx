import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const GrowthChart = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 animate-pulse">
        <div className="h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg"></div>
      </div>
    );
  }

  const chartData = data?.iipData || [
    { month: 'Jan 2025', value: 5.2 },
    { month: 'Feb 2025', value: 5.8 },
    { month: 'Mar 2025', value: 6.1 }
  ];

  const minValue = Math.min(...chartData.map(d => d.value));
  const maxValue = Math.max(...chartData.map(d => d.value));
  const avgValue = (chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Manufacturing Growth Trend</h3>
            <p className="text-sm text-gray-600 mt-1">Monthly IIP (Index of Industrial Production) Data</p>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold text-sm">{chartData.length} Months Tracked</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white rounded-lg border border-blue-300 shadow-md"
          >
            <p className="text-xs font-medium text-gray-600">Latest Growth</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{chartData[chartData.length - 1]?.value}%</p>
            <p className="text-xs text-gray-500 mt-1">{chartData[chartData.length - 1]?.month}</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white rounded-lg border border-green-300 shadow-md"
          >
            <p className="text-xs font-medium text-gray-600">Average Growth</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{avgValue}%</p>
            <p className="text-xs text-gray-500 mt-1">Over period</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white rounded-lg border border-purple-300 shadow-md"
          >
            <p className="text-xs font-medium text-gray-600">Peak Growth</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">{maxValue}%</p>
            <p className="text-xs text-gray-500 mt-1">Highest recorded</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white rounded-lg border border-orange-300 shadow-md"
          >
            <p className="text-xs font-medium text-gray-600">Lowest Growth</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{minValue}%</p>
            <p className="text-xs text-gray-500 mt-1">Minimum recorded</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis 
                domain={[Math.floor(minValue - 1), Math.ceil(maxValue + 1)]}
                label={{ value: 'Growth %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ backgroundColor: '#fff', border: '2px solid #10b981', borderRadius: '8px' }}
                cursor={{ stroke: '#10b981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Growth %"
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthChart;
