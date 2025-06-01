import { v4 as uuidv4 } from "uuid";
import type { Transaction } from "../../../entities/models/transactions";

export const mergeTransactions = (
  existing: Transaction[],
  incoming: Transaction[]
): Transaction[] => {
  const map = new Map<string, Transaction>();

  for (const tx of existing) {
    map.set(tx.id, tx);
  }

  for (const tx of incoming) {
    const id = tx.id?.trim() || uuidv4();
    map.set(id, { ...tx, id });
  }

  return Array.from(map.values());
};
