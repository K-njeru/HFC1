"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import "./global.css"
import { parseRawData, getUniqueValues, type RawTransaction } from "./data/data"
import type { Transaction } from "./types"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Controls from "./components/Controls"
import MetricsGrid from "./components/MetricsGrid"
import ChartsGrid from "./components/ChartsGrid"
import DataTable from "./components/DataTable"
import Papa, { type ParseConfig } from "papaparse"
import { ThemeProvider } from "./contexts/ThemeContext"

const now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [dateRange, setDateRange] = useState<string>("2000")
  const [transactionType, setTransactionType] = useState<string>("all")
  const [accountType, setAccountType] = useState<string>("all")
  const [branchCode, setBranchCode] = useState<string>("all")
  const [parsedData, setParsedData] = useState<Transaction[]>([])
  const [uniqueTransactionTypes, setUniqueTransactionTypes] = useState<string[]>([])
  const [uniqueAccountTypes, setUniqueAccountTypes] = useState<string[]>([])
  const [uniqueBranchIds, setUniqueBranchIds] = useState<number[]>([])

  const loadCSV = useCallback(async () => {
    console.log("Refreshing CSV...")
    try {
      const response = await fetch("/Comprehensive_Banking_Database.csv")
      console.log("Response OK:", response.ok)
      if (!response.ok) throw new Error("Failed to fetch CSV: " + response.statusText)
      const text = await response.text()
      console.log("CSV Text Length:", text.length)
      Papa.parse<RawTransaction>(text, {
        header: true,
        complete: (result) => {
          console.log("Raw Data:", result.data)
          const rawData = result.data as RawTransaction[]
          const data = parseRawData(rawData)
          console.log("Parsed Data:", data)
          setParsedData(data)
          setUniqueTransactionTypes(getUniqueValues(data, "transactionType") as string[])
          setUniqueAccountTypes(getUniqueValues(data, "accountType") as string[])
          setUniqueBranchIds(getUniqueValues(data, "branchId") as number[])
          console.log("Unique Transaction Types:", uniqueTransactionTypes)
          console.log("Unique Account Types:", uniqueAccountTypes)
          console.log("Unique Branch IDs:", uniqueBranchIds)
          console.log("Parsed Data Length:", data.length)
        },
        error: (error: Papa.ParseError, file?: string) => {
          console.error("Error parsing CSV:", error, file)
        },
      } as ParseConfig<RawTransaction>)
    } catch (error) {
      console.error("Error loading CSV:", error)
    }
  }, [uniqueAccountTypes, uniqueBranchIds, uniqueTransactionTypes])

  useEffect(() => {
    loadCSV()
  }, [loadCSV])

  const filteredData = useMemo(() => {
    const days = Number.parseInt(dateRange)
    const cutoff = new Date(currentDate)
    cutoff.setDate(cutoff.getDate() - days)

    const result = parsedData.filter((t: Transaction) => {
      const dateMatch = t.transactionDate >= cutoff
      const typeMatch = transactionType === "all" || t.transactionType === transactionType
      const accountMatch = accountType === "all" || t.accountType === accountType
      const branchMatch = branchCode === "all" || t.branchId === Number.parseInt(branchCode)

      return dateMatch && typeMatch && accountMatch && branchMatch
    })
    console.log(
      "Filtered Data Length:",
      result.length,
      "Data:",
      result.map((t) => ({ date: t.transactionDate, type: t.transactionType })),
    )
    return result
  }, [dateRange, transactionType, accountType, branchCode, parsedData])

  const metrics = useMemo(() => {
    const totalTransactions = filteredData.length
    const totalVolume = filteredData.reduce((sum, t) => sum + Math.abs(t.transactionAmount), 0)
    const avgTransaction = totalTransactions > 0 ? totalVolume / totalTransactions : 0
    const activeCustomers = new Set(filteredData.map((t) => t.customerId)).size

    return { totalTransactions, totalVolume, avgTransaction, activeCustomers }
  }, [filteredData])

  console.log("Filtered Data Length:", filteredData.length)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}>
          <Header />
          <div className="dashboard-container flex flex-col gap-6 m-8">
            <Controls
              dateRange={dateRange}
              setDateRange={setDateRange}
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              accountType={accountType}
              setAccountType={setAccountType}
              branchCode={branchCode}
              setBranchCode={setBranchCode}
              uniqueTransactionTypes={uniqueTransactionTypes}
              uniqueAccountTypes={uniqueAccountTypes}
              uniqueBranchIds={uniqueBranchIds}
              onRefresh={loadCSV}
            />
            <MetricsGrid metrics={metrics} />
            <ChartsGrid data={filteredData} />
            <DataTable data={filteredData} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
