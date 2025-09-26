import { backgroundColors, textColors } from "../components/buttonStyles";

export interface ButtonProps {
  size: 'base' | 'large' | 'extended';
  background: keyof typeof backgroundColors;
  color: keyof typeof textColors;
  border: boolean;
  text: string;
  type: string;
  onClick?: () => void;
}