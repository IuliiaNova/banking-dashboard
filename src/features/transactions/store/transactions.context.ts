import React, { createContext, useContext } from "react";
import type { Transaction } from "../../../entities/models/transactions";
import type { TransactionAction } from "./transactions.reducer";
import type { RequestState } from "../../../entities/models/common";

export type State = {
  transactions: Transaction[];
  loading: RequestState;
};

export type Dispatch = React.Dispatch<TransactionAction>;


export type TransactionsContextType = {
  state: State;
  dispatch: Dispatch;
};

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);
TransactionsContext.displayName = "TransactionsContext";

export const useTransactions = (target: string) => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      `The useTransactions hook in the ${target} component must be used within a TransactionsProvider`
    );
  }
  return context;
};
