"use client"

import type React from "react"

import { Card, CardContent } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { RefreshCw } from "lucide-react"

interface Props {
  dateRange: string
  setDateRange: React.Dispatch<React.SetStateAction<string>>
  transactionType: string
  setTransactionType: React.Dispatch<React.SetStateAction<string>>
  accountType: string
  setAccountType: React.Dispatch<React.SetStateAction<string>>
  branchCode: string
  setBranchCode: React.Dispatch<React.SetStateAction<string>>
  uniqueTransactionTypes: string[]
  uniqueAccountTypes: string[]
  uniqueBranchIds: number[]
  onRefresh: () => void
}

const Controls = ({
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
}: Props) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="1000">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="transactionType">Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="transactionType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTransactionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {uniqueAccountTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="branchCode">Branch</Label>
            <Select value={branchCode} onValueChange={setBranchCode}>
              <SelectTrigger id="branchCode">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {uniqueBranchIds.map((id) => (
                  <SelectItem key={id} value={id.toString()}>
                    Branch {id.toString().padStart(3, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="invisible">Refresh</Label>
            <Button onClick={onRefresh} variant="outline" className="w-full bg-transparent">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Controls
