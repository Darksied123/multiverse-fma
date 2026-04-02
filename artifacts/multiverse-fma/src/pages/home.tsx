import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useGameStore } from "@/store/game-store";
import { motion } from "framer-motion";
import { Users, User, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [, setLocation] = useLocation();
  const { genderFilter, setGenderFilter } = useGameStore();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px-80px)] flex flex-col items-center justify-center p-6 max-w-4xl mx-auto text-center">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 rounded-full" />
          <img 
            src={`${import.meta.env.BASE_URL}images/logo-mark.png`} 
            alt="Logo" 
            className="w-40 h-40 mx-auto relative z-10"
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-display text-white uppercase tracking-widest text-glow mb-6"
        >
          {t("home.headline")} <br />
          <span className="text-marry">{t("home.marry")}</span>,{" "}
          <span className="text-date">{t("home.date")}</span>,{" "}
          <span className="text-avoid">{t("home.avoid")}</span>?
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground font-heading tracking-wide max-w-2xl mb-12"
        >
          {t("home.subheadline")}
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md bg-card border-4 border-black p-6 rounded-2xl comic-shadow-sm mb-10"
        >
          <h2 className="font-heading text-xl uppercase tracking-widest mb-4 text-white">{t("home.preferences")}</h2>
          <div className="grid grid-cols-3 gap-3">
            <FilterButton 
              active={genderFilter === 'mixed'} 
              onClick={() => setGenderFilter('mixed')}
              icon={<Users className="w-6 h-6 mb-2" />}
              label={t("home.filter_mixed")}
            />
            <FilterButton 
              active={genderFilter === 'female'} 
              onClick={() => setGenderFilter('female')}
              icon={<User className="w-6 h-6 mb-2" />}
              label={t("home.filter_female")}
            />
            <FilterButton 
              active={genderFilter === 'male'} 
              onClick={() => setGenderFilter('male')}
              icon={<UserCircle className="w-6 h-6 mb-2" />}
              label={t("home.filter_male")}
            />
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/game")}
          className="px-12 py-6 bg-primary text-black font-display text-4xl uppercase tracking-widest border-4 border-black comic-shadow-glow-primary rounded-xl"
        >
          {t("home.start")}
        </motion.button>
        
      </div>
    </Layout>
  );
}

function FilterButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 outline-none",
        active 
          ? "border-primary bg-primary/20 text-primary" 
          : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/50"
      )}
    >
      {icon}
      <span className="font-heading font-bold uppercase tracking-wider text-sm">{label}</span>
    </button>
  );
}
