import React from "react";
import InputField from "./InputField";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-background-extra-dark shadow-md rounded-2xl px-6 py-8 space-y-6"
      aria-label="Login form"
    >
      <InputField
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        required
        value={username}
        onChange={onUsernameChange}
        placeholder="Enter your name"
        ariaDescribedBy="username-help"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={onPasswordChange}
        placeholder="••••••••"
      />

      <button
        type="submit"
        className="w-full bg-rose-base hover:bg-rose-hover text-white font-semibold py-2 rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-base"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
