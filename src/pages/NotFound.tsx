import { Link } from "react-router-dom";
import { Hammer } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh_-150px)] bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-6 text-center">
      <Hammer className="w-16 h-16 text-rose-base mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
        Page Under Construction
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mb-6">
        We are working to enable this section.
        It will be available for you soon. Thank you for your patience!
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center bg-rose-base text-white px-5 py-3 rounded-2xl hover:bg-rose-hover transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
