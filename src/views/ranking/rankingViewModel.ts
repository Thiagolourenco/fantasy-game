import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const useRankingViewModel = () => {
  const { navigate } = useNavigation();
  const [ranking, setRanking] = useState<any[]>([]);

  const navigateToLineup = () => {
    navigate('Lineup');
  };

  return {
    ranking,
    navigateToLineup
  };
};