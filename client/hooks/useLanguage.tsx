import { useState, useMemo } from "react";

type Lang = "en" | "hi";

const dict: Record<Lang, Record<string, string>> = {
  en: {
    scanNow: "Scan Now",
    heroHeading: "Smart farming for every Kisan",
    heroSub: "Scan soil, seeds and crops. Get instant AI advice in simple language.",
    upload: "Upload Photo",
    or: "or",
    takePhoto: "Use Camera",
    analyzing: "Analyzing...",
    results: "Results",
  },
  hi: {
    scanNow: "अभी स्कैन करें",
    heroHeading: "हर किसान के लिए स्मार्ट खेती",
    heroSub: "मिट्टी, बीज और फसल की फोटो स्कैन करें। तुरंत सरल भाषा में सलाह पाएं।",
    upload: "फोटो अपलोड करें",
    or: "या",
    takePhoto: "कैमरा से लें",
    analyzing: "विश्लेषण जारी...",
    results: "परिणाम",
  },
};

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => dict[lang], [lang]);
  return { lang, setLang, t };
}
