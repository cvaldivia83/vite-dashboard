interface Validation {
  [key: string]: type;
}

interface type {
  regex: RegExp;
  message: string;
}

export default Validation;