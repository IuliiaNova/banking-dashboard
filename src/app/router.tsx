import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "../widgets/Layout";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const TransactionHistory = lazy(
  () => import("../pages/transactionHistory/TransactionHistory")
);
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionHistory />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
