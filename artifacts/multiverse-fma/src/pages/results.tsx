import { useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { CharacterCard } from "@/components/character-card";
import { useGameStore } from "@/store/game-store";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Results() {
  const [, setLocation] = useLocation();
  const { lastRoundResult, lastRoundCharacters, clearLastRoundData } = useGameStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!lastRoundResult || lastRoundCharacters.length === 0) {
      setLocation("/game");
    }
  }, [lastRoundResult, lastRoundCharacters, setLocation]);

  const handleNextRound = () => {
    clearLastRoundData();
    setLocation("/game");
  };

  if (!lastRoundResult) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-6xl md:text-8xl text-primary tracking-wide text-glow uppercase"
          >
            {t("results.title")}
          </motion.h2>
          <p className="font-heading text-xl text-muted-foreground uppercase tracking-widest mt-4">
            {t("results.global_stats")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {lastRoundCharacters.map((char, i) => {
            const stats = lastRoundResult.characterStats.find(s => s.characterId === char.id);
            
            return (
              <CharacterCard
                key={char.id}
                character={char}
                index={i}
                choice={char.choiceAssigned}
                showStats={true}
                stats={stats ? {
                  marry: stats.marryPercent,
                  date: stats.datePercent,
                  avoid: stats.avoidPercent
                } : undefined}
              />
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col sm:flex-row justify-center gap-4 pb-12"
        >
          <button
            onClick={handleNextRound}
            className="flex items-center justify-center gap-4 px-12 py-5 bg-primary text-white font-display text-4xl uppercase tracking-widest border-4 border-black comic-shadow-glow-primary rounded-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >
            {t("results.play_again")} <ArrowRight className="w-8 h-8 stroke-[3]" />
          </button>
          <button
            onClick={() => setLocation("/stats")}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-card text-white font-heading text-xl uppercase tracking-widest border-4 border-border rounded-xl hover:border-primary hover:-translate-y-1 transition-all duration-200"
          >
            <BarChart3 className="w-6 h-6" />
            {t("results.view_leaderboard")}
          </button>
        </motion.div>

      </div>
    </Layout>
  );
}
