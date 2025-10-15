"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { Coin } from "@/types/coin";
import { useContext } from "react";

const PortfolioTable = ({ listing }: { listing: Coin[] }) => {
  const { user, isLoaded } = useContext(UserContext);

  const setProfitLoss = (
    id: string,
    purchasePrice: number,
    quantity: number
  ) => {
    const currentCoin = listing.find((coin) => coin.id === id);
    if (currentCoin) {
      const profitLoss = (currentCoin.current_price - purchasePrice) * quantity;
      return profitLoss;
    }
    return 0;
  };

  const totalProfitLoss =
    user?.Portfolio.reduce((total, holding) => {
      const currentPrice =
        listing.find((coin) => coin.id === holding.symbol)?.current_price || 0;
      const profitLoss =
        currentPrice * holding.quantity -
        holding.purchasePrice * holding.quantity;
      return total + profitLoss;
    }, 0) || 0;

  return (
    <>
      {isLoaded && !user?.Portfolio && (
        <div className="h-full w-full flex items-center justify-center">
          Start trading to view your portfolio
        </div>
      )}
      {isLoaded && user?.Portfolio && (
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Current</TableHead>
              <TableHead className="text-right">Profit/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.Portfolio.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell className="font-medium uppercase">
                  {listing.find((coin) => coin.id === holding.symbol)?.symbol}
                </TableCell>
                <TableCell>{holding.quantity}</TableCell>
                <TableCell>
                  ${(holding.purchasePrice * holding.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  $
                  {(
                    (listing.find((coin) => coin.id === holding.symbol)
                      ?.current_price || 0) * holding.quantity
                  ).toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right",
                    setProfitLoss(
                      holding.symbol,
                      holding.purchasePrice,
                      holding.quantity
                    ) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {setProfitLoss(
                    holding.symbol,
                    holding.purchasePrice,
                    holding.quantity
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell
                className={cn(
                  "text-right",
                  totalProfitLoss > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {totalProfitLoss.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
};

export default PortfolioTable;
