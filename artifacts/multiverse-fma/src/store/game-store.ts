import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetCharactersGender, SubmitResult, Character } from '@workspace/api-client-react';

interface RoundCharacter extends Character {
  choiceAssigned?: 'marry' | 'fuck' | 'avoid';
}

interface GameState {
  genderFilter: GetCharactersGender;
  setGenderFilter: (filter: GetCharactersGender) => void;
  
  lastRoundResult: SubmitResult | null;
  lastRoundCharacters: RoundCharacter[];
  setLastRoundData: (result: SubmitResult, characters: RoundCharacter[]) => void;
  clearLastRoundData: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      genderFilter: 'mixed',
      setGenderFilter: (filter) => set({ genderFilter: filter }),
      
      lastRoundResult: null,
      lastRoundCharacters: [],
      setLastRoundData: (result, characters) => set({ lastRoundResult: result, lastRoundCharacters: characters }),
      clearLastRoundData: () => set({ lastRoundResult: null, lastRoundCharacters: [] }),
    }),
    {
      name: 'mfa-game-storage',
      partialize: (state) => ({ genderFilter: state.genderFilter }), // Only persist the filter
    }
  )
);
