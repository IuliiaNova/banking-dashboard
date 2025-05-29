import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/globals.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { TransactionsProvider } from "./features/transactions/store/transactions.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransactionsProvider>
      <RouterProvider router={router} />
    </TransactionsProvider>
  </StrictMode>
);
