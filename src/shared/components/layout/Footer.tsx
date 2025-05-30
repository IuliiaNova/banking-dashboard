import { Home, BarChart3, Wallet, MoreHorizontal, ArrowLeftRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="p-6 h-16 bg-gray-50 border-t-2 border-rose-base/10 dark:bg-background-extra-dark text-white shadow-md">
      <nav className="flex justify-around items-center text-gray-600 dark:text-gray-400">
        <NavLink
          to="/dashboard"
          className={({ isActive }: { isActive: boolean }) =>
            `${
              isActive ? "text-rose-base" : "text-gray-400"
            } hover:text-rose-hover active:text-rose-active`
          }
        >
          <Home size={24} />
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }: { isActive: boolean }) =>
            `${
              isActive ? "text-rose-base" : "text-gray-400"
            } hover:text-rose-hover active:text-rose-active`
          }
        >
          <BarChart3 size={24} />
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }: { isActive: boolean }) =>
            `${
              isActive ? "text-rose-base" : "text-gray-400"
            } hover:text-rose-hover active:text-rose-active`
          }
        >
          <ArrowLeftRight size={24} />
        </NavLink>
        <NavLink
          to="/more"
          className={({ isActive }: { isActive: boolean }) =>
            `${
              isActive ? "text-rose-base" : "text-gray-400"
            } hover:text-rose-hover active:text-rose-active`
          }
        >
          <MoreHorizontal size={24} />
        </NavLink>
      </nav>
    </footer>
  );
};
