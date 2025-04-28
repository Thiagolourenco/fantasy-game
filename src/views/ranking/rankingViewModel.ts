import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PrivateStackParamList } from "../../navigation/private";
import { useLineupStore } from "../../store/lineup.store";

interface RankingPlayer {
  name: string;
  points: number;
  position: number;
}

interface RankingViewModel {
  ranking: RankingPlayer[];
  navigateToLineup: () => void;
}

export const useRankingViewModel = (): RankingViewModel => {
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const { setPlayer } = useLineupStore();
  const [ranking] = useState<RankingPlayer[]>([
    {
      name: 'Jose Perez',
      points: 120,
      position: 1,
    },
    {
      name: 'Juan Perez',
      points: 100,
      position: 2,
    },
    {
      name: 'Pedro Perez',
      points: 80,
      position: 3,
    },
  ]);

  const navigateToLineup = () => {
    // Pre-fill the lineup with some players
    setPlayer('GOL_3_2', 'Weverton');
    setPlayer('ZAG_2_2', 'Carlos Souza');
    setPlayer('ZAG_2_3', 'Pedro Santos');
    setPlayer('LAT_2_0', 'Lucas Lima');
    setPlayer('LAT_2_5', 'Rafael Costa');
    setPlayer('MEI_1_0', 'Bruno Alves');
    setPlayer('MEI_1_1', 'Felipe Melo');
    setPlayer('MEI_1_3', 'Ricardo Goulart');
    setPlayer('MEI_1_4', 'Thiago Neves');
    setPlayer('ATA_0_1', 'Gabriel Barbosa');
    setPlayer('ATA_0_3', 'Dudu Oliveira');
    setPlayer('TEC_3_4', 'Técnico Abel Ferreira');

    navigation.navigate('Lineup');
  };

  return {
    ranking,
    navigateToLineup
  };
};