import { CreditCard, HandCoins } from "lucide-react";
import FinancialUnit from "../features/account/components/FinancialUnit";
import { useTransactions } from "../features/transactions/store/transactions.context";
import { useNavigate } from "react-router-dom";
import { AccountOverview } from "../features/account/components/AccountOverview";
import { calculateBalance, convertValue } from "../shared/utils/calculate-balance";
import TransactionsView from "../features/account/components/TransactionsView";
import { useCurrency } from "../shared/store/currency/currency.context";

function Dashboard() {
  const navigate = useNavigate();
  const {
    state: { transactions },
  } = useTransactions("AccountOverview");
  const { currency } = useCurrency();
  const balance = calculateBalance(transactions);

  return (
    <div className="space-y-5 ">
      <AccountOverview />
      <div className="flex items-center justify-center gap-6">
        <div
          onClick={() => navigate("/transactions-history")}
          className="cursor-pointer"
        >
          <FinancialUnit
            title="Account"
            code="1234567812365985"
            type="account"
            icon={<HandCoins className="text-gray-700 dark:text-gray-300" />}
            amount={convertValue(currency, balance)}
          />
        </div>
        <FinancialUnit
          title="Credit Card"
          code="1234567812345678"
          type="card"
          status="Active"
          icon={<CreditCard className="text-gray-700 dark:text-gray-300" />}
        />
      </div>

      <TransactionsView />
    </div>
  );
}

export default Dashboard;
