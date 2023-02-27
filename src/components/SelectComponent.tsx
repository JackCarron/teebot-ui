import React, { useState } from 'react';

interface Props {
  name: string
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
}

const SelectComponent = ({ options, value, onChange, children, name }: Props) => {
  return (
    <div>
      {children}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
