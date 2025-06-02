import React, { useState, type ReactNode } from "react";
import { AuthContext } from "./auth.context";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Provider value={{ username, password, setUsername, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

