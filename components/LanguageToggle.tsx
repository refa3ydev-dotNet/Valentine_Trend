"use client";

import Button from "@/components/ui/Button";

interface LanguageToggleProps {
  lang: 'en' | 'ar';
  toggle: () => void;
}

export default function LanguageToggle({ lang, toggle }: LanguageToggleProps) {
  return (
    <Button
      onClick={toggle}
      variant="secondary"
      className="fixed top-4 right-4 z-50 text-sm font-bold min-w-[50px] shadow-lg backdrop-blur-sm bg-white/80"
    >
      {lang === 'en' ? 'AR' : 'EN'}
    </Button>
  );
}
