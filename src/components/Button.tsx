import { ReactNode } from "react";

export interface IButtonProps {
  onSubmit?: () => void | Promise<void>;
  onReset?: () => void;
  label?: string | ReactNode;
  buttonColor: string;
  className: string;
  underline: "no-underline" | "underline";
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
          if (onSubmit !== undefined) void onSubmit();
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
