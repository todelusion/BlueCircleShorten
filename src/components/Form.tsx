import React from "react";
import { iconSearchPath } from "../assets/icon";
import type { initialUrlInfo } from "../pages/home/Home";

interface FormPops {
  onSubmit?: () => void | Promise<void>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  label: {
    name?: string;
    description: string;
  };
  hideLabel?: "hidden";
  input?: "hidden" | string;
  errorHint?: {
    status: boolean;
    message: string;
  };
  showSearchIcon?: boolean;
  showOutline?: boolean;
  urlInfo?: typeof initialUrlInfo;
}

function Form({
  className,
  label,
  input,
  handleChange,
  onSubmit,
  errorHint,
  hideLabel,
  showSearchIcon,
  showOutline,
  urlInfo,
}: FormPops): JSX.Element {
  const checkUrlInfo = (): string | undefined => {
    if (urlInfo !== undefined) return urlInfo.url;
    return undefined;
  };
  return (
    <div
      className={`${
        showOutline ?? false
          ? "box-shadow lg-Pseudo border-2 border-black py-3 px-4"
          : ""
      } flex flex-col justify-between bg-white ${className}`}
    >
      <p className={hideLabel}>
        {label.description}
        {errorHint !== undefined ? (
          errorHint.status && (
            <span className="ml-1 text-xs text-red-600">
              {errorHint.message}
            </span>
          )
        ) : (
          <></>
        )}
      </p>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="flex">
        <input
          className={`w-full border-b-2 border-black outline-none  ${
            input as string
          }`}
          name={label.name}
          value={checkUrlInfo()}
          onKeyUp={(e): void => {
            if (e.key === "Enter" && onSubmit !== undefined)
              (onSubmit() as Promise<void>).catch((error) =>
                console.log(error)
              );
          }}
          onChange={(e) => {
            if (handleChange !== undefined) handleChange(e);
          }}
        />
        {showSearchIcon === true && (
          <img src={iconSearchPath} alt="seatch" width="20" />
        )}
      </label>
    </div>
  );
}
Form.defaultProps = {
  input: "block",
  handleChange: undefined,
  onSubmit: undefined,
  errorHint: {
    status: false,
    message: "",
  },
  hideLabel: "",
  showSearchIcon: false,
  showOutline: true,
  urlInfo: {},
};

export default Form;
