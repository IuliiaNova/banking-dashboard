import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  ariaDescribedBy?: string;
}

const InputField = ({
  id,
  label,
  type,
  autoComplete,
  value,
  onChange,
  placeholder,
  required = false,
  ariaDescribedBy,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-describedby={ariaDescribedBy}
      className="appearance-none w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-base focus:border-transparent"
    />
  </div>
);

export default InputField;
