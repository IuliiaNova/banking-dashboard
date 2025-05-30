import { useEffect, useReducer, type ReactNode } from "react";
import { TransactionsContext, type State } from "./transactions.context";
import { transactionsReducer } from "./transactions.reducer";
import mockData from "../../../features/transactions/mock/transactions.json";
import { mapRawTransactions } from "../../../entities/mappers/map";
import type { TransactionRaw } from "../../../entities/models/transactions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../../entities/models/common";

const initialState: State = {
  transactions: [],
  loading: 'idle'
};
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);
  const [storedTransactions, setStoredTransactions] = useLocalStorage<State["transactions"]>(
    LOCAL_STORAGE_KEY,
    []
  );

  const loadMockData = () => {
    dispatch({ type: 'REQUEST_STATE', payload: 'pending' });
    try {
      const formattedData = mapRawTransactions(mockData as Array<TransactionRaw>);
      dispatch({ type: "SET", payload: formattedData });
      setStoredTransactions(formattedData);
    } catch (error) {
      console.error("Error loading mock data:", error);
      dispatch({ type: 'REQUEST_STATE', payload: 'error' });
    } finally {
      dispatch({ type: 'REQUEST_STATE', payload: 'success' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'REQUEST_STATE', payload: 'pending' });

    if (storedTransactions.length > 0) {
      dispatch({ type: "SET", payload: storedTransactions });
      dispatch({ type: 'REQUEST_STATE', payload: 'success' });
    } else {
      loadMockData();
    }
  }, []);

  useEffect(() => {
    if (state.transactions.length > 0) {
      setStoredTransactions(state.transactions);
    }
  }, [state.transactions]);

  return (
    <TransactionsContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
};
