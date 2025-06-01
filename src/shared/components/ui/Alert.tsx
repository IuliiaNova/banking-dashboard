type AlertProps = {
  type: "success" | "error";
  message: string;
};

export const Alert = ({ type, message }: AlertProps) => {
  const baseStyles =
    "fixed h-16 bottom-5 left-1/2 top-1/2 -translate-x-1/2 px-4 py-3 rounded-md text-sm font-medium shadow z-50 transition-all";
  const styles =
    type === "success"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";

  return (
    <div
      role="alert"
      className={`${baseStyles} ${styles}`}
      aria-live="assertive"
    >
      {message}
    </div>
  );
};
