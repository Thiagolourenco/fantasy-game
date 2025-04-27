import React from 'react';
import { View, Text, FlatList } from 'react-native';

import useStyles from './rankingViewStyle';
import { Header } from '../../components';
import { useRankingViewModel } from './rankingViewModel';
const MOCK = [
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
];

const RankingView = () => {
  const styles = useStyles();
  const { ranking, navigateToLineup } = useRankingViewModel();
  return (
    <View style={styles.container}>
      <Header onPress={navigateToLineup} title="Ranking" />
      <View style={styles.content}>
        <FlatList
          data={MOCK}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
     
    </View>
  );
};

export default RankingView;