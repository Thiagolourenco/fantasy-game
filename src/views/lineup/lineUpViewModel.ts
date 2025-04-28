import { useState } from 'react';
import { MOCK_PLAYERS } from '../../constants/lineup.constants';
import { useLineupStore } from '../../store/lineup.store';

interface Player {
  id: number;
  name: string;
  position: string;
  score: number;
}

interface Position {
  type: string;
}

interface LineUpViewModel {
  sheetVisible: boolean;
  selectedPosition: string | null;
  selectedPlayers: Record<string, string>;
  totalScore: number;
  handleCardPress: (type: string, idx: number, jdx: number) => void;
  handleCloseSheet: () => void;
  handleSelectPlayer: (playerName: string) => void;
  handleRemovePlayer: () => void;
  getCurrentPlayer: () => Player | undefined;
  getPlayerByPosition: (type: string, idx: number, jdx: number) => Player | undefined;
  getFilteredPlayers: () => Player[];
  isPlayerSelected: (playerName: string) => boolean;
}

export const useLineUpViewModel = (): LineUpViewModel => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const { selectedPlayers, totalScore, setPlayer, removePlayer } = useLineupStore();

  const handleCardPress = (type: string, idx: number, jdx: number) => {
    const positionKey = `${type}_${idx}_${jdx}`;
    setSelectedPosition(positionKey);
    setSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
    setSelectedPosition(null);
  };

  const handleSelectPlayer = (playerName: string) => {
    if (selectedPosition) {
      setPlayer(selectedPosition, playerName);
      handleCloseSheet();
    }
  };

  const handleRemovePlayer = () => {
    if (selectedPosition) {
      removePlayer(selectedPosition);
      handleCloseSheet();
    }
  };

  const getCurrentPlayer = () => {
    if (!selectedPosition) return undefined;
    const playerName = selectedPlayers[selectedPosition];
    return MOCK_PLAYERS.find(player => player.name === playerName);
  };

  const getPlayerByPosition = (type: string, idx: number, jdx: number) => {
    const positionKey = `${type}_${idx}_${jdx}`;
    const playerName = selectedPlayers[positionKey];
    return MOCK_PLAYERS.find(player => player.name === playerName);
  };

  const getFilteredPlayers = () => {
    if (!selectedPosition) return [];
    const positionType = selectedPosition.split('_')[0];
    return MOCK_PLAYERS.filter(player => player.position === positionType);
  };

  const isPlayerSelected = (playerName: string) => {
    return Object.values(selectedPlayers).includes(playerName);
  };

  return {
    sheetVisible,
    selectedPosition,
    selectedPlayers,
    totalScore,
    handleCardPress,
    handleCloseSheet,
    handleSelectPlayer,
    handleRemovePlayer,
    getCurrentPlayer,
    getPlayerByPosition,
    getFilteredPlayers,
    isPlayerSelected,
  };
};
