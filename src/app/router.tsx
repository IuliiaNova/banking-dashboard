import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "../widgets/Layout";
import IncomeExpenseDashboard from "../features/insights/IncomeExpenseDashboard";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const TransactionHistory = lazy(() => import("../pages/TransactionHistory"));
const Transactions = lazy(() => import("../pages/Transactions"));
const NotFound = lazy(() => import("../pages/NotFound"));

const LoadingFallback = <div className="p-4 text-center animate-pulse">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={LoadingFallback}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <Suspense fallback={LoadingFallback}>
            <TransactionHistory />
          </Suspense>
        ),
      },
      {
        path: "transactions",
        element: (
          <Suspense fallback={LoadingFallback}>
            <Transactions />
          </Suspense>
        ),
      },
      {
        path: "insights",
        element: (
          <Suspense fallback={LoadingFallback}>
            <IncomeExpenseDashboard />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={LoadingFallback}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
