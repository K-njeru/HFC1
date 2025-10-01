"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import type { Transaction } from "../types"

interface Props {
  data: Transaction[]
}

const DataTable = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest 50 transactions from your filtered data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Branch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{t.customerId}</TableCell>
                    <TableCell>{t.transactionDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {t.transactionType.charAt(0).toUpperCase() + t.transactionType.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${t.transactionAmount >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {t.transactionAmount >= 0 ? "+" : "-"}$
                      {Math.abs(t.transactionAmount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      $
                      {t.accountBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>{t.age}</TableCell>
                    <TableCell>{t.gender}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {t.accountType.charAt(0).toUpperCase() + t.accountType.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{t.branchId}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataTable
