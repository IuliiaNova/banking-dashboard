// src/shared/components/ui/AlertMessage.tsx
type AlertProps = {
    type: "success" | "error";
    message: string;
  };
  
  export const Alert = ({ type, message }: AlertProps) => {
    const baseStyles =
      "px-4 py-3 rounded-md text-sm font-medium shadow transition-all";
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
  