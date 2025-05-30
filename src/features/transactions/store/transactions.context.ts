import React, { createContext, useContext } from "react";
import type { Transaction } from "../../../entities/models/transactions";
import type { TransactionAction } from "./transactions.reducer";
import type { RequestState } from "../../../entities/models/common";

export type State = {
  transactions: Transaction[];
  loading: RequestState;
};

export type TransactionsContextType = {
  state: State;
  dispatch: React.Dispatch<TransactionAction>;
};

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export const useTransactions = (target: string) => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      `The useTransactions hook in the ${target} component must be used within a TransactionsProvider`
    );
  }
  return context;
};
