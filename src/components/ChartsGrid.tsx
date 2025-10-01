"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import type { Transaction } from "../types";

interface Props {
  data: Transaction[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const ChartsGrid = ({ data }: Props) => {
  // Transaction Volume Over Time
  const dailyVolume: { [date: string]: number } = {};
  data.forEach((t) => {
    const date = t.transactionDate.toISOString().split("T")[0];
    dailyVolume[date] =
      (dailyVolume[date] || 0) + Math.abs(t.transactionAmount);
  });
  const sortedDates = Object.keys(dailyVolume).sort();
  const volumeData = sortedDates.slice(-30).map((date) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    volume: dailyVolume[date] || 0,
  }));

  // Transaction Types Distribution
  const typeCounts: { [type: string]: number } = {};
  data.forEach((t) => {
    typeCounts[t.transactionType] = (typeCounts[t.transactionType] || 0) + 1;
  });
  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
  }));

  // Account Balance Distribution
  const balanceRanges = {
    "0-1K": 0,
    "1K-5K": 0,
    "5K-10K": 0,
    "10K-25K": 0,
    "25K+": 0,
  };
  data.forEach((t) => {
    const balance = t.accountBalance;
    if (balance < 1000) balanceRanges["0-1K"]++;
    else if (balance < 5000) balanceRanges["1K-5K"]++;
    else if (balance < 10000) balanceRanges["5K-10K"]++;
    else if (balance < 25000) balanceRanges["10K-25K"]++;
    else balanceRanges["25K+"]++;
  });
  const balanceData = Object.entries(balanceRanges).map(([range, count]) => ({
    range,
    count,
  }));

  // Customer Demographics (Age Groups)
  const ageGroups = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "56+": 0,
  };
  data.forEach((t) => {
    const age = t.age;
    if (age <= 25) ageGroups["18-25"]++;
    else if (age <= 35) ageGroups["26-35"]++;
    else if (age <= 45) ageGroups["36-45"]++;
    else if (age <= 55) ageGroups["46-55"]++;
    else ageGroups["56+"]++;
  });
  const ageData = Object.entries(ageGroups).map(([age, count]) => ({
    age,
    count,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {/* Transaction Volume Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume Over Time</CardTitle>
          <CardDescription>
            Daily transaction volume for the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              volume: {
                label: "Volume",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="var(--color-volume)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Transaction Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Types</CardTitle>
          <CardDescription>Distribution of transaction types</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
              },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={typeData}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {typeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Account Balance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balance Distribution</CardTitle>
          <CardDescription>Number of accounts by balance range</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Accounts",
                color: "var(--chart-1)",
              },
            }}
            className="h-[300px]"
          >
            <BarChart
              data={balanceData}
              accessibilityLayer
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="range"
                className="text-xs"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis className="text-xs" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Customer Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Demographics</CardTitle>
          <CardDescription>Customer distribution by age group</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Customers",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="age" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsGrid;
