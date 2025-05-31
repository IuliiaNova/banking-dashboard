import type { Transaction } from "../../../entities/models/transactions";

export const mergeTransactions = (
  existing: Array<Transaction>,
  incoming: Array<Transaction>
): Transaction[] => {
  const map = new Map<string, Transaction>();
  [...existing, ...incoming].forEach((tx) => {
    if (tx.id) map.set(tx.id, tx);
  });
  return Array.from(map.values());
};
