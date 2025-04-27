import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="text-white inline-flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
      disabled:opacity-90 disabled:cursor-not-allowed disabled:bg-gradient-to-br disabled:from-purple-400 disabled:to-blue-400"
      disabled={props.disabled}
    >
      {props.icon}
      <span className="inline-flex items-center">
        {props.label}
        {props.loading && <FaSpinner className="animate-spin w-4 h-4 ml-2" />}
      </span>
    </button>
  );
};

export default Button;
