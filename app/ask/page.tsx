"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FloatingHearts from "@/components/FloatingHearts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { i18n, Language } from "@/lib/i18n";

// ─── Local GIF files in /public/gifs/ask/ ───
const ASK_GIFS = [
  "/gifs/ask/511329709015824525.gif",
  "/gifs/ask/3117522263724372729.gif",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max));
}

function AskContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "ar" || stored === "en") setLang(stored);
    } catch {}
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === "en" ? "ar" : "en";
      try { localStorage.setItem("lang", next); } catch {}
      return next;
    });
  };

  const [names, setNames] = useState({ from: "", to: "", gender: "male" });

  useEffect(() => {
    setNames({
      from: searchParams.get("from") || "Someone",
      to: searchParams.get("to") || "You",
      gender: searchParams.get("g") || "male",
    });
    const queryLang = searchParams.get("lang");
    if (queryLang === "ar" || queryLang === "en") {
      setLang(queryLang);
      try { localStorage.setItem("lang", queryLang); } catch {}
    }
  }, [searchParams]);

  const [gifSrc] = useState(() => pickRandom(ASK_GIFS));

  // ─── No button: escapes out of card, clamped to WINDOW ───
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [escaped, setEscaped] = useState(false);

  const moveButton = useCallback(() => {
    if (!noBtnRef.current) return;

    const bW = noBtnRef.current.offsetWidth;
    const bH = noBtnRef.current.offsetHeight;

    const maxX = window.innerWidth - bW - 16;
    const maxY = window.innerHeight - bH - 16;

    const newX = clamp(Math.random() * maxX, 16, maxX);
    const newY = clamp(Math.random() * maxY, 16, maxY);

    setNoPos({ x: newX, y: newY });
    setEscaped(true);
  }, []);

  // Mouse proximity: when cursor is within 120px of No button center, move it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;

      const btnRect = noBtnRef.current.getBoundingClientRect();
      const centerX = btnRect.left + btnRect.width / 2;
      const centerY = btnRect.top + btnRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 120) {
        moveButton();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [moveButton]);

  // On window resize, clamp noPos within viewport
  useEffect(() => {
    const handleResize = () => {
      if (!noBtnRef.current || !noPos) return;
      const bW = noBtnRef.current.offsetWidth;
      const bH = noBtnRef.current.offsetHeight;
      const maxX = window.innerWidth - bW - 16;
      const maxY = window.innerHeight - bH - 16;
      setNoPos((prev) =>
        prev ? { x: clamp(prev.x, 16, maxX), y: clamp(prev.y, 16, maxY) } : prev
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [noPos]);

  const t = i18n[lang];
  const isRTL = lang === "ar";

  const handleYes = () => {
    const params = new URLSearchParams();
    params.set("from", names.from);
    params.set("to", names.to);
    params.set("g", names.gender);
    params.set("lang", lang);
    router.push(`/yes?${params.toString()}`);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200"
      dir={t.dir}
    >
      <FloatingHearts />
      <LanguageToggle lang={lang} toggle={toggleLanguage} />

      <div className="z-10 w-full max-w-md mx-auto">
        <Card className="glass-card w-full flex flex-col items-center text-center p-6 sm:p-8 animate-fade-in-up">
          {/* GIF */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gifSrc}
            alt="Cute Valentine"
            className="mx-auto w-[min(240px,80vw)] rounded-2xl shadow-lg mb-6"
          />

          {/* Question */}
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600 mb-8 leading-relaxed ${
              isRTL ? "font-arabic" : "font-sans"
            }`}
          >
            {t.ask.question(names.to, names.from)}
          </h1>

          {/* Buttons area */}
          <div className="flex gap-6 items-center justify-center w-full">
            <Button
              onClick={handleYes}
              className="text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4"
            >
              {t.ask.yesBtn}
            </Button>

            {/* No button: shown here initially, then hidden when escaped */}
            {!escaped && (
              <Button
                ref={noBtnRef}
                variant="danger"
                className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 whitespace-nowrap"
                onTouchStart={(e: React.TouchEvent) => {
                  e.preventDefault();
                  moveButton();
                }}
                onMouseEnter={moveButton}
              >
                {t.ask.noBtn}
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Escaped No button: fixed position, clamped to window bounds */}
      {escaped && noPos && (
        <Button
          ref={noBtnRef}
          variant="danger"
          className="fixed text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 z-50 whitespace-nowrap"
          style={{
            left: noPos.x,
            top: noPos.y,
            transition: "left 180ms ease-out, top 180ms ease-out",
          }}
          onTouchStart={(e: React.TouchEvent) => {
            e.preventDefault();
            moveButton();
          }}
          onMouseEnter={moveButton}
        >
          {t.ask.noBtn}
        </Button>
      )}
    </main>
  );
}

export default function AskPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200">
          <div className="animate-pulse text-rose-400 text-2xl">💘</div>
        </div>
      }
    >
      <AskContent />
    </Suspense>
  );
}
