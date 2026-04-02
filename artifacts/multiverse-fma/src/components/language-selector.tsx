import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ja", label: "日本語", name: "Japanese" },
  { code: "es", label: "ES", name: "Español" },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 border-2 border-border rounded-xl px-2 py-1 bg-card/80">
      <Globe className="w-4 h-4 text-muted-foreground mr-1 shrink-0" />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          title={lang.name}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2 py-0.5 rounded-lg font-heading text-xs font-bold uppercase tracking-wide transition-all ${
            i18n.language === lang.code || i18n.language.startsWith(lang.code)
              ? "bg-primary text-black"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
