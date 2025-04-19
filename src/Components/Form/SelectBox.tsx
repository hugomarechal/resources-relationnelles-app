import { ChangeEvent } from "react";

type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  options: SelectOption[];
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = (props: SelectProps) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <select
        name={props.name}
        id={props.name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        disabled={props.disabled}
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      >
        {props.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {props.helperText && props.helperText?.length > 0 && (
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {props.helperText}
        </p>
      )}
    </div>
  );
};

export { SelectBox };
export type { SelectOption };
