"use client";

import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: string; animationDuration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((current) => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100 + "%",
          animationDuration: Math.random() * 3 + 4 + "s", // 4-7s
        };
        // Keep only last 20 hearts to avoid performance issues
        return [...current.slice(-19), newHeart];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-20px] text-2xl animate-float opacity-70"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
