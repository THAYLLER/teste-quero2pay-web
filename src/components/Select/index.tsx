import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Data {
  id: string;
  name: string;
}

interface SelectPorps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  data: Data[];
}

const Select: React.FC<SelectPorps> = ({ name, data, ...rest }) => {
  const SelectRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: SelectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  console.log(data);
  return (
    <select
      className="form-control"
      defaultValue={defaultValue}
      ref={SelectRef}
      {...rest}
    >
      <option>Selecione</option>
      {data.map(data => (
        <option key={data.id} value={data.id}>
          {data.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
