import React, { ChangeEvent } from "react";

type SelectOption = {
  label: string;
  value: string;
};

interface Props {
  options: SelectOption[];
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ options, value, name,
  required,
  disabled,
  helperText, onChange }: Props) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <select
        name={name}
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        disabled={disabled}
        onChange={onChange}
        required={required}
        value={value}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
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

export { SelectBox };
export type { SelectOption };
