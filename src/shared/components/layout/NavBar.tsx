import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";

export default function NavBar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("bankUser");
    setUsername(storedUser);
  }, []);

  return (
    <nav className="p-4 h-18 bg-gray-50 dark:bg-background-extra-dark text-gray-800 dark:text-white flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-100 border-gray-300 dark:border-gray-700 flex items-center justify-center 
    shadow-sm text-gray-600 d hover:bg-gray-200 dark:hover:bg-rose-hover transition cursor-pointer">
          <User size={20} />
        </div>

        <span className="font-bold">
          Welcome, {username ? username : "Guest"}
        </span>
      </div>

      <Bell size={24} />
    </nav>
  );
}
