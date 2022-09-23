import ThemeColor from "../types/Enum";

export interface IButtonProps {
  label: string;
  buttonColor: ThemeColor;
  className: string;
  underline: string;
}

export default function Button({
  label,
  buttonColor,
  className,
  underline,
}: IButtonProps): JSX.Element {
  return (
    <div className={`h-full w-full ${className} box-shadow sm-Pseudo bg-white`}>
      <button
        type="button"
        className={`h-full w-full border-2 ${buttonColor} ${underline}`}
      >
        {label}
      </button>
    </div>
  );
}
