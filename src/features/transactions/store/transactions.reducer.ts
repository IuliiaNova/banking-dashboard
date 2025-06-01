import type { RequestState } from "../../../entities/models/common";
import type { Transaction } from "../../../entities/models/transactions";
import type { State } from "./transactions.context";

export type TransactionAction =
  | { type: "ADD"; payload: Transaction }
  | { type: "REMOVE"; payload: string }
  | { type: "EDIT"; payload: Transaction }
  | { type: "UNDO" }
  | { type: "SET"; payload: Transaction[] }
  | { type: "REQUEST_STATE"; payload: RequestState };


export function transactionsReducer(
  state: State,
  action: TransactionAction
): State {
  switch (action.type) {
    case "SET":
      return { 
        ...state,
        transactions: action.payload };

    case "ADD":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "REMOVE":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

      case "EDIT":
        return {
          ...state,
          transactions: state.transactions.map((t) =>
            t.id === action.payload.id ? { ...t, ...action.payload } : t
          ),
        };
      

    case "UNDO":
      return {
        ...state,
        transactions: state.transactions.slice(1),
      };
      case "REQUEST_STATE":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
