interface RankingPlayer {
  name: string;
  points: number;
  position: number;
}

interface RankingViewModel {
  ranking: RankingPlayer[];
  navigateToLineup: () => void;
}
