import { RiErrorWarningFill } from "react-icons/ri";
import Button from "./Button";

interface ConfirmMessageProps {
  confirmationMessage: string;
  onConfirm: (confirmed: boolean) => void;
}

const ConfirmMessage = (props: ConfirmMessageProps) => {
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div className="p-4 md:p-5 text-center">
          <div className="flex flex-col items-center space-y-2">
            <RiErrorWarningFill size={40} color="orange" />
            <h4 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.confirmationMessage}
            </h4>
          </div>
          <div className="flex justify-center space-x-4">
            <Button label="Oui" onClick={() => props.onConfirm(true)} />
            <Button label="Fermer" onClick={() => props.onConfirm(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMessage;
