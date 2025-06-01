import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/globals.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { TransactionsProvider } from "./features/transactions/store/transactions.provider.tsx";
import { CurrencyProvider } from "./shared/store/currency/currency.provider.tsx";
import { AlertProvider } from "./shared/store/alert/alert.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <CurrencyProvider>
        <TransactionsProvider>
          <RouterProvider router={router} />
        </TransactionsProvider>
      </CurrencyProvider>
    </AlertProvider>
  </StrictMode>
);
