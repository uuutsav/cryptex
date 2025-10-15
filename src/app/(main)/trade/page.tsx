"use client";

import Container from "@/components/global/container";
import CoinDetails from "@/components/main/trade/details";
import ListingTable from "@/components/main/trade/table";
import { Button } from "@/components/ui/button";
import { SelectedCoinProvider } from "@/contexts/SelectCoin";
import { UserContext } from "@/contexts/UserContext";
import { Zap } from "lucide-react";
import React, { useContext } from "react";

const Trade = () => {
  const { user, isLoaded } = useContext(UserContext);

  return (
    <Container className="pt-2 h-full flex flex-col gap-4 overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="font-medium md:text-xl">Trade</h1>
        {isLoaded && user?.type == "FREE" && (
          <Button variant={"ghost"} className="flex items-center gap-1">
            <Zap fill="#facc15" size={20} color="#facc15" />
            Upgrade
          </Button>
        )}
      </div>
      <Container
        delay={0.6}
        className="h-full grid grid-cols-1 lg:grid-cols-3 md:gap-4 pb-2"
      >
        <SelectedCoinProvider>
          <div className="col-span-1">
            <ListingTable />
          </div>
          <div className="col-span-2">
            <CoinDetails />
          </div>
        </SelectedCoinProvider>
      </Container>
    </Container>
  );
};

export default Trade;
