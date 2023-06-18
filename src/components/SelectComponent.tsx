import React from 'react';

interface Props {
  name: string
  options: {label:string; value:string;}[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const SelectComponent = ({ options, value, onChange, children, name, disabled }: Props) => {
  return (
    <>
      {children}
      <select disabled={disabled} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
