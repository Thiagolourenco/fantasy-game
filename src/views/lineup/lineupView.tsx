import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Canvas, RoundedRect, Circle, Line, Path, Group } from '@shopify/react-native-skia';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Header, BottomSheet } from '../../components';
import { useLineUpViewModel } from './lineUpViewModel';
import { 
  FIELD_WIDTH, 
  FIELD_HEIGHT, 
  FIELD_RADIUS, 
  POSITIONS,
  MOCK_PLAYERS
} from '../../constants/lineup.constants';

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
    <RoundedRect x={0} y={0} width={FIELD_WIDTH} height={FIELD_HEIGHT} r={FIELD_RADIUS} color="#1a3d1a" />
    <Group color="#fff">
      <Line p1={{ x: 0, y: FIELD_HEIGHT / 2 }} p2={{ x: FIELD_WIDTH, y: FIELD_HEIGHT / 2 }} strokeWidth={2} />
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r={36} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={0} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={FIELD_HEIGHT - 36} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={0} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={FIELD_HEIGHT - 70} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      <Circle cx={FIELD_WIDTH / 2} cy={60} r={4} color="#fff" />
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT - 60} r={4} color="#fff" />
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
  } = useLineUpViewModel();

  const Card = ({ type, idx, jdx }: { type: string, idx: number, jdx: number }) => {
    const player = getPlayerByPosition(type, idx, jdx);
    const playerName = player?.name;
    
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleCardPress(type, idx, jdx)} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', zIndex: 1, top: 18 }}>
          <MaterialCommunityIcons name={playerName ? "account" : "plus"} size={22} color="#fff" />
        </View>
        <View style={{ width: 64, height: 74, alignItems: 'center', justifyContent: 'center' }}>
          <Canvas style={{ width: 64, height: 74 }}>
            <Path path={hexPath(32, 37, 32)} color="#10132a" style="fill" />
            <Path path={hexPath(32, 37, 32)} color="#fff" style="stroke" strokeWidth={2} />
          </Canvas>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, position: 'absolute', top: 36, alignSelf: 'center', width: '100%', textAlign: 'center' }}>
            {playerName ? getAbbreviatedName(playerName) : type}
          </Text>
          {player && (
            <Text style={{ color: '#4CAF50', fontSize: 10, position: 'absolute', bottom: 8, alignSelf: 'center' }}>
              {player.score.toFixed(1)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="ESCALAÇÃO" canGoBack={() => {}} />
      <View style={{ height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818', marginBottom: 0, width: '100%' }}>
        <View style={{ position: 'absolute', right: 16, flexDirection: 'row', alignItems: 'center', top: 32 }}>
          <Text style={{ color: '#fff', fontSize: 16, marginRight: 8 }}>Pontuação Total:</Text>
          <Text style={{ color: '#4CAF50', fontSize: 18, fontWeight: 'bold' }}>{totalScore.toFixed(1)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        <View style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT }}>
          <SkiaField />
          {POSITIONS.map((line, idx) => (
            <View key={idx} style={getLineStyle(idx)}>
              {line.map((pos, j) =>
                pos ? <Card key={j} type={pos.type} idx={idx} jdx={j} /> : <View key={j} style={{ width: 64, height: 74 }} />
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={{ padding: 16 }}>
        <TouchableOpacity style={{ backgroundColor: '#181818', borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>ESCALE SEU TIME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#444', borderRadius: 12, padding: 16, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>AUTOESCALAR</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet visible={sheetVisible} onClose={handleCloseSheet}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          Escolha o jogador para: {selectedPosition && selectedPosition.split('_')[0]}
        </Text>
        {getCurrentPlayer() && (
          <View style={{ 
            backgroundColor: '#333', 
            padding: 12, 
            borderRadius: 8, 
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Jogador atual: {getCurrentPlayer()?.name}</Text>
            <TouchableOpacity 
              onPress={handleRemovePlayer}
              style={{ 
                backgroundColor: '#ff4444', 
                padding: 8, 
                borderRadius: 6 
              }}
            >
              <Text style={{ color: '#fff' }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={getFilteredPlayers()}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ 
                padding: 14, 
                borderBottomWidth: 1, 
                borderBottomColor: '#333',
                backgroundColor: isPlayerSelected(item.name) ? '#2a2a2a' : 'transparent'
              }} 
              onPress={() => handleSelectPlayer(item.name)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold' }}>{item.score.toFixed(1)}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ color: '#aaa', textAlign: 'center', marginTop: 24 }}>Nenhum jogador disponível para esta posição.</Text>}
          style={{ maxHeight: 220, marginBottom: 16 }}
        />
        <TouchableOpacity onPress={handleCloseSheet} style={{ marginTop: 8, alignSelf: 'center', backgroundColor: '#333', borderRadius: 8, padding: 12 }}>
          <Text style={{ color: '#fff' }}>Fechar</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default LineUpView;
