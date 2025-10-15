"use client";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Pie, PieChart, Cell, Tooltip } from "recharts";
import { Portfolio } from "@/types/portfolio";
import { Coin } from "@/types/coin";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

const DistributionChart = ({ listing }: { listing: Coin[] }) => {
  const { user, isLoaded } = useContext(UserContext);

  if (!isLoaded || !user?.Portfolio || user.Portfolio.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Start trading to analyze your performance
      </div>
    );
  }

  const portfolioValuesBySymbol: { [key: string]: number } =
    user.Portfolio.reduce(
      (acc: { [key: string]: number }, portfolio: Portfolio) => {
        const currentPrice =
          listing.find((coin) => coin.id === portfolio.symbol)?.current_price ||
          0;
        const value = portfolio.quantity * currentPrice;
        acc[portfolio.symbol] = (acc[portfolio.symbol] || 0) + value;
        return acc;
      },
      {}
    );

  const pieChartData = Object.entries(portfolioValuesBySymbol).map(
    ([symbol, value]) => {
      const coin = listing.find((coin) => coin.id === symbol);
      return {
        name: coin ? coin.symbol.toUpperCase() : symbol.toUpperCase(),
        value,
      };
    }
  );

  const chartConfig = {
    visitors: {
      label: "Portfolio Value",
    },
  } satisfies ChartConfig;

  const colors = [
    "#1E3A8A",
    "#2563EB",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
    "#1D4ED8",
    "#1E40AF",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#2563EB",
  ];

  const formatValue = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
        <ChartContainer config={chartConfig} className="h-full aspect-auto">
          <PieChart width={600} height={400}>
            {/* Improved Tooltip */}
            <Tooltip
              formatter={(value) => formatValue(value as number)}
              contentStyle={{
                borderRadius: "6px",
                color: "#F1F5F9",
              }}
              labelStyle={{ color: "#F1F5F9" }}
            />
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={180}
              innerRadius={70}
              label={({ name, value }) => `${name}: ${formatValue(value)}`}
              isAnimationActive
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  strokeWidth={2}
                  // stroke="#1E293B"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
  );
};

export default DistributionChart;
