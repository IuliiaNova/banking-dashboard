import React, { createContext, useContext } from "react";
import type { Transaction } from "../../../entities/transactions";
import type { TransactionAction } from "./transactions.reducer";

export type State = {
  transactions: Transaction[];
};

export type TransactionsContextType = {
  state: State;
  dispatch: React.Dispatch<TransactionAction>;
};

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export const useTransactions = ({ target }: { target: string }) => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      `The useTransactions hook in the ${target} component must be used within a TransactionsProvider`
    );
  }
  return context;
};
