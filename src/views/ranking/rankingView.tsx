import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import useStyles from './rankingViewStyle';
import { Colors } from '../../constants/Colors';
import { useRankingViewModel } from './rankingViewModel';

const RankingView = () => {
  const styles = useStyles();
  const { ranking, navigateToLineup } = useRankingViewModel();

  const renderRankingItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.card}>
      <Text style={styles.rank}>{index + 1}</Text>
      <View style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RANKING</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={ranking}
          renderItem={renderRankingItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity 
        style={styles.lineupButton} 
        onPress={navigateToLineup}
      >
        <Text style={styles.lineupButtonText}>ver escalação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RankingView;