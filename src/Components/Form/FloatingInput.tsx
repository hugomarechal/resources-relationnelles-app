import React, { ChangeEvent } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  value: string | number;
  name: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<InputProps> = ({
  type,
  label,
  value,
  name,
  required,
  error,
  disabled,
  helperText,
  onChange,
}) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        disabled={disabled}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
          error ? "border-red-500" : "border-gray-300"
        } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        placeholder=" "
        required={required}
        onChange={onChange}
        aria-invalid={error}
        aria-describedby={helperText ? `${name}-helper-text` : undefined}
      />
      <label
        htmlFor={name}
        className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 
                    transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
      >
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {helperText && helperText?.length > 0 && (
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
