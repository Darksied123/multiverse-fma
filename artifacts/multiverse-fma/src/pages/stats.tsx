import { Layout } from "@/components/layout";
import { useGetGlobalStats, LeaderboardEntry } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Loader2, Heart, Skull, Ban, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stats() {
  const { data, isLoading, isError } = useGetGlobalStats();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
          <h2 className="font-display text-3xl tracking-widest uppercase text-white animate-pulse">
            Compiling Multiverse Data...
          </h2>
        </div>
      </Layout>
    );
  }

  if (isError || !data) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h2 className="font-display text-4xl text-destructive uppercase">Failed to load leaderboard</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-black rounded-full border-4 border-black comic-shadow-sm mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-white tracking-widest uppercase text-glow">
            Global Leaderboard
          </h2>
          <p className="font-heading text-xl text-primary uppercase tracking-widest mt-4">
            Total Rounds Played: {data.totalRounds.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LeaderboardColumn 
            title="Most Married" 
            icon={<Heart className="w-6 h-6" />}
            colorClass="text-marry"
            borderColorClass="border-marry"
            bgHeaderClass="bg-marry"
            entries={data.topMarried}
          />
          <LeaderboardColumn 
            title="Most Dated" 
            icon={<Skull className="w-6 h-6" />}
            colorClass="text-date"
            borderColorClass="border-date"
            bgHeaderClass="bg-date"
            entries={data.topDated}
          />
          <LeaderboardColumn 
            title="Most Avoided" 
            icon={<Ban className="w-6 h-6" />}
            colorClass="text-avoid"
            borderColorClass="border-avoid"
            bgHeaderClass="bg-avoid"
            entries={data.topAvoided}
          />
        </div>

      </div>
    </Layout>
  );
}

function LeaderboardColumn({ 
  title, 
  icon, 
  colorClass, 
  borderColorClass,
  bgHeaderClass,
  entries 
}: { 
  title: string, 
  icon: React.ReactNode, 
  colorClass: string,
  borderColorClass: string,
  bgHeaderClass: string,
  entries: LeaderboardEntry[] 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-card border-4 rounded-2xl overflow-hidden comic-shadow", borderColorClass)}
    >
      <div className={cn("p-4 flex items-center justify-center gap-3 border-b-4 border-black text-black font-display text-3xl uppercase tracking-wider", bgHeaderClass)}>
        {icon}
        {title}
      </div>
      
      <div className="p-0 flex flex-col">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground font-heading uppercase">No data yet</div>
        ) : (
          entries.map((entry, idx) => (
            <div 
              key={entry.characterId} 
              className={cn(
                "flex items-center p-3 sm:p-4 gap-4 transition-colors hover:bg-white/5",
                idx !== entries.length - 1 && "border-b border-zinc-800"
              )}
            >
              <div className="font-display text-3xl text-zinc-600 w-8 text-center">
                #{idx + 1}
              </div>
              
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 border-black">
                <img src={entry.imageUrl} alt={entry.characterName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-bold text-lg text-white truncate leading-tight">
                  {entry.characterName}
                </h4>
                <p className="text-xs text-muted-foreground font-heading uppercase truncate">
                  {entry.universe}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                <div className={cn("font-mono text-xl font-bold", colorClass)}>
                  {Math.round(entry.percent)}%
                </div>
                <div className="text-[10px] text-muted-foreground uppercase font-heading">
                  {entry.count.toLocaleString()} votes
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
