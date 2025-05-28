// src/widgets/Layout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "../shared/components/layout/Footer";
import NavBar from "../shared/components/layout/NavBar";

export const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <NavBar />
    <main className="p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);
