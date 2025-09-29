import React from 'react';
import { type Transaction } from '../types'; // Use type-only import

interface Props {
  data: Transaction[];
}

const DataTable: React.FC<Props> = ({ data }) => (
  <div className="data-table-container">
    <div className="chart-title">Recent Transactions</div>
    <table className="data-table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Account Type</th>
          <th>Branch</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t, index) => (
          <tr key={index}>
            <td>{t.customerId}</td>
            <td>{t.transactionDate.toLocaleDateString()}</td>
            <td>{t.transactionType.charAt(0).toUpperCase() + t.transactionType.slice(1)}</td>
            <td style={{ color: t.transactionAmount >= 0 ? '#10b981' : '#ef4444' }}>
              {t.transactionAmount >= 0 ? '+' : ''}${Math.abs(t.transactionAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>
            <td>${t.accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            <td>{t.age}</td>
            <td>{t.gender}</td>
            <td>{t.accountType.charAt(0).toUpperCase() + t.accountType.slice(1)}</td>
            <td>{t.branchId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;