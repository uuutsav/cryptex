import { Coin } from "@/types/coin";
import React, { createContext, useState, ReactNode } from "react";

type SelectedCoinContextType = {
  selectedCoin?: Coin;
  setSelectedCoin: (coin: Coin) => void;
};

export const SelectedCoinContext = createContext<SelectedCoinContextType>({
  selectedCoin: {} as Coin,
  setSelectedCoin: () => {},
});

export const SelectedCoinProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin>();

  return (
    <SelectedCoinContext.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </SelectedCoinContext.Provider>
  );
};
