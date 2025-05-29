import { useReducer, type ReactNode } from "react";
import { TransactionsContext, type State } from "./transactions.context";
import { transactionsReducer } from "./transactions.reducer";

const initialState: State = {
  transactions: [],
};
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  return (
    <TransactionsContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
};
