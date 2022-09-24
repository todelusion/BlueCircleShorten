import React from "react";

interface FormPops {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  label: {
    name?: string;
    description: string;
  };
  input?: string;
  errorHint?: {
    status: boolean;
    message: string;
  };
}

function Form({
  className,
  label,
  input,
  handleChange,
  errorHint,
}: FormPops): JSX.Element {
  return (
    <div
      className={`box-shadow lg-Pseudo slate-Pseudo flex flex-col justify-between border-2 border-black bg-white py-3 px-4 ${className}`}
    >
      <p>
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
      <input
        className={`w-full border-b-2 border-black outline-none ${
          input as string
        }`}
        name={label.name}
        onChange={(e) => {
          if (handleChange !== undefined) handleChange(e);
        }}
      />
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
};

export default Form;
