import React from "react";

interface FormPops {
  className: string;
  label: string;
}

function Form({ className, label }: FormPops): JSX.Element {
  return (
    <div
      className={`box-shadow lg-Pseudo slate-Pseudo flex flex-col justify-between border-2 border-black bg-white py-3 px-4 lg:h-24  ${className}`}
    >
      <p>{label}</p>
      <input className="w-full border-b-2 border-black outline-none" />
    </div>
  );
}

export default Form;
