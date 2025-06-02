import React, { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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

