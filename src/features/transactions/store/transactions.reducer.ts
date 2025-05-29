import type { Transaction } from "../../../entities/models/transactions";
import type { State } from "./transactions.context";

export type TransactionAction =
  | { type: "ADD"; payload: Transaction }
  | { type: "REMOVE"; payload: string }
  | { type: "EDIT"; payload: Transaction }
  | { type: "UNDO" }
  | { type: "SET"; payload: Transaction[] };

export function transactionsReducer(
  state: State,
  action: TransactionAction
): State {
  switch (action.type) {
    case "SET":
      return { transactions: action.payload };

    case "ADD":
      return {
        transactions: [action.payload, ...state.transactions],
      };

    case "REMOVE":
      return {
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "EDIT":
      return {
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "UNDO":
      return {
        transactions: state.transactions.slice(1),
      };

    default:
      return state;
  }
}
