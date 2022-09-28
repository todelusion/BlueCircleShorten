import React from "react";
import { iconSearchPath } from "../assets/icon";

interface FormPops {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  label: {
    name?: string;
    description: string;
  };
  hideLabel?: "hidden";
  input?: "hidden";
  errorHint?: {
    status: boolean;
    message: string;
  };
  showSearchIcon?: boolean;
}

function Form({
  className,
  label,
  input,
  handleChange,
  errorHint,
  hideLabel,
  showSearchIcon,
}: FormPops): JSX.Element {
  return (
    <div
      className={`box-shadow lg-Pseudo slate-Pseudo flex flex-col justify-between border-2 border-black bg-white py-3 px-4 ${className}`}
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
          className={`w-full border-b-2 border-black outline-none ${
            input as string
          }`}
          name={label.name}
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
  errorHint: {
    status: false,
    message: "",
  },
  hideLabel: "",
  showSearchIcon: false,
};

export default Form;
