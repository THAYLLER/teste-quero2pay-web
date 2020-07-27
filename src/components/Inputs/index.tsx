import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface InputPorps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Inputs: React.FC<InputPorps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <input
      className="form-control"
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    />
  );
};

export default Inputs;
