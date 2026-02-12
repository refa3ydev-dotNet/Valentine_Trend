import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "clear";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const baseStyles =
      "px-6 py-3 rounded-full font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer select-none";
    const variants = {
      primary:
        "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/40",
      secondary:
        "bg-white/80 text-rose-600 border-2 border-rose-200 hover:bg-white hover:border-rose-300 shadow-md",
      danger:
        "bg-white/80 text-rose-600 border-2 border-rose-400 hover:bg-white hover:border-rose-500 shadow-lg shadow-rose-200/40 font-semibold",
      clear:
        "bg-transparent text-rose-600 hover:bg-white/20",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
