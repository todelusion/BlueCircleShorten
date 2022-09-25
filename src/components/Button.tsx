import { ThemeColor } from "../types/Enum";

export interface IButtonProps {
  onSubmit?: () => void;
  onReset?: () => void;
  label: string;
  buttonColor: ThemeColor;
  className: string;
  underline: string;
}

export default function Button({
  onSubmit,
  onReset,
  label,
  buttonColor,
  className,
  underline,
}: IButtonProps): JSX.Element {
  return (
    <div className={`h-full w-full ${className} box-shadow sm-Pseudo bg-white`}>
      <button
        onClick={() => {
          if (onSubmit !== undefined) onSubmit();
          if (onReset !== undefined) onReset();
        }}
        type="button"
        className={`h-full w-full border-2 ${buttonColor} ${underline}`}
      >
        {label}
      </button>
    </div>
  );
}
