import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import useStyles from './rankingViewStyle';
import { Header } from '../../components';
import { useRankingViewModel } from './rankingViewModel';

const RankingView = () => {
  const styles = useStyles();
  const { ranking, navigateToLineup } = useRankingViewModel();

  return (
    <View style={styles.container}>
      <Header title="Ranking" />
      <View style={styles.content}>
        <FlatList
          data={ranking}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.rank}>#{item.position}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.points}>{item.points} pts</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity 
        style={styles.lineupButton} 
        onPress={navigateToLineup}
      >
        <Text style={styles.lineupButtonText}>Ver Escalação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RankingView;