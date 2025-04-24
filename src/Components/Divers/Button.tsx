import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const hasLabel = !!props.label;

  return (
    <button
      onClick={props.onClick}
      type="button"
      disabled={props.disabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg text-sm text-white text-center
        bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
        focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
        disabled:opacity-90 disabled:cursor-not-allowed disabled:from-purple-400 disabled:to-blue-400
        ${hasLabel ? "px-5 py-2.5" : "p-2 w-10 h-10"}
      `}
    >
      {props.icon}
      {hasLabel && (
        <span className="inline-flex items-center ml-2">
          {props.label}
          {props.loading && <FaSpinner className="animate-spin w-4 h-4 ml-2" />}
        </span>
      )}
      {!hasLabel && props.loading && <FaSpinner className="animate-spin w-4 h-4 ml-2" />}
    </button>
  );
};

export default Button;
