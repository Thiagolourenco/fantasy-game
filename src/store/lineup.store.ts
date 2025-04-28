import { create } from 'zustand';
import { MOCK_PLAYERS } from '../constants/lineup.constants';

interface Player {
  id: number;
  name: string;
  position: string;
  score: number;
}

interface LineupState {
  selectedPlayers: { [key: string]: string };
  totalScore: number;
  setPlayer: (position: string, playerName: string) => void;
  removePlayer: (position: string) => void;
  calculateTotalScore: () => void;
  getPlayerByPosition: (position: string) => Player | undefined;
}

export const useLineupStore = create<LineupState>((set, get) => ({
  selectedPlayers: {},
  totalScore: 0,
  
  setPlayer: (position: string, playerName: string) => {
    set((state) => ({
      selectedPlayers: {
        ...state.selectedPlayers,
        [position]: playerName,
      },
    }));
    get().calculateTotalScore();
  },

  removePlayer: (position: string) => {
    set((state) => {
      const newSelectedPlayers = { ...state.selectedPlayers };
      delete newSelectedPlayers[position];
      return { selectedPlayers: newSelectedPlayers };
    });
    get().calculateTotalScore();
  },

  calculateTotalScore: () => {
    const state = get();
    let total = 0;
    Object.values(state.selectedPlayers).forEach(playerName => {
      const player = MOCK_PLAYERS.find(p => p.name === playerName);
      if (player) {
        total += player.score;
      }
    });
    set({ totalScore: total });
  },

  getPlayerByPosition: (position: string) => {
    const state = get();
    const playerName = state.selectedPlayers[position];
    if (!playerName) return undefined;
    return MOCK_PLAYERS.find(p => p.name === playerName);
  },
}));
