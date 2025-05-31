export const getAmountStyle = (type: string) => {
  return type === "deposit" ? "text-green-500" : "text-red-500";
};

export const formatAmount = (amount: number, type: string) => {
  const sign = type === "deposit" ? "+" : "-";
  return `${sign}${amount.toFixed(2)} €`;
};
