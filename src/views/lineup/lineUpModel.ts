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
  handleSaveLineup: () => void;
  handleGoBack: () => void;
}