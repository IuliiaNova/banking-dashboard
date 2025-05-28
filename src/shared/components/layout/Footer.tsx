import { Home, BarChart3, Wallet, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="h-16 border-t border-zinc-800 bg-black text-white">
      <nav className="h-16 border-t border-zinc-800 bg-black text-white flex justify-around items-center">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-red-500" : "text-gray-400"
          }
        >
          <Home size={24} />
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-red-500" : "text-gray-400"
          }
        >
          <BarChart3 size={24} />
        </NavLink>
        <NavLink
          to="/wallet"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-red-500" : "text-gray-400"
          }
        >
          <Wallet size={24} />
        </NavLink>
        <NavLink
          to="/more"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "text-red-500" : "text-gray-400"
          }
        >
          <MoreHorizontal size={24} />
        </NavLink>
      </nav>
    </footer>
  );
};
