// import { ButtonProps } from "../types/button";
import { backgroundColors, textColors } from "./buttonStyles";

type ButtonProps = React.ComponentProps<'button'> & {
  size: 'base' | 'large' | 'extended';
  background: keyof typeof backgroundColors;
  color: keyof typeof textColors;
  border: boolean;
  text: string;
  type: string;
}

const Button = ({size, background, color, border, text, ...props}: ButtonProps) => {
  return (
    <button className={`btn-${size} ${textColors[color]} ${backgroundColors[background]} ${ border && `border border-${color}`} py-2 px-7 rounded text font-medium cursor-pointer`} {...props}>
      {text}
    </button>
  );
}

export default Button;