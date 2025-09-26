import React, { ChangeEvent } from 'react';
import Validation from '../types/validations';

const validations: Validation = {
  email: {
    regex: /(.+)@{1}\w+\.(com)?\.?\w{2}?/i,
    message: 'Email inválido'
  },
  nome: {
    regex: /[a-zA-Z]+\s?[a-zA-Z]?/i,
    message: "Nome inválido"
  },
  sobrenome: {
    regex: /[a-zA-Z]+\s?[a-zA-Z]?/i,
    message: 'Sobrenome inválido'
  },
  valor_compra: {
    regex: /\d+(\.|,)?\d*/,
    message: 'Valor inválido'
  }
};

const useForm = (type: string, defaultValue: string = '') => {
  const [value, setValue] = React.useState(defaultValue);
  const [error, setError] = React.useState<string | null>(null);

  function validates(value: string): boolean {
    if (type === undefined) return true;
    if (value.length === 0) {
      setError('Campo obrigatório');
      return false;
    } else if ( validations[type] && !validations[type].regex.test(value)) {
      setError(validations[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    if(error) {
      validates(event.target.value);
    }
    setValue(event.target.value);
  }

  return {
    value,
    error, 
    setValue,
    onChange,
    onBlur: () => validates(value),
    validate: () => validates(value)  
  }
}

export default useForm;