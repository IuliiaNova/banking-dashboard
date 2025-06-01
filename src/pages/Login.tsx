import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../features/login/components/LoginForm";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (trimmedUsername) {
      localStorage.setItem("bankUser", trimmedUsername);
      navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            For demo purposes only. Any credentials will work.
          </p>
        </header>

        <LoginForm
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
        />
      </div>
    </main>
  );
};

export default Login;
