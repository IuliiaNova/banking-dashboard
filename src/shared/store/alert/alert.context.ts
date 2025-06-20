import { createContext, useContext } from "react";

export type AlertType = "success" | "error";

type AlertContextType = {
  showAlert: ({type, message}: {type: AlertType, message: string}) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
AlertContext.displayName = "AlertContext";

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
