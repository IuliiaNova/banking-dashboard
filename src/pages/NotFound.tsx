import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-6 text-center">
      <Hammer className="w-16 h-16 text-rose-base mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
        Página en desarrollo
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mb-6">
        Estamos trabajando para habilitar esta sección.
        Pronto estará disponible para ti. Gracias por tu paciencia!
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-rose-base text-white px-5 py-3 rounded-2xl hover:bg-rose-hover transition-all"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
