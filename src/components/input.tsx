import { InputHTMLAttributes, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  secureInput?: boolean;
}

const Input = ({
  showToggle = false,
  secureInput = false,
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 relative">
      <input
        {...props}
        type={inputType}
        autoComplete="new-password"
        className="w-full px-4 py-2 border rounded text-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onCopy={secureInput ? (e) => e.preventDefault() : props.onCopy}
        onPaste={secureInput ? (e) => e.preventDefault() : props.onPaste}
        onCut={secureInput ? (e) => e.preventDefault() : props.onCut}
        onDragStart={secureInput ? (e) => e.preventDefault() : props.onDragStart}
        onSelect={secureInput ? (e) => e.preventDefault() : props.onSelect}
        style={secureInput ? { userSelect: "none" } : props.style}
      />

      {isPassword && showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-xl text-gray-950"
          aria-label="Alternar visibilidade da senha"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
