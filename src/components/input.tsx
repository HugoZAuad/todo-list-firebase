type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
};

export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
}: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      className="w-full px-3 py-2 border rounded
        bg-light-card text-light-text border-light-border
        dark:bg-dark-card dark:text-dark-text dark:border-dark-border
        focus:outline-none focus:ring-2 focus:ring-primary transition"
    />
  );
}
