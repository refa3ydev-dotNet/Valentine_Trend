export type Language = 'en' | 'ar';

export const i18n = {
  en: {
    dir: 'ltr',
    ask: {
      question: (to: string, from: string) => `Hey ${to}, will you be ${from}'s Valentine? 💘`,
      yesBtn: "YES 😍",
      noBtn: "No 😭",
    },
    yes: {
      message: (to: string, from: string, gender: string) => `YAAAY ${to}! ${from} is so happy 🥳💖`,
      createOwn: "Create Your Own"
    },
    home: {
      title: "Valentine's Link Generator",
      fromLabel: "Your Name",
      toLabel: "Partner's Name",
      genderLabel: "Your Gender",
      male: "Male",
      female: "Female",
      generateBtn: "Generate Link",
      copyBtn: "Copy Link",
      copied: "Copied!",
      fillAll: "Please fill all fields"
    }
  },
  ar: {
    dir: 'rtl',
    ask: {
      question: (to: string, from: string) => `يا ${to}، هتكون ڤالنتاين ${from}؟ 💘`,
      yesBtn: "أيوه 😍",
      noBtn: "لأ 😭",
    },
    yes: {
      message: (to: string, from: string, gender: string) => 
        gender === 'female' 
          ? `يييه يا ${to}! ${from} فرحانة جدًا 🥳💖` 
          : `يييه يا ${to}! ${from} فرحان جدًا 🥳💖`,
      createOwn: "اعمل واحدة ليك"
    },
    home: {
      title: "مُنشئ رابط الفالنتين",
      fromLabel: "اسمك",
      toLabel: "اسم شريكك",
      genderLabel: "نوعك",
      male: "ذكر",
      female: "أنثى",
      generateBtn: "إنشاء الرابط",
      copyBtn: "نسخ الرابط",
      copied: "تم النسخ!",
      fillAll: "من فضلك املأ جميع الحقول"
    }
  }
};
