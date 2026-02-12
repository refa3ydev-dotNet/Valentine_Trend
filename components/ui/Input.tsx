import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-valentine-800 mb-1">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2 rounded-xl border-2 border-valentine-200 focus:border-valentine-500 focus:outline-none focus:ring-2 focus:ring-valentine-200 bg-white/80 backdrop-blur-sm transition-all placeholder:text-valentine-300 ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
