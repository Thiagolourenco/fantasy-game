import { useState } from 'react';
import { MOCK_PLAYERS } from '../../constants/lineup.constants';
import { useLineupStore } from '../../store/lineup.store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../navigation/private';

export const useLineUpViewModel = (): LineUpViewModel => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const { selectedPlayers, totalScore, setPlayer, removePlayer } = useLineupStore();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();

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

  const handleSaveLineup = () => {
    navigation.navigate('Ranking');
  };

  const handleGoBack = () => {
    navigation.goBack();
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
    handleSaveLineup,
    handleGoBack,
  };
};
