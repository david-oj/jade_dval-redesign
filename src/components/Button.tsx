type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  borderRadius?: string;
  font?: string;
  textColor?: string;
};

const Button = ({
  type = "button", // Default to "button"
  children,
  className,
  bgColor = "bg-primary",
  borderRadius = "rounded-[10px]",
  font = "font-raleway",
  textColor = "text-white",
  ...props // Capture remaining props
}: ButtonProps) => {
  const baseStyles = `${bgColor} w-full text-lg ${font} ${textColor} ${borderRadius} font-medium`;

  return (
    <button
      {...props}
      type={type as "button" | "submit" | "reset"} // Explicit type assertion
      className={`${baseStyles} ${className} transform active:scale-[0.975] transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
