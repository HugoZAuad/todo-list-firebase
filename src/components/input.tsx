import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showToggle?: boolean;
}

const Input = ({ label, showToggle, type, ...rest }: InputProps) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative w-full mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={isPassword && showToggle ? (visible ? "text" : "password") : type}
        className="w-full p-3 border rounded"
        {...rest}
      />
      {isPassword && showToggle && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {visible ? "👁️" : "🙈"}
        </button>
      )}
    </div>
  );
};

export default Input;
