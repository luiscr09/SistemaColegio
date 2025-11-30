import React from "react";

interface Option {
  id: string | number;
  label: string;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
}

export const FieldSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className={`w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-white ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
