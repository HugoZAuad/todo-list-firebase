interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const Button = ({ children, onClick, type = "button", disabled, className }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 rounded text-white ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
