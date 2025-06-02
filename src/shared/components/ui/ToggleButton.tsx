import React from "react";

type ToggleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    pressed: boolean;
    className?: string;
  }

export function ToggleButton({
  pressed,
  onClick,
  disabled,
  children,
  className = "",
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition ${className}
        ${disabled
          ? "border-transparent bg-gray-200 dark:bg-gray-700 cursor-default"
          : "border-gray-200 dark:border-gray-700 bg-gray-20 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-base"
        }`
      }
      {...props}
    >
      {children}
    </button>
  );
}
