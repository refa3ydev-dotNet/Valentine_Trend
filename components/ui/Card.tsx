import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white/40 backdrop-blur-lg border border-white/60 rounded-3xl p-8 shadow-xl ${className}`}>
      {children}
    </div>
  );
}
