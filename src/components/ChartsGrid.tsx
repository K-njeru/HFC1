import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, PolarAreaController, RadialLinearScale, Scale } from 'chart.js';
import { Line, Doughnut, Bar, PolarArea } from 'react-chartjs-2';
import { type Transaction } from '../types';
import type { ChartOptions, ChartData, CoreScaleOptions, Tick } from 'chart.js'; // Use type-only import for CoreScaleOptions and Tick

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, PolarAreaController, RadialLinearScale);

interface Props {
  data: Transaction[];
}

const ChartsGrid: React.FC<Props> = ({ data }) => {
  // Transaction Volume Over Time
  const dailyVolume: { [date: string]: number } = {};
  data.forEach((t) => {
    const date = t.transactionDate.toISOString().split('T')[0];
    dailyVolume[date] = (dailyVolume[date] || 0) + Math.abs(t.transactionAmount);
  });
  const sortedDates = Object.keys(dailyVolume).sort();
  const labels = sortedDates.slice(-30); // Last 30 days for display
  const volumeData = labels.map((date) => dailyVolume[date] || 0);

  const volumeChartData: ChartData<'line'> = {
    labels: labels.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Volume',
        data: volumeData,
        borderColor: '#0056a6',
        backgroundColor: 'rgba(0, 86, 166, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const volumeOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: string | number,
            index: number,
            ticks: Tick[]
          ): string | number | null | undefined {
            if (typeof tickValue === 'number') {
              return '$' + tickValue.toLocaleString();
            }
            return tickValue;
          },
        },
      },
    },
  };

  // Transaction Types Distribution
  const typeCounts: { [type: string]: number } = {};
  data.forEach((t) => {
    typeCounts[t.transactionType] = (typeCounts[t.transactionType] || 0) + 1;
  });
  const typeChartData: ChartData<'doughnut'> = {
    labels: Object.keys(typeCounts),
    datasets: [{ data: Object.values(typeCounts), backgroundColor: ['#0056a6', '#ff7a00', '#4a90e2'] }],
  };
  const typeOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
  };

  // Account Balance Distribution
  const balanceRanges = { '0-1K': 0, '1K-5K': 0, '5K-10K': 0, '10K-25K': 0, '25K+': 0 };
  data.forEach((t) => {
    const balance = t.accountBalance;
    if (balance < 1000) balanceRanges['0-1K']++;
    else if (balance < 5000) balanceRanges['1K-5K']++;
    else if (balance < 10000) balanceRanges['5K-10K']++;
    else if (balance < 25000) balanceRanges['10K-25K']++;
    else balanceRanges['25K+']++;
  });
  const balanceChartData: ChartData<'bar'> = {
    labels: Object.keys(balanceRanges),
    datasets: [
      {
        label: 'Account Count',
        data: Object.values(balanceRanges),
        backgroundColor: 'rgba(0, 86, 166, 0.8)',
        borderColor: '#0056a6',
        borderWidth: 1,
      },
    ],
  };
  const balanceOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  // Customer Demographics (Age Groups)
  const ageGroups = { '18-25': 0, '26-35': 0, '36-45': 0, '46-55': 0, '56+': 0 };
  data.forEach((t) => {
    const age = t.age;
    if (age <= 25) ageGroups['18-25']++;
    else if (age <= 35) ageGroups['26-35']++;
    else if (age <= 45) ageGroups['36-45']++;
    else if (age <= 55) ageGroups['46-55']++;
    else ageGroups['56+']++;
  });
  const demographicsChartData: ChartData<'polarArea'> = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(0, 86, 166, 0.8)',
          'rgba(255, 122, 0, 0.8)',
          'rgba(74, 144, 226, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
      },
    ],
  };
  const demographicsOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
  };

  return (
    <div className="charts-grid">
      <div className="chart-container">
        <div className="chart-title">Transaction Volume Over Time</div>
        <div className="chart-wrapper">
          <Line data={volumeChartData} options={volumeOptions} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-title">Transaction Types Distribution</div>
        <div className="chart-wrapper">
          <Doughnut data={typeChartData} options={typeOptions} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-title">Account Balance Distribution</div>
        <div className="chart-wrapper">
          <Bar data={balanceChartData} options={balanceOptions} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-title">Customer Demographics</div>
        <div className="chart-wrapper">
          <PolarArea data={demographicsChartData} options={demographicsOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsGrid;