import LoginForm from "../features/login/components/LoginForm";
import Header from "../features/login/components/Header";
import { useAuth } from "../features/login/context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login: React.FC = () => {
  const { username, password, setUsername, setPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("bankUser");
    if (savedUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

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
        <Header />
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
