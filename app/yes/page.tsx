"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { Language } from "@/lib/i18n";

// ─── Local GIF files in /public/gifs/yes/ ───
const YES_GIFS = [
  "/gifs/yes/7402501822404747417.gif",
  "/gifs/yes/20918046.gif",
  "/gifs/yes/14525912051662013798.gif",
  "/gifs/yes/13675744697862103587.gif",
  "/gifs/yes/15435204016040493403.gif",
  "/gifs/yes/11880198396384526796.gif",
];

// ─── Word rain phrases ───
const EN_PHRASES = [
  "I love you", "Be mine", "Cutie", "💖", "💕", "Forever",
  "Kiss", "Hug", "Valentine", "You + Me", "❤️", "My love",
  "Sweetheart", "Always", "XOXO", "💘", "Darling", "Babe",
  "Soulmate", "🥰",
];
const AR_PHRASES = [
  "بحبك", "هدايا", "قلبي", "إنت", "إنتي", "ڤالنتاين", "💖", "💕",
  "أحلى حاجة", "حضن", "بوسة", "❤️", "عمري", "حبيبي", "حبيبتي",
  "يا قمر", "🥰", "💘", "روحي", "نور عيني",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Word Rain Component ───
interface FallingWord {
  id: number;
  text: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

function WordRain({ lang, active }: { lang: Language; active: boolean }) {
  const [words, setWords] = useState<FallingWord[]>([]);

  useEffect(() => {
    if (!active) {
      setWords([]);
      return;
    }

    const phrases = lang === "ar" ? AR_PHRASES : EN_PHRASES;
    const generated: FallingWord[] = [];

    for (let i = 0; i < 160; i++) {
      generated.push({
        id: i,
        text: pickRandom(phrases),
        x: Math.random() * 95,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 3,
        size: 0.8 + Math.random() * 1.4,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    setWords(generated);
  }, [active, lang]);

  if (!active || words.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes wordFall {
          0% { transform: translateY(-60px); opacity: 0; }
          10% { opacity: var(--word-opacity); }
          100% { transform: translateY(105vh); opacity: var(--word-opacity); }
        }
      `}</style>
      {words.map((w) => (
        <span
          key={w.id}
          className="absolute whitespace-nowrap font-bold text-rose-500"
          style={{
            left: `${w.x}vw`,
            top: 0,
            fontSize: `${w.size}rem`,
            "--word-opacity": w.opacity,
            opacity: 0,
            animation: `wordFall ${w.duration}s ${w.delay}s ease-in forwards`,
          } as React.CSSProperties}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

// ─── Success Message (no mixed Arabic+English on same line) ───
function SuccessMessage({
  to,
  from,
  gender,
  lang,
}: {
  to: string;
  from: string;
  gender: string;
  lang: Language;
}) {
  if (lang === "ar") {
    const feeling = gender === "female" ? "فرحانة جدًا" : "فرحان جدًا";
    return (
      <div className="space-y-2">
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-600">
          يييه! 🥳💖
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-rose-500">
          يا{" "}
          <span dir="ltr" style={{ unicodeBidi: "isolate" }} className="inline-block font-extrabold text-rose-700">
            {to}
          </span>
        </div>
        <div className="text-xl sm:text-2xl font-semibold text-rose-500">
          <span dir="ltr" style={{ unicodeBidi: "isolate" }} className="inline-block font-bold text-rose-700">
            {from}
          </span>{" "}
          {feeling}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-600">
        YAAAY {to}!
      </div>
      <div className="text-xl sm:text-2xl font-semibold text-rose-500">
        {from} is so happy 🥳💖
      </div>
    </div>
  );
}

// ─── Main Content ───
function YesContent() {
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
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      gender: searchParams.get("g") || "male",
    });

    const queryLang = searchParams.get("lang");
    if (queryLang === "ar" || queryLang === "en") {
      setLang(queryLang);
      try { localStorage.setItem("lang", queryLang); } catch {}
    }

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e11d48", "#be123c", "#fb7185", "#ec4899"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e11d48", "#be123c", "#fb7185", "#ec4899"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [searchParams]);

  const [gifSrc] = useState(() => pickRandom(YES_GIFS));

  const [rainActive, setRainActive] = useState(false);

  const triggerRain = useCallback(() => {
    setRainActive(false);
    requestAnimationFrame(() => setRainActive(true));
  }, []);

  const isRTL = lang === "ar";

  const surpriseText =
    lang === "ar"
      ? `${names.from} عاملك مفاجأة 🎁`
      : `${names.from} made you a surprise 🎁`;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <FloatingHearts />
      <LanguageToggle lang={lang} toggle={toggleLanguage} />
      <WordRain lang={lang} active={rainActive} />

      <div className="z-10 w-full max-w-lg text-center">
        <Card className="glass-card p-8 sm:p-10 animate-fade-in-up">
          {/* GIF */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gifSrc}
            alt="Valentine celebration"
            className="mx-auto w-[min(260px,80vw)] rounded-2xl shadow-xl mb-8"
          />

          {/* Success message */}
          <div className={`mb-6 ${isRTL ? "font-arabic" : "font-sans"}`}>
            <SuccessMessage
              to={names.to}
              from={names.from}
              gender={names.gender}
              lang={lang}
            />
          </div>

          {/* Surprise button */}
          <Button
            onClick={triggerRain}
            className="mt-4 px-8 py-3 text-lg"
          >
            {surpriseText}
          </Button>
        </Card>
      </div>
    </main>
  );
}

export default function YesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200">
          <div className="animate-pulse text-rose-400 text-2xl">💖</div>
        </div>
      }
    >
      <YesContent />
    </Suspense>
  );
}
