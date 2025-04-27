import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Canvas, RoundedRect, Circle, Line, Path, Group } from '@shopify/react-native-skia';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Header, BottomSheet } from '../../components';

import useStyles from './lineUpViewStyle';

const FIELD_WIDTH = 360;
const FIELD_HEIGHT = 420;
const FIELD_RADIUS = 36;

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
    {/* Campo principal */}
    <RoundedRect x={0} y={0} width={FIELD_WIDTH} height={FIELD_HEIGHT} r={FIELD_RADIUS} color="#1a3d1a" />
    {/* Linhas do campo */}
    <Group color="#fff">
      {/* Linha central */}
      <Line p1={{ x: 0, y: FIELD_HEIGHT / 2 }} p2={{ x: FIELD_WIDTH, y: FIELD_HEIGHT / 2 }} strokeWidth={2} />
      {/* Círculo central */}
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r={36} color="transparent" style="stroke" strokeWidth={2} />
      {/* Pequenas áreas */}
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={0} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 60} y={FIELD_HEIGHT - 36} width={120} height={36} r={12} color="transparent" style="stroke" strokeWidth={2} />
      {/* Grandes áreas */}
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={0} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      <RoundedRect x={FIELD_WIDTH / 2 - 110} y={FIELD_HEIGHT - 70} width={220} height={70} r={18} color="transparent" style="stroke" strokeWidth={2} />
      {/* Marca do pênalti */}
      <Circle cx={FIELD_WIDTH / 2} cy={60} r={4} color="#fff" />
      <Circle cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT - 60} r={4} color="#fff" />
    </Group>
  </Canvas>
);

const positions = [
  // Atacantes
  [null, { type: 'ATA' }, null, { type: 'ATA' }, null],
  // Meias
  [{ type: 'MEI' }, { type: 'MEI' }, null, { type: 'MEI' }, { type: 'MEI' }],
  // Laterais e zagueiros (zagueiros centralizados)
  [{ type: 'LAT' }, null, { type: 'ZAG' }, { type: 'ZAG' }, null, { type: 'LAT' }],
  // Goleiro e técnico (goleiro central, técnico na ponta)
  [null, null, { type: 'GOL' }, null, { type: 'TEC' }],
];

const getLineStyle = (idx: number) => {
  // Ajuste de espaçamento para a linha dos zagueiros (linha 2)
  if (idx === 2) {
    return { position: 'absolute' as const, top: 210, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
  }
  // Ajuste para a linha do goleiro/técnico (linha 3)
  if (idx === 3) {
    return { position: 'absolute' as const, top: 295, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
  }
  return { position: 'absolute' as const, top: 38 + idx * 85, left: 0, right: 0, flexDirection: 'row' as const, justifyContent: 'space-evenly' as const, width: FIELD_WIDTH };
};

// Mock de jogadores disponíveis
export const MOCK_PLAYERS = [
  { id: 1, name: 'João Silva', position: 'GOL' },
  { id: 2, name: 'Carlos Souza', position: 'ZAG' },
  { id: 3, name: 'Pedro Santos', position: 'ZAG' },
  { id: 4, name: 'Lucas Lima', position: 'LAT' },
  { id: 5, name: 'Rafael Costa', position: 'LAT' },
  { id: 6, name: 'Bruno Alves', position: 'MEI' },
  { id: 7, name: 'Felipe Melo', position: 'MEI' },
  { id: 8, name: 'André Gomes', position: 'MEI' },
  { id: 9, name: 'Ricardo Goulart', position: 'MEI' },
  { id: 10, name: 'Thiago Neves', position: 'MEI' },
  { id: 11, name: 'Gabriel Barbosa', position: 'ATA' },
  { id: 12, name: 'Dudu Oliveira', position: 'ATA' },
  { id: 13, name: 'Everton Cebolinha', position: 'ATA' },
  { id: 14, name: 'Willian José', position: 'ATA' },
  { id: 15, name: 'Diego Souza', position: 'ATA' },
  { id: 16, name: 'Gustavo Scarpa', position: 'MEI' },
  { id: 17, name: 'Danilo Pereira', position: 'LAT' },
  { id: 18, name: 'Léo Ortiz', position: 'ZAG' },
  { id: 19, name: 'Weverton', position: 'GOL' },
  { id: 20, name: 'Técnico Abel Ferreira', position: 'TEC' },
];

function getAbbreviatedName(name: string) {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0];
  return `${parts[0]} .${parts[1][0]}`;
}

const LineUpView = () => {
  const styles = useStyles();
  const [sheetVisible, setSheetVisible] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState<string | null>(null);
  const [selectedPlayers, setSelectedPlayers] = React.useState<{ [key: string]: string }>({});

  const handleCardPress = (type: string, idx: number, jdx: number) => {
    setSelectedPosition(`${type}_${idx}_${jdx}`);
    setSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
    setSelectedPosition(null);
  };

  const handleSelectPlayer = (playerName: string) => {
    if (selectedPosition) {
      setSelectedPlayers(prev => ({ ...prev, [selectedPosition]: playerName }));
    }
    setSheetVisible(false);
    setSelectedPosition(null);
  };

  const Card = ({ type, idx, jdx }: { type: string, idx: number, jdx: number }) => {
    const key = `${type}_${idx}_${jdx}`;
    const playerName = selectedPlayers[key];
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleCardPress(type, idx, jdx)} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', zIndex: 1, top: 18 }}>
          <MaterialCommunityIcons name="plus" size={22} color="#fff" />
        </View>
        <View style={{ width: 64, height: 74, alignItems: 'center', justifyContent: 'center' }}>
          <Canvas style={{ width: 64, height: 74 }}>
            <Path path={hexPath(32, 37, 32)} color="#10132a" style="fill" />
            <Path path={hexPath(32, 37, 32)} color="#fff" style="stroke" strokeWidth={2} />
          </Canvas>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, position: 'absolute', top: 36, alignSelf: 'center', width: '100%', textAlign: 'center' }}>
            {playerName ? getAbbreviatedName(playerName) : type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header customizado e saldo */}
      <View style={{ height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818', marginBottom: 0, width: '100%' }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 1 }}>ESCALAÇÃO</Text>
      </View>
      {/* Campo de futebol com Skia */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        <View style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT }}>
          <SkiaField />
          {/* Cards de posição sobrepocolostos ao campo */}
          {positions.map((line, idx) => (
            <View key={idx} style={getLineStyle(idx)}>
              {line.map((pos, j) =>
                pos ? <Card key={j} type={pos.type} idx={idx} jdx={j} /> : <View key={j} style={{ width: 64, height: 74 }} />
              )}
            </View>
          ))}
        </View>
      </View>
      {/* Botão escalar time */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity style={{ backgroundColor: '#181818', borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>ESCALE SEU TIME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#444', borderRadius: 12, padding: 16, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>AUTOESCALAR</Text>
        </TouchableOpacity>
      </View>
      {/* BottomSheet para seleção de jogador */}
      <BottomSheet visible={sheetVisible} onClose={handleCloseSheet}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Escolha o jogador para: {selectedPosition && selectedPosition.split('_')[0]}</Text>
        <FlatList
          data={MOCK_PLAYERS.filter(j => selectedPosition && j.position === selectedPosition.split('_')[0])}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#333' }} onPress={() => handleSelectPlayer(item.name)}>
              <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
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
