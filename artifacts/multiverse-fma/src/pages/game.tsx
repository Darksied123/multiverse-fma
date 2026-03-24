import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { CharacterCard } from "@/components/character-card";
import { useGameStore } from "@/store/game-store";
import { useGetCharacters, useSubmitRound, RoundChoiceChoice } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Game() {
  const [, setLocation] = useLocation();
  const { genderFilter, setLastRoundData } = useGameStore();
  const { toast } = useToast();
  
  // Local state for choices
  const [choices, setChoices] = useState<Record<number, RoundChoiceChoice>>({});

  // Fetch 3 random characters based on filter
  const { 
    data: characters, 
    isLoading, 
    isError, 
    refetch,
    isFetching
  } = useGetCharacters({ gender: genderFilter }, {
    query: {
      refetchOnWindowFocus: false,
      staleTime: 0, // Always fetch fresh characters on mount
    }
  });

  const submitMutation = useSubmitRound();

  // Reset choices when new characters load
  useEffect(() => {
    setChoices({});
  }, [characters]);

  const handleChoice = (charId: number, choice: RoundChoiceChoice) => {
    setChoices(prev => {
      const next = { ...prev };
      // Remove this choice from any other character that might have it
      const existingKey = Object.keys(next).find(k => next[Number(k)] === choice);
      if (existingKey && Number(existingKey) !== charId) {
        delete next[Number(existingKey)];
      }
      next[charId] = choice;
      return next;
    });
  };

  const usedChoices = Object.values(choices);
  const isComplete = characters && Object.keys(choices).length === characters.length && characters.length === 3;

  const handleSubmit = () => {
    if (!isComplete || !characters) return;

    const payload = {
      choices: Object.entries(choices).map(([id, choice]) => ({
        characterId: Number(id),
        choice
      }))
    };

    submitMutation.mutate({ data: payload }, {
      onSuccess: (result) => {
        // Attach the choices to the character objects for the results page
        const charactersWithChoices = characters.map(c => ({
          ...c,
          choiceAssigned: choices[c.id]
        }));
        
        setLastRoundData(result, charactersWithChoices);
        setLocation("/results");
      },
      onError: (err) => {
        console.error("Failed to submit round", err);
        toast({
          title: "Submission Failed",
          description: "The multiverse rejected your choices. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (isLoading || isFetching) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
          <h2 className="font-display text-3xl tracking-widest uppercase text-white animate-pulse">
            Summoning Candidates...
          </h2>
        </div>
      </Layout>
    );
  }

  if (isError || !characters || characters.length < 3) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h2 className="font-display text-4xl text-white">Multiverse Error</h2>
          <p className="font-heading text-muted-foreground text-xl">Failed to retrieve characters. The portals are unstable.</p>
          <button 
            onClick={() => refetch()}
            className="mt-6 px-8 py-3 bg-primary text-white font-heading font-bold uppercase tracking-widest border-4 border-black comic-shadow-sm hover:-translate-y-1 transition-transform"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-white tracking-wide text-glow">
            Make Your Choices
          </h2>
          <p className="font-heading text-xl text-primary uppercase tracking-widest mt-2">
            One unique fate per character
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {characters.map((char, i) => (
            <CharacterCard
              key={char.id}
              character={char}
              index={i}
              choice={choices[char.id]}
              disabledChoices={usedChoices}
              onChoice={(c) => handleChoice(char.id, c as RoundChoiceChoice)}
            />
          ))}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16 flex justify-center pb-12"
            >
              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="group relative px-16 py-6 bg-white text-black font-display text-4xl uppercase tracking-widest border-4 border-black comic-shadow-sm hover:-translate-y-2 hover:comic-shadow transition-all duration-300 disabled:opacity-50"
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin" /> Sealing Fates...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Confirm Fates</span>
                    <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300 delay-100">
                      Confirm Fates
                    </span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
}
