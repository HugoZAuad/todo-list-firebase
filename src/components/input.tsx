import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showToggle?: boolean;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  showToggle = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword && showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-4">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isPassword && showToggle && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-xl text-gray-600 cursor-pointer"
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      )}
    </div>
  );
};

export default Input;
