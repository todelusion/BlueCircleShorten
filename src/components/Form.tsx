import React from "react";

interface FormPops {
  className: string;
  label: string;
  type: string;
  border: string;
}

function Form({ className, label, type, border }: FormPops): JSX.Element {
  return (
    <div className={className}>
      <div className="border-2 border-black bg-white py-3 px-5">
        <p>{label}</p>
        <input
          type={type}
          className={`w-full ${border} border-b-2 border-black outline-none`}
        />
      </div>
    </div>
  );
}

export default Form;
