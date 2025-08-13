import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UsageChart = ({ chartData, chartType = 'bar' }) => {
  const COLORS = ['#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-brand-lg">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span className="font-medium" style={{ color: entry?.color }}>
                {entry?.name}: {entry?.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartType === 'pie') {
    return (
      <div className="w-full h-80" aria-label="Conversion Categories Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-80" aria-label="Daily Conversion Usage Chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="conversions" 
            fill="#1e40af" 
            radius={[4, 4, 0, 0]}
            name="Conversions"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;