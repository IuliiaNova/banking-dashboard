import { CirclePlus, CreditCard, HandCoins } from "lucide-react";
import { AccountOverview } from "./components/AccountOverview";
import FinancialUnit from "./components/FinancialUnit";
import { useTransactions } from "../../features/transactions/store/transactions.context";

function Dashboard() {
  const {
    state: { transactions },
  } = useTransactions("AccountOverview");
  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  return (
    <div className="space-y-5">
      <AccountOverview />
      <div className="flex gap-6 justify-between">
        <FinancialUnit
          title="Account"
          code="1234567812365985"
          type="account"
          icon={<HandCoins />}
          amount={balance}
        />
        <FinancialUnit
          title="Credit Card"
          code="1234567812345678"
          type="card"
          status="Active"
          icon={<CreditCard />}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="mb-4 text-md font-semibold text-gray-800 dark:text-gray-100 truncate">
        Funds and investments
      </span>
        <div className="w-44 sm:w-80 md:w-96 bg-white dark:bg-background-dark rounded-2xl shadow-md p-4 flex flex-col gap-3 transition-all duration-300">
          <CirclePlus size={40} color="gray" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
            Add funds </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
