import { useEffect, useState } from "react";
import { useTransactions } from "../../../features/transactions/store/transactions.context";
import mockData from "../../../features/transactions/mock/transactions.json";
import { mapRawTransactions } from "../../../entities/mappers/map";
import type { TransactionRaw } from "../../../entities/models/transactions";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);

export const AccountOverview = () => {
  const {
    state: { transactions },
    dispatch,
  } = useTransactions("AccountOverview");

  const [isLoading, setIsLoading] = useState(true);

  const handleDataFromMock = () => {
    setIsLoading(true);
    try {
      const formatedData = mapRawTransactions(
        mockData as Array<TransactionRaw>
      );
      dispatch({ type: "SET", payload: formatedData });
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading mock data:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleDataFromMock();
  }, []);

  // Obtener fecha actual y mes actual
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based (enero = 0)

  // Filtrar transacciones del mes actual
  const transactionsThisMonth = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return (
      tDate.getFullYear() === currentYear && tDate.getMonth() === currentMonth
    );
  });

  // Calcular ingresos y gastos del mes actual
  const income = transactionsThisMonth
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactionsThisMonth
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Balance total (todas las transacciones)
  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);

  const renderValue = (value: number) =>
    isLoading ? (
      <p className="text-gray-400 italic">Loading...</p>
    ) : (
      formatCurrency(value)
    );

  return (
    <section className="bg-white p-4 rounded-2xl shadow-md mb-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Account Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-lg font-bold text-blue-600">
            {renderValue(balance)}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Income (This Month)</p>
          <p className="text-lg font-bold text-green-600">
            {renderValue(income)}
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Expenses (This Month)</p>
          <p className="text-lg font-bold text-red-600">
            {renderValue(expenses)}
          </p>
        </div>
      </div>
    </section>
  );
};
