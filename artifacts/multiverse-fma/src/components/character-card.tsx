import { Character } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, Skull, Ban } from "lucide-react";
import { useState } from "react";

const isPlaceholderUrl = (url: string) =>
  !url || url === "" || url.includes("ui-avatars.com");

// CDNs that support open CORS — load directly without proxying
const DIRECT_HOSTS = [
  "ddragon.leagueoflegends.com",
  "raw.communitydragon.org",
  "cdn.communitydragon.org",
];

function buildImageSrc(url: string): string {
  if (isPlaceholderUrl(url)) return url;
  try {
    const { hostname } = new URL(url);
    if (DIRECT_HOSTS.includes(hostname)) return url;
  } catch {
    return url;
  }
  return `/api/proxy/image?url=${encodeURIComponent(url)}`;
}

function NeonPortrait({ character }: { character: Character }) {
  const initials = character.name
    .split(/[\s\-_]/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hue = character.name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ background: `linear-gradient(135deg, hsl(${hue},60%,8%) 0%, hsl(${hue},40%,18%) 100%)` }}
    >
      {/* Comic halftone dots bg */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(${hue},80%,70%) 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />
      {/* Diagonal comic lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(${hue},80%,70%) 0px, hsl(${hue},80%,70%) 1px, transparent 1px, transparent 12px)`,
        }}
      />
      {/* Initials badge */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full border-4 shadow-2xl"
        style={{
          width: 110,
          height: 110,
          borderColor: `hsl(${hue},80%,55%)`,
          background: `radial-gradient(circle at 35% 35%, hsl(${hue},60%,25%), hsl(${hue},60%,8%))`,
          boxShadow: `0 0 30px hsl(${hue},80%,50%), 0 0 70px hsl(${hue},60%,25%), inset 0 0 20px hsl(${hue},40%,15%)`,
        }}
      >
        <span
          className="font-black text-5xl tracking-tighter select-none"
          style={{
            color: `hsl(${hue},95%,80%)`,
            textShadow: `0 0 15px hsl(${hue},90%,70%), 0 0 30px hsl(${hue},80%,50%)`,
          }}
        >
          {initials}
        </span>
      </div>
      <div className="relative z-10 mt-5 px-3 text-center">
        <p
          className="font-heading font-black text-sm uppercase tracking-widest leading-tight"
          style={{
            color: `hsl(${hue},80%,80%)`,
            textShadow: `0 0 8px hsl(${hue},80%,60%)`,
          }}
        >
          {character.name}
        </p>
      </div>
    </div>
  );
}

