// src/shared/context/AlertProvider.tsx
import { useState, useCallback, useEffect, type ReactNode } from "react";
import { AlertContext } from "./alert.context";
import { Alert } from "../../components/ui/Alert";

type AlertType = "success" | "error";

type AlertState = {
  type: AlertType;
  message: string;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = useCallback(
    ({ type, message }: { type: AlertType; message: string }) => {
      setAlert({ type, message });
    },
    []
  );

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};
