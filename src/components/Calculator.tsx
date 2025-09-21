import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calculator as CalcIcon, MapPin, Download, Share2, Droplets, Home, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    area: '',
    rainfall: '',
    material: 'concrete'
  });
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>('');

  const materials = [
    { value: 'concrete', label: t('concrete'), coefficient: 0.85 },
    { value: 'tin', label: t('tin'), coefficient: 0.90 },
    { value: 'tiles', label: t('tiles'), coefficient: 0.75 },
    { value: 'greenRoof', label: t('greenRoof'), coefficient: 0.40 }
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
          // In a real app, you'd fetch rainfall data based on coordinates
          setFormData(prev => ({ ...prev, rainfall: '800' }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Location not available');
        }
      );
    }
  };

  const calculateResults = () => {
    if (!formData.area || !formData.rainfall) return;

    setLoading(true);
    
    setTimeout(() => {
      const area = parseFloat(formData.area);
      const rainfall = parseFloat(formData.rainfall);
      const material = materials.find(m => m.value === formData.material);
      const coefficient = material?.coefficient || 0.85;

      // Calculations based on CGWB guidelines
      const totalHarvest = area * rainfall * coefficient * 0.001; // in cubic meters
      const totalHarvestLiters = totalHarvest * 1000;
      const householdSupplyDays = Math.floor(totalHarvestLiters / 600); // 600L per day for family of 4
      const rechargeCapacity = totalHarvestLiters * 0.4; // 40% for recharge
      const waterLoss = totalHarvestLiters * (1 - coefficient);

      setResults({
        totalHarvest: totalHarvestLiters,
        householdSupplyDays,
        householdSupplyMonths: Math.floor(householdSupplyDays / 30),
        rechargeCapacity,
        waterLoss,
        efficiency: coefficient * 100
      });
      setLoading(false);
    }, 1500);
  };

  const pieData = results ? [
    { name: 'Usable Water', value: results.totalHarvest, color: '#3b82f6' },
    { name: 'Water Loss', value: results.waterLoss, color: '#64748b' }
  ] : [];

  const barData = results ? [
    { name: 'Harvested', value: Math.round(results.totalHarvest), color: '#3b82f6' },
    { name: 'Recharge', value: Math.round(results.rechargeCapacity), color: '#06b6d4' }
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#e2e8f0] mb-4 flex items-center justify-center gap-3">
            <CalcIcon className="w-10 h-10 text-blue-400" />
            {t('calculatorTitle')}
          </h1>
          <p className="text-xl text-slate-400">
            Calculate your rooftop's rainwater harvesting potential with precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6">Assessment Parameters</h2>
            
            {/* Location Detection */}
            <div className="mb-6">
              <button
                onClick={getLocation}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                <span>Detect Location</span>
              </button>
              {location && (
                <p className="text-sm text-slate-400 mt-2">Location: {location}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#e2e8f0] mb-2">
                  {t('rooftopArea')} ({t('rooftopAreaUnit')})
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-[#e2e8f0] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter rooftop area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e2e8f0] mb-2">
                  {t('rainfall')} ({t('rainfallUnit')})
                </label>
                <input
                  type="number"
                  value={formData.rainfall}
                  onChange={(e) => setFormData(prev => ({ ...prev, rainfall: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-[#e2e8f0] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter annual rainfall"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e2e8f0] mb-2">
                  {t('runoffCoeff')}
                </label>
                <select
                  value={formData.material}
                  onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-[#e2e8f0] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {materials.map(material => (
                    <option key={material.value} value={material.value}>
                      {material.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateResults}
                disabled={!formData.area || !formData.rainfall || loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Calculating...</span>
                  </div>
                ) : (
                  t('calculate')
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6">{t('results')}</h2>
            
            {!results ? (
              <div className="text-center py-12">
                <Droplets className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Enter parameters and calculate to see results</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Droplets className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">{t('waterHarvest')}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#e2e8f0]">
                      {results.totalHarvest.toLocaleString()} L
                    </p>
                    <p className="text-xs text-slate-400">{t('litersPerYear')}</p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Home className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">{t('householdSupply')}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#e2e8f0]">
                      {results.householdSupplyMonths} {t('months')}
                    </p>
                    <p className="text-xs text-slate-400">({results.householdSupplyDays} {t('days')})</p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">{t('rechargeCapacity')}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#e2e8f0]">
                      {results.rechargeCapacity.toLocaleString()} L
                    </p>
                    <p className="text-xs text-slate-400">Groundwater recharge</p>
                  </div>

                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-5 h-5 text-blue-400 flex items-center justify-center text-xs font-bold">%</span>
                      <span className="text-sm font-medium text-slate-300">Efficiency</span>
                    </div>
                    <p className="text-2xl font-bold text-[#e2e8f0]">
                      {results.efficiency}%
                    </p>
                    <p className="text-xs text-slate-400">Collection efficiency</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <h3 className="text-lg font-semibold text-[#e2e8f0] mb-4">Water Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value.toLocaleString()} L`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                    <h3 className="text-lg font-semibold text-[#e2e8f0] mb-4">Water Potential</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          formatter={(value: any) => [`${value.toLocaleString()} L`, '']}
                          contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200">
                    <Download className="w-4 h-4" />
                    <span>{t('exportPdf')}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-all duration-200">
                    <Share2 className="w-4 h-4" />
                    <span>{t('shareResults')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;