import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Canvas, RoundedRect, Circle, Line, Path, Group } from '@shopify/react-native-skia';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateStackParamList } from '../../navigation/private';

import { Header, BottomSheet } from '../../components';
import { useLineUpViewModel } from './lineUpViewModel';
import {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_RADIUS,
  POSITIONS,
} from '../../constants/lineup.constants';
import { Colors } from '../../constants/Colors';

import useStyles from './lineUpViewStyle';

function hexPath(x: number, y: number, size: number) {
  const angle = Math.PI / 3;
  let d = '';
  for (let i = 0; i < 6; i++) {
    const px = x + size * Math.cos(angle * i - Math.PI / 2);
    const py = y + size * Math.sin(angle * i - Math.PI / 2);
    d += i === 0 ? `M${px},${py}` : `L${px},${py}`;
  }
  d += 'Z';
  return d;
}

const SkiaField = () => (
  <Canvas style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT, alignSelf: 'center' }}>
    <RoundedRect x={0} y={0} width={FIELD_WIDTH} height={FIELD_HEIGHT} r={FIELD_RADIUS} color={Colors.palette.purple} />
    <Group color={Colors.palette.white}>
      <Line p1={{ x: 0, y: FIELD_HEIGHT / 2 }} p2={{ x: FIELD_WIDTH, y: FIELD_HEIGHT / 2 }} strokeWidth={2} />
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r={36} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={0} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={FIELD_HEIGHT - 36} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={0} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={FIELD_HEIGHT - 70} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      <Circle cx={FIELD_WIDTH / 2} cy={60} r={4} color={Colors.palette.white} />
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT - 60} r={4} color={Colors.palette.white} />
    </Group>
  </Canvas>
);

const getLineStyle = (idx: number) => {
  if (idx === 2) {
    return { position: 'absolute' as const, top: 210, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
  }
  if (idx === 3) {
    return { position: 'absolute' as const, top: 295, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
  }
  return { position: 'absolute' as const, top: 38 + idx * 85, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
};

function getAbbreviatedName(name: string) {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0];
  return `${parts[0]} .${parts[1][0]}`;
}

const LineUpView = () => {
  const styles = useStyles();
  const navigation = useNavigation<NativeStackNavigationProp<PrivateStackParamList>>();
  const {
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
  } = useLineUpViewModel();

  const Card = ({ type, idx, jdx }: { type: string, idx: number, jdx: number }) => {
    const player = getPlayerByPosition(type, idx, jdx);
    const playerName = player?.name;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleCardPress(type, idx, jdx)} style={styles.cardButton}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons name={playerName ? "account" : "plus"} size={22} color={Colors.palette.white} />
        </View>
        <View style={styles.cardHex}>
          <Canvas style={{ width: 64, height: 74 }}>
            <Path path={hexPath(32, 37, 32)} color={Colors.palette.purple} style="fill" />
            <Path path={hexPath(32, 37, 32)} color={Colors.palette.white} style="stroke" strokeWidth={2} />
          </Canvas>
          <Text style={styles.cardText}>
            {playerName ? getAbbreviatedName(playerName) : type}
          </Text>
          {player && (
            <Text style={styles.cardScore}>
              {player.score.toFixed(1)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Escalação" canGoBack={handleGoBack} />
      <View style={styles.scoreBar}>
        <View style={styles.scoreBarContent}>
          <Text style={styles.scoreLabel}>Pontuação Total:</Text>
          <Text style={styles.scoreValue}>{totalScore.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.fieldWrapper}>
        <View style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT }}>
          <SkiaField />
          {POSITIONS.map((line, idx) => (
            <View key={idx} style={getLineStyle(idx)}>
              {line.map((pos, j) =>
                pos ? <Card key={j} type={pos.type} idx={idx} jdx={j} /> : <View key={j} style={styles.cardHex} />
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.mainButton} onPress={handleSaveLineup}>
          <Text style={styles.mainButtonText}>ESCALE SEU TIME</Text>
        </TouchableOpacity>
      </View>
      {sheetVisible && (
        <BottomSheet visible={sheetVisible} onClose={handleCloseSheet}>
          <Text style={styles.sheetTitle}>
            Escolha o jogador para: {selectedPosition && selectedPosition.split('_')[0]}
          </Text>
          {getCurrentPlayer() && (
            <View style={styles.currentPlayer}>
              <Text style={styles.currentPlayerText}>Jogador atual: {getCurrentPlayer()?.name}</Text>
              <TouchableOpacity
                onPress={handleRemovePlayer}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={getFilteredPlayers()}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.playerOption,
                  isPlayerSelected(item.name) && styles.playerOptionSelected,
                ]}
                onPress={() => handleSelectPlayer(item.name)}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.playerOptionText}>{item.name}</Text>
                  <Text style={styles.playerOptionScore}>{item.score.toFixed(1)}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum jogador disponível para esta posição.</Text>}
            style={{ maxHeight: 220, marginBottom: 16 }}
          />
          <TouchableOpacity onPress={handleCloseSheet} style={styles.closeSheetButton}>
            <Text style={styles.closeSheetButtonText}>Fechar</Text>
          </TouchableOpacity>
        </BottomSheet>
      )}
    </View>
  );
};

export default LineUpView;
