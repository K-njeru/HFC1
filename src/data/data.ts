import { type Transaction } from '../types';

// Interface for the raw data structure (based on CSV columns)
export interface RawTransaction {
  'Customer ID': string;
  'First Name': string;
  'Last Name': string;
  'Age': string;
  'Gender': string;
  'Account Type': string;
  'Transaction Date': string;
  'Transaction Type': string;
  'Transaction Amount': string;
  'Account Balance After Transaction': string;
  'Branch ID': string;
  'Date Of Account Opening': string;

  
}

export const parseDateString = (dateStr: string): Date => {
  try {
    const [month, day, year] = dateStr.split('/').map(Number);
    if (!month || !day || !year) throw new Error('Invalid date format');
    return new Date(year, month - 1, day); // month is 0-based
  } catch (error) {
    console.error('Date parsing error for:', dateStr, error);
    return new Date(); // Fallback to current date for debugging
  }
};

// Function to parse raw CSV data into Transaction objects
export const parseRawData = (rawData: RawTransaction[]): Transaction[] => {
  const parsedData = rawData.map(row => {
    try {
      return {
        customerId: parseInt(row['Customer ID']),
        transactionDate: parseDateString(row['Transaction Date']),
        transactionType: row['Transaction Type'].toLowerCase(),
        transactionAmount: parseFloat(row['Transaction Amount']),
        accountBalance: parseFloat(row['Account Balance After Transaction']),
        age: parseInt(row['Age']),
        gender: row['Gender'],
        accountType: row['Account Type'].toLowerCase(),
        branchId: parseInt(row['Branch ID']),
        dateOfAccountOpening: parseDateString(row['Date Of Account Opening']),
      };
    } catch (error) {
      console.error('Parsing error for row:', row, error);
      return null; // Skip invalid rows
    }
  }).filter((t): t is Transaction => t !== null); // Filter out null entries

  parsedData.forEach(t => {
    if (t.transactionType === 'withdrawal' || t.transactionType === 'transfer') {
      t.transactionAmount = -t.transactionAmount;
    }
  });

  return parsedData;
};

// Updated getUniqueValues to handle Date by converting to timestamp
export const getUniqueValues = (data: Transaction[], key: keyof Transaction): (string | number)[] => {
  return Array.from(new Set(data.map(t => {
    const value = t[key];
    if (value instanceof Date) {
      return value.getTime(); // Convert Date to timestamp
    }
    return value;
  }))).sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return (a as string).localeCompare(b as string);
  });
};

export const uniqueTransactionTypes = [] as string[]; // Will be populated in App.tsx
export const uniqueAccountTypes = [] as string[]; // Will be populated in App.tsx
export const uniqueBranchIds = [] as number[]; // Will be populated in App.tsx