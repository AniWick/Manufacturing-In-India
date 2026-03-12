import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { DataContext } from '../context/DataContext';

const SectorBreakdown = () => {
  const { data, loading } = useContext(DataContext);
  const [selectedSector, setSelectedSector] = useState('');

  const sectors = data?.sectors || [];
  const activeSector = sectors.find((sector) => sector.name === selectedSector) || sectors[0];

  const sectorHistory = activeSector ? data?.sectorYearlyRecords?.[activeSector.name] || [] : [];
  const activeSectorAnalysis = activeSector ? data?.sectorProductAnalysis?.[activeSector.name] || null : null;
  const activeSectorProfile = activeSector ? data?.sectorReportingProfiles?.[activeSector.name] || null : null;

  const sectorLeaders = useMemo(() => {
    if (!activeSector || !data?.states) return [];
    const sectorKey = activeSector.name.toLowerCase().replace(/\s*&\s*/g, '_').replace(/\s+/g, '_');
    return data.states
      .map((state) => {
        const entries = Object.entries(state.portfolio || {});
        const match = entries.find(([key]) => key === sectorKey || key.startsWith(sectorKey.slice(0, 4)));
        return { state: state.state, value: match ? Number(match[1]) : 0, growth: state.growth };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [activeSector, data]);

  const productRows = useMemo(() => activeSectorAnalysis?.products || [], [activeSectorAnalysis]);
  const yearlyTrade = activeSectorAnalysis?.yearly || [];

  const summaryMetrics = useMemo(() => {
    if (!productRows.length) {
      return {
        domestic: 0,
        exports: 0,
        total: 0,
        exportMix: 0,
        products: 0
      };
    }

    const domestic = productRows.reduce((sum, product) => sum + product.domestic, 0);
    const exports = productRows.reduce((sum, product) => sum + product.exports, 0);
    const total = domestic + exports;

    return {
      domestic,
      exports,
      total,
      exportMix: total ? ((exports / total) * 100).toFixed(1) : '0.0',
      products: productRows.length
    };
  }, [productRows]);

  const enrichedProductRows = useMemo(() => {
    return productRows.map((product) => {
      const total = product.domestic + product.exports;
      return {
        ...product,
        total,
        exportMix: total ? ((product.exports / total) * 100).toFixed(1) : '0.0'
      };
    }).sort((left, right) => right.total - left.total);
  }, [productRows]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sector-wise Growth Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart for Growth Rates */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Growth Rates by Sector</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sectors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="growth" fill="#8884d8" name="Growth %" onClick={(entry) => setSelectedSector(entry.name)} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">Click a sector bar, pie slice, or table row to drill deeper.</p>
          </div>

          {/* Pie Chart for Market Share */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-3">Market Share Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sectors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, share }) => `${name}: ${share}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="share"
                  onClick={(entry) => setSelectedSector(entry.name)}
                >
                  {sectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Details Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Sector</th>
                <th className="text-left p-3 font-semibold text-gray-700">Growth %</th>
                <th className="text-left p-3 font-semibold text-gray-700">Market Share %</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-100 hover:bg-white transition-colors cursor-pointer ${activeSector?.name === sector.name ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedSector(sector.name)}
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: sector.color }}
                      />
                      {sector.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      +{sector.growth}%
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{sector.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drill-down */}
        {activeSector && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl border border-gray-200 p-5"
          >
            <h4 className="text-base font-semibold text-gray-800 mb-3">{activeSector.name} Deep Dive</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-5">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs text-gray-600">{activeSectorAnalysis?.domesticLabel || 'Domestic'}</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{summaryMetrics.domestic.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{activeSectorAnalysis?.unit || 'units'}</p>
              </div>
              <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-xs text-gray-600">{activeSectorAnalysis?.exportLabel || 'Exports'}</p>
                <p className="text-2xl font-bold text-indigo-700 mt-1">{summaryMetrics.exports.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{activeSectorAnalysis?.unit || 'units'}</p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs text-gray-600">Combined output</p>
                <p className="text-2xl font-bold text-emerald-700 mt-1">{summaryMetrics.total.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{activeSectorAnalysis?.unit || 'units'}</p>
              </div>
              <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                <p className="text-xs text-gray-600">Export mix</p>
                <p className="text-2xl font-bold text-amber-700 mt-1">{summaryMetrics.exportMix}%</p>
                <p className="text-xs text-gray-500 mt-1">of total sector output</p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-gray-600">Tracked product lines</p>
                <p className="text-2xl font-bold text-slate-700 mt-1">{summaryMetrics.products}</p>
                <p className="text-xs text-gray-500 mt-1">within this sector</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Product-level Domestic vs Export Mix</h5>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={enrichedProductRows} margin={{ top: 8, right: 16, left: 0, bottom: 56 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-25} textAnchor="end" height={70} interval={0} />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ${activeSectorAnalysis?.unit || 'units'}`} />
                    <Legend />
                    <Bar dataKey="domestic" stackId="trade" fill="#2563eb" name={activeSectorAnalysis?.domesticLabel || 'Domestic'} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="exports" stackId="trade" fill="#7c3aed" name={activeSectorAnalysis?.exportLabel || 'Exports'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Domestic vs Export Trend (2021-2025)</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={yearlyTrade}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ${activeSectorAnalysis?.unit || 'units'}`} />
                    <Legend />
                    <Line type="monotone" dataKey="domestic" stroke="#2563eb" strokeWidth={3} name={activeSectorAnalysis?.domesticLabel || 'Domestic'} />
                    <Line type="monotone" dataKey="exports" stroke="#7c3aed" strokeWidth={3} name={activeSectorAnalysis?.exportLabel || 'Exports'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Sector Growth Trend</h5>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={sectorHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Line type="monotone" dataKey="growth" stroke={activeSector.color || '#2563eb'} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Top States In This Sector</h5>
                <div className="space-y-2">
                  {sectorLeaders.map((leader, idx) => (
                    <div key={`${leader.state}-${idx}`} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                      <span className="text-sm font-medium text-gray-800">{leader.state}</span>
                      <span className="text-sm text-blue-700 font-semibold">{leader.value}% mix</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">Product line</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Domestic</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Exports</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Export mix</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrichedProductRows.map((product) => (
                      <tr key={product.name} className="border-b border-gray-100 last:border-0">
                        <td className="p-3 font-medium text-gray-800">{product.name}</td>
                        <td className="p-3 text-gray-700">{product.domestic.toLocaleString()}</td>
                        <td className="p-3 text-gray-700">{product.exports.toLocaleString()}</td>
                        <td className="p-3 text-gray-700">{product.exportMix}%</td>
                        <td className="p-3"><span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">+{product.growth}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Analyst Notes</h5>
                <div className="space-y-3">
                  {(activeSectorAnalysis?.insights || []).map((insight) => (
                    <div key={insight} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-gray-700">
                      {insight}
                    </div>
                  ))}
                  {enrichedProductRows[0] && (
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                      Largest tracked line: {enrichedProductRows[0].name} with {enrichedProductRows[0].total.toLocaleString()} {activeSectorAnalysis?.unit || 'units'} combined output.
                    </div>
                  )}
                  {enrichedProductRows[0] && (
                    <div className="rounded-lg border border-violet-100 bg-violet-50 p-3 text-sm text-violet-900">
                      Highest export intensity: {enrichedProductRows.slice().sort((left, right) => Number(right.exportMix) - Number(left.exportMix))[0].name} at {enrichedProductRows.slice().sort((left, right) => Number(right.exportMix) - Number(left.exportMix))[0].exportMix}% export mix.
                    </div>
                  )}
                  {activeSectorProfile && (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-gray-700 space-y-1">
                      <p><span className="font-semibold">Primary reporting:</span> {activeSectorProfile.primaryAgency}</p>
                      <p><span className="font-semibold">Export reporting:</span> {activeSectorProfile.exportAgency}</p>
                      <p><span className="font-semibold">Cadence:</span> {activeSectorProfile.cadence}</p>
                      <p><span className="font-semibold">Series:</span> {activeSectorProfile.benchmarkSeries}</p>
                      <p><span className="font-semibold">Method:</span> {activeSectorProfile.methodology}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SectorBreakdown;
