type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: string;
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  borderRadius?: string;
  font?: string;
  textColor?: string;
};

const Button = ({
  type = "button",
  children,
  className,
  bgColor = "bg-primary",
  borderRadius = "rounded-[10px]",
  font = "font-raleway",
  textColor = "text-white",
}: ButtonProps) => {
  const baseStyles = `${bgColor} w-full text-lg ${font} ${textColor} ${bgColor} ${borderRadius} font-raleway font-medium `;
  return (
    <button type={type} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
