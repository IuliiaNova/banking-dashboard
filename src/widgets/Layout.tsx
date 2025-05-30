import { Outlet } from "react-router-dom";
import { Footer } from "../shared/components/layout/Footer";
import NavBar from "../shared/components/layout/NavBar";

export const Layout = () => (
  <div className="bg-background-extra-dark min-h-screen">
    <header className="fixed top-0 left-0 right-0 z-50">
      <NavBar />
    </header>
    <main className="pt-16 pb-20 px-4 min-h-screen">
      <Outlet />
    </main>
    <footer className="fixed bottom-0 left-0 right-0 z-50">
      <Footer />
    </footer>
  </div>
);
