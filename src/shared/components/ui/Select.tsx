import React, { useState, useRef, useEffect } from "react";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

const Select = ({
  name,
  value,
  options,
  onChange,
  className = "",
  disabled = false,
  placeholder,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) setHighlighted(-1);
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === "Enter" || e.key === "ArrowDown")) {
      setOpen(true);
      setHighlighted(0);
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") {
        setHighlighted((h) => Math.min(h + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter" && highlighted >= 0) {
        onChange(options[highlighted].value);
        setOpen(false);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        ref={ref}
        type="button"
        name={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        className={`
          w-full border border-rose-base rounded-lg bg-white dark:bg-background-dark py-2 px-3 text-left text-sm dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-active flex justify-between items-center
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span>
          {options.find((opt) => opt.value === value)?.label || placeholder || options[0].label}
        </span>
        <svg className="ml-2 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 14a1 1 0 0 1-.71-.29l-5-5a1 1 0 1 1 1.42-1.42L10 11.59l4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5A1 1 0 0 1 10 14z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <ul
          tabIndex={-1}
          role="listbox"
          className="absolute left-0 z-50 mt-1 w-full rounded-lg bg-gray-50 dark:bg-background-dark shadow-lg border border-gray-500 py-1 text-sm max-h-48 overflow-auto"
        >
          {options.map((option, idx) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`px-3 py-2 cursor-pointer ${
                idx === highlighted ? "bg-rose-50 dark:bg-rose-900" : ""
              } ${value === option.value ? "font-bold" : ""}`}
              onMouseEnter={() => setHighlighted(idx)}
              onMouseDown={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {/* Campo hidden para formularios */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default Select;
