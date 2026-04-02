import { Layout } from "@/components/layout";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <AlertCircle className="w-20 h-20 text-primary" />
        <h1 className="font-display text-6xl md:text-8xl text-white tracking-wide text-glow">
          {t("notfound.title")}
        </h1>
        <p className="font-heading text-xl text-muted-foreground uppercase tracking-widest">
          {t("notfound.message")}
        </p>
        <button
          onClick={() => setLocation("/")}
          className="mt-4 px-12 py-4 bg-primary text-white font-display text-2xl uppercase tracking-widest border-4 border-black comic-shadow-sm hover:-translate-y-1 transition-transform"
        >
          {t("notfound.back")}
        </button>
      </div>
    </Layout>
  );
}
