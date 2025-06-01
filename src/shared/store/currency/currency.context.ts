import { createContext, useContext } from "react";

type Currency = "EUR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency debe usarse dentro de un CurrencyProvider");
  }
  return context;
};
