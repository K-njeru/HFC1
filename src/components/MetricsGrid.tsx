// src/components/MetricsGrid.tsx
import React from 'react';

interface Metrics {
  totalTransactions: number;
  totalVolume: number;
  avgTransaction: number;
  activeCustomers: number;
}

interface Props {
  metrics: Metrics;
}

const MetricsGrid: React.FC<Props> = ({ metrics }) => (
  <div className="metrics-grid">
    <div className="metric-card">
      <div className="metric-value">{metrics.totalTransactions.toLocaleString()}</div>
      <div className="metric-label">Total Transactions</div>
    </div>
    <div className="metric-card">
      <div className="metric-value">${metrics.totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div className="metric-label">Transaction Volume</div>
    </div>
    <div className="metric-card">
      <div className="metric-value">${metrics.avgTransaction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div className="metric-label">Average Transaction</div>
    </div>
    <div className="metric-card">
      <div className="metric-value">{metrics.activeCustomers.toLocaleString()}</div>
      <div className="metric-label">Active Customers</div>
    </div>
  </div>
);

export default MetricsGrid;