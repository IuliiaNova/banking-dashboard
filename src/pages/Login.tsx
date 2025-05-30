import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim()) {
      localStorage.setItem("bankUser", username.trim());
      navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            For demo purposes only. Any credentials will work.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-background-extra-dark shadow-md rounded-2xl px-6 py-8 space-y-6"
          aria-label="Login form"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-base focus:border-transparent"
              placeholder="Enter your name"
              aria-describedby="username-help"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-base focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-base hover:bg-rose-hover text-white font-semibold py-2 rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-base"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
