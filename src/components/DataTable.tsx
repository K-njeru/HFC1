import * as React from "react"
import { type Transaction } from "../types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

interface Props {
  data: Transaction[]
}

const DataTable: React.FC<Props> = ({ data }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Recent Transactions</h2>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Branch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((t, index) => (
            <TableRow key={index}>
              <TableCell>{t.customerId}</TableCell>
              <TableCell>{t.transactionDate.toLocaleDateString()}</TableCell>
              <TableCell>
                {t.transactionType.charAt(0).toUpperCase() + t.transactionType.slice(1)}
              </TableCell>
              <TableCell
                className={t.transactionAmount >= 0 ? "text-emerald-500" : "text-red-500"}
              >
                {t.transactionAmount >= 0 ? "+" : "-"}$
                {Math.abs(t.transactionAmount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>
                $
                {t.accountBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>{t.age}</TableCell>
              <TableCell>{t.gender}</TableCell>
              <TableCell>
                {t.accountType.charAt(0).toUpperCase() + t.accountType.slice(1)}
              </TableCell>
              <TableCell>{t.branchId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
)

export default DataTable
