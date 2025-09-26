import { RefObject } from "react";

export interface InputProps {
  id: string;
  placeholder: string;
  label: string;
  type: string;
  value: string;
  classname?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement | null>;
}