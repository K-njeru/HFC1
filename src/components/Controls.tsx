import React from 'react';

interface Props {
  dateRange: string;
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
  transactionType: string;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
  accountType: string;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  branchCode: string;
  setBranchCode: React.Dispatch<React.SetStateAction<string>>;
  uniqueTransactionTypes: string[];
  uniqueAccountTypes: string[];
  uniqueBranchIds: number[];
  onRefresh: () => void; // Added prop for refresh callback
}

const Controls: React.FC<Props> = ({
  dateRange,
  setDateRange,
  transactionType,
  setTransactionType,
  accountType,
  setAccountType,
  branchCode,
  setBranchCode,
  uniqueTransactionTypes,
  uniqueAccountTypes,
  uniqueBranchIds,
  onRefresh,
}) => (
  <div className="controls-section">
    <div className="controls-grid">
      <div className="control-group">
        <label htmlFor="dateRange">Date Range</label>
        <select id="dateRange" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="1000">Last year</option> 
          {/* // altered to fit 2023 timeframes */}
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="transactionType">Transaction Type</label>
        <select id="transactionType" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="all">All Types</option>
          {uniqueTransactionTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="accountType">Account Type</label>
        <select id="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="all">All Accounts</option>
          {uniqueAccountTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="branchCode">Branch</label>
        <select id="branchCode" value={branchCode} onChange={(e) => setBranchCode(e.target.value)}>
          <option value="all">All Branches</option>
          {uniqueBranchIds.map((id) => (
            <option key={id} value={id.toString()}>
              Branch {id.toString().padStart(3, '0')}
            </option>
          ))}
        </select>
      </div>
      <div className="control-group">
        <button className="btn" onClick={onRefresh}>🔄 Refresh Data</button>
      </div>
    </div>
  </div>
);

export default Controls;