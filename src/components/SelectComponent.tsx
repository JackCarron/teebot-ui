import React from 'react';

interface Props {
  name: string
  options: {label:string; value:string;}[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children?: React.ReactNode;
}

const SelectComponent = ({ options, value, onChange, children, name }: Props) => {
  return (
    <div className='form-field'>
      {children}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