function ImageWithFallback({ character }: { character: Character }) {
  const [failed, setFailed] = useState(false);

  if (isPlaceholderUrl(character.imageUrl) || failed) {
    return <NeonPortrait character={character} />;
  }

  return (
    <img
      src={buildImageSrc(character.imageUrl)}
      alt={character.name}
      className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

interface CharacterCardProps {
  character: Character;
  choice?: 'marry' | 'fuck' | 'avoid';
  onChoice?: (choice: 'marry' | 'fuck' | 'avoid') => void;
  disabledChoices?: ('marry' | 'fuck' | 'avoid')[];
  index: number;
  showStats?: boolean;
  stats?: { marry: number; fuck: number; avoid: number };
}

export function CharacterCard({ 
  character, 
  choice, 
  onChoice, 
  disabledChoices = [], 
  index,
  showStats,
  stats
}: CharacterCardProps) {
  
  const getShadowClass = () => {
    if (choice === 'marry') return 'comic-shadow-glow-marry border-marry';
    if (choice === 'fuck') return 'comic-shadow-glow-fuck border-fuck';
    if (choice === 'avoid') return 'comic-shadow-glow-avoid border-avoid';
    return 'comic-shadow border-black hover:-translate-y-2 hover:comic-shadow-glow-primary transition-all duration-300';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      className="flex flex-col w-full max-w-sm mx-auto"
    >
      {/* Card Body */}
      <div className={cn(
        "relative flex-1 bg-card rounded-2xl overflow-hidden border-4 flex flex-col transition-all duration-300",
        getShadowClass()
      )}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-black border-b-4 border-black overflow-hidden">
          <ImageWithFallback character={character} />
          {/* Halftone overlay effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          
          {/* Universe Badge */}
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-heading tracking-widest uppercase border-2 border-white rounded-md transform -skew-x-6">
            {character.universe}
          </div>
          
          {/* Result Overlay if showing stats */}
          {showStats && choice && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
               <motion.div 
                 initial={{ scale: 0, rotate: -20 }}
                 animate={{ scale: 1, rotate: [-10, 5, 0] }}
                 transition={{ type: 'spring', delay: index * 0.2 + 0.3 }}
                 className={cn(
                   "text-6xl font-display uppercase border-4 px-6 py-2 bg-black transform -skew-y-6",
                   choice === 'marry' ? "text-marry border-marry" :
                   choice === 'fuck' ? "text-fuck border-fuck" :
                   "text-avoid border-avoid"
                 )}
               >
                 {choice}
               </motion.div>
             </div>
          )}
        </div>

        {/* Text Container */}
        <div className="p-5 flex flex-col flex-1 justify-between bg-zinc-900">
          <div>
            <h3 className="font-heading font-bold text-2xl uppercase leading-none mb-1 text-white">
              {character.name}
            </h3>
            {character.ageNote && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {character.ageNote}
              </p>
            )}
          </div>
          
          {showStats && stats && (
            <div className="mt-4 pt-4 border-t-2 border-zinc-800 space-y-2">
              <StatBar label="Marry" percent={stats.marry} colorClass="bg-marry" />
              <StatBar label="F***" percent={stats.fuck} colorClass="bg-fuck" />
              <StatBar label="Avoid" percent={stats.avoid} colorClass="bg-avoid" />
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls (Hidden if showing stats) */}
      {!showStats && onChoice && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <ChoiceButton 
            type="marry" 
            active={choice === 'marry'} 
            disabled={disabledChoices.includes('marry') && choice !== 'marry'}
            onClick={() => onChoice('marry')}
            icon={<Heart className="w-5 h-5" />}
          />
          <ChoiceButton 
            type="fuck" 
            active={choice === 'fuck'} 
            disabled={disabledChoices.includes('fuck') && choice !== 'fuck'}
            onClick={() => onChoice('fuck')}
            icon={<Skull className="w-5 h-5" />}
          />
          <ChoiceButton 
            type="avoid" 
            active={choice === 'avoid'} 
            disabled={disabledChoices.includes('avoid') && choice !== 'avoid'}
            onClick={() => onChoice('avoid')}
            icon={<Ban className="w-5 h-5" />}
          />
        </div>
      )}
    </motion.div>
  );
}

function StatBar({ label, percent, colorClass }: { label: string, percent: number, colorClass: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-heading tracking-wide">
      <div className="w-12 uppercase text-muted-foreground font-bold">{label}</div>
      <div className="flex-1 h-3 bg-black rounded-full overflow-hidden border border-zinc-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className={cn("h-full", colorClass)} 
        />
      </div>
      <div className="w-10 text-right font-mono text-white">{Math.round(percent)}%</div>
    </div>
  );
}

function ChoiceButton({ 
  type, 
  active, 
  disabled, 
  onClick, 
  icon 
}: { 
  type: 'marry' | 'fuck' | 'avoid', 
  active: boolean, 
  disabled: boolean, 
  onClick: () => void,
  icon: React.ReactNode
}) {
  
  const baseColors = {
    marry: "text-marry border-marry hover:bg-marry hover:text-black",
    fuck: "text-fuck border-fuck hover:bg-fuck hover:text-black",
    avoid: "text-avoid border-avoid hover:bg-avoid hover:text-black"
  };
  
  const activeColors = {
    marry: "bg-marry text-black comic-shadow border-black",
    fuck: "bg-fuck text-black comic-shadow border-black",
    avoid: "bg-avoid text-black comic-shadow border-black"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center py-3 rounded-xl border-4 font-heading uppercase tracking-widest text-sm sm:text-base font-bold transition-all duration-200 transform",
        active ? activeColors[type] : baseColors[type],
        !active && !disabled && "hover:-translate-y-1 hover:comic-shadow-sm",
        disabled && !active && "opacity-30 cursor-not-allowed border-zinc-700 text-zinc-600 hover:bg-transparent hover:text-zinc-600 hover:translate-y-0"
      )}
    >
      <div className="mb-1">{icon}</div>
      {type === 'fuck' ? 'F***' : type}
    </button>
  );
}
