import ThemeColor from "../types/Enum";

export interface IButtonProps {
  handleClick?: () => void;
  onSubmit?: () => void;
  label: string;
  buttonColor: ThemeColor;
  className: string;
  underline: string;
}

export default function Button({
  handleClick,
  onSubmit,
  label,
  buttonColor,
  className,
  underline,
}: IButtonProps): JSX.Element {
  return (
    <div className={`h-full w-full ${className} box-shadow sm-Pseudo bg-white`}>
      <button
        onClick={() => {
          if (handleClick !== undefined) handleClick();
          if (onSubmit !== undefined) onSubmit();
        }}
        type="button"
        className={`h-full w-full border-2 ${buttonColor} ${underline}`}
      >
        {label}
      </button>
    </div>
  );
}
