"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/global/container";
import {
  ChartCard,
  PortfolioCard,
  StatsCard,
} from "@/components/main/dashboard/cards";
import {
  ChartNoAxesCombined,
  DollarSign,
  LucideHandCoins,
  Wallet,
} from "lucide-react";
import { User } from "@/types/user";
import { GetUserDetails } from "@/api/users";
import { getCoinsList } from "@/api/trade/route";
import { Coin } from "@/types/coin";
import Upgrade from "@/components/main/upgrade";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [listing, setListing] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getCoinsList();
      setListing(data);
    };
    async function getUserDetails() {
      try {
        const response = await GetUserDetails();
        setUser(response);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    getUserDetails();
    fetchListing();
  }, []);

  const portfolioValue = () => {
    if (user?.Portfolio && listing.length > 0) {
      return user.Portfolio.reduce((total: number, holding) => {
        const coin = listing.find((coin) => coin.id === holding.symbol);
        if (coin) {
          return total + holding.quantity * coin.current_price;
        }
        return total;
      }, 0);
    }
    return 0;
  };

  const totalCost = () => {
    if (user?.Portfolio && listing.length > 0) {
      return user.Portfolio.reduce((total: number, holding) => {
        const coin = listing.find((coin) => coin.id === holding.symbol);
        if (coin) {
          return total + holding.quantity * holding.purchasePrice;
        }
        return total;
      }, 0);
    }
    return 0;
  };

  const profitLoss = () => {
    const currentValue = portfolioValue();
    const cost = totalCost();
    const profitLoss = ((currentValue - cost) / cost) * 100;
    return profitLoss.toFixed(2);
  };

  const topAsset = () => {
    if (user?.Portfolio && listing.length > 0) {
      const assetsWithProfit = user.Portfolio.map((holding) => {
        const coin = listing.find((coin) => coin.id === holding.symbol);
        if (coin) {
          const profit = coin.current_price - holding.purchasePrice;
          const proftPercentage = (profit / holding.purchasePrice) * 100;
          return {
            symbol: coin.symbol.toUpperCase(),
            profit,
            proftPercentage,
          };
        }
        return null;
      }).filter((asset) => asset !== null);

      const top = assetsWithProfit.reduce(
        (max, asset) =>
          !max || asset.proftPercentage > max.proftPercentage ? asset : max,
        assetsWithProfit[0]
      );

      return top
        ? `${top.symbol} (${top.proftPercentage.toFixed(2)}%)`
        : "No assets";
    }
    return "No assets";
  };

  return (
    <Container className="pt-2 h-full flex flex-col gap-4 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="font-medium md:text-xl">Dashboard</h1>
        {isLoaded && user?.type == "FREE" && <Upgrade />}
      </div>
      <Container
        delay={0.4}
        className="h-fit grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          className=""
          key={"portfolioValue"}
          loaded={isLoaded}
          icon={<Wallet className="text-primary" />}
          title={"Portfolio Value"}
          value={
            isLoaded && !user?.Portfolio
              ? "-"
              : `$ ${String(portfolioValue().toFixed(2))}`
          }
        />
        <StatsCard
          className=""
          key={"profitLoss"}
          loaded={isLoaded}
          icon={<ChartNoAxesCombined className="text-primary" />}
          title={"Total Profit/Loss"}
          value={
            isLoaded && !user?.Portfolio ? "-" : `${String(profitLoss())} %`
          }
        />
        <StatsCard
          className=""
          key={"topAsset"}
          loaded={isLoaded}
          icon={<LucideHandCoins className="text-primary" />}
          title={"Top Asset"}
          value={isLoaded && !user?.Portfolio ? "-" : String(topAsset())}
        />
        <StatsCard
          className=""
          key={"availableBalance"}
          loaded={isLoaded}
          icon={<DollarSign className="text-primary" />}
          title={"Available Balance"}
          value={
            user?.type == "FREE"
              ? `$${
                  user?.balance
                    ? user?.balance
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : "N/A"
                }`
              : "Unlimited"
          }
        />
      </Container>
      <Container
        delay={0.6}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2"
      >
        <ChartCard listing={listing} />
        <PortfolioCard listing={listing} />
      </Container>
    </Container>
  );
};

export default Dashboard;
