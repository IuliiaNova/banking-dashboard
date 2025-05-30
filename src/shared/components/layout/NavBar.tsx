import { Bell } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="p-4 h-18 bg-gray-50 dark:bg-background-extra-dark text-gray-800 dark:text-white flex justify-between items-center">
      <div className=" flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-rose-200" />
        <span>Welcome, user</span>
      </div>

      <Bell size={24} />
    </nav>
  );
}
