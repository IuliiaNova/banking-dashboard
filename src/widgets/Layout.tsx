// src/widgets/Layout.tsx
import { Outlet } from "react-router-dom";
import { Footer } from "../shared/components/layout/Footer";
import NavBar from "../shared/components/layout/NavBar";

export const Layout = () => (
  <div className="min-h-screen h-screen bg-background-extra-dark flex flex-col justify-between">
    <NavBar />
    <main className="h-full p-4">
      <Outlet />
    </main>
    <Footer />
  </div>
);
