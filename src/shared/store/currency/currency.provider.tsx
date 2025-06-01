import { useState, type ReactNode } from "react";
import { CurrencyContext } from "./currency.context";

type Currency = "EUR" | "USD";

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("EUR");

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "EUR" ? "USD" : "EUR"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

