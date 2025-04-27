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
        ${
          hasLabel ? "px-5 py-2.5" : "p-2 w-10 h-10"
        } // Ajuste padding en fonction de l'icône ou du label
      `}
    >
      {/* Affiche l'icône si elle est présente, avec un espacement adapté */}
      {props.icon && (
        <span className={`${hasLabel ? "mr-2" : ""}`}>{props.icon}</span>
      )}

      {/* Affiche le label et le spinner si le bouton est en mode "loading" */}
      {hasLabel && (
        <span className="inline-flex items-center">
          {props.label}
          {props.loading && <FaSpinner className="animate-spin w-4 h-4 ml-2" />}
        </span>
      )}

      {/* Affiche uniquement le spinner si le bouton est en mode "loading" et qu'il n'y a pas de label */}
      {!hasLabel && props.loading && (
        <FaSpinner className="animate-spin w-4 h-4" />
      )}
    </button>
  );
};

export default Button;
