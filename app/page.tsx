"use client";

import { useState } from "react";
import { Copy, Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LanguageToggle from "@/components/LanguageToggle";
import { i18n, Language } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [gender, setGender] = useState("male");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  const t = i18n[lang];
  const isRTL = lang === 'ar';

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const generateLink = () => {
    if (!fromName || !toName) {
        alert(t.home.fillAll);
        return;
    }
    
    // Create base URL (in production this would be your domain)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    
    const params = new URLSearchParams();
    params.set("from", fromName);
    params.set("to", toName);
    params.set("g", gender);
    // params.set("lang", lang); // Optional: default to generator lang
    
    setGeneratedLink(`${baseUrl}/ask?${params.toString()}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <main 
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 transition-colors duration-500"
        dir={t.dir}
    >
      <FloatingHearts />
      <LanguageToggle lang={lang} toggle={toggleLanguage} />

      <div className="z-10 w-full max-w-md">
        <Card className="glass-card bg-white/60 backdrop-blur-md shadow-2xl border-white/50 p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-rose-100 rounded-full mb-4 shadow-inner">
                <Heart className="w-8 h-8 text-rose-500 animate-pulse" fill="currentColor" />
            </div>
            <h1 className={`text-3xl font-bold text-rose-600 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                {t.home.title}
            </h1>
          </div>

          <div className="space-y-6">
            <Input
              label={t.home.fromLabel}
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder={lang === 'en' ? "e.g. Romeo" : "مثال: روميو"}
            />
            
            <Input
              label={t.home.toLabel}
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              placeholder={lang === 'en' ? "e.g. Juliet" : "مثال: جولييت"}
            />

            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">
                {t.home.genderLabel}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${gender === 'male' ? 'border-rose-500' : 'border-rose-300 group-hover:border-rose-400'}`}>
                    {gender === 'male' && <div className="w-3 h-3 bg-rose-500 rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-rose-600">{t.home.male}</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${gender === 'female' ? 'border-rose-500' : 'border-rose-300 group-hover:border-rose-400'}`}>
                    {gender === 'female' && <div className="w-3 h-3 bg-rose-500 rounded-full" />}
                  </div>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-rose-600">{t.home.female}</span>
                </label>
              </div>
            </div>

            {!generatedLink ? (
              <Button 
                onClick={generateLink} 
                className="w-full mt-4 bg-rose-500 hover:bg-rose-600 shadow-rose-200/50"
              >
                {t.home.generateBtn}
              </Button>
            ) : (
              <div className="animate-fade-in-up">
                <div className="p-3 bg-white/50 rounded-lg break-all text-sm mb-3 border border-rose-100/50">
                  {generatedLink}
                </div>
                <Button 
                    onClick={copyToClipboard} 
                    className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600"
                    disabled={showCopied}
                >
                  {showCopied ? (
                    t.home.copied
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t.home.copyBtn}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
