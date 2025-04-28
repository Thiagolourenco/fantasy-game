export const FIELD_WIDTH = 360;
export const FIELD_HEIGHT = 420;
export const FIELD_RADIUS = 36;

export const MOCK_PLAYERS = [
  { id: 1, name: 'João Silva', position: 'GOL', score: 8.5 },
  { id: 2, name: 'Carlos Souza', position: 'ZAG', score: 7.2 },
  { id: 3, name: 'Pedro Santos', position: 'ZAG', score: 6.8 },
  { id: 4, name: 'Lucas Lima', position: 'LAT', score: 7.5 },
  { id: 5, name: 'Rafael Costa', position: 'LAT', score: 6.9 },
  { id: 6, name: 'Bruno Alves', position: 'MEI', score: 8.1 },
  { id: 7, name: 'Felipe Melo', position: 'MEI', score: 7.8 },
  { id: 8, name: 'André Gomes', position: 'MEI', score: 7.4 },
  { id: 9, name: 'Ricardo Goulart', position: 'MEI', score: 8.2 },
  { id: 10, name: 'Thiago Neves', position: 'MEI', score: 7.6 },
  { id: 11, name: 'Gabriel Barbosa', position: 'ATA', score: 8.7 },
  { id: 12, name: 'Dudu Oliveira', position: 'ATA', score: 8.3 },
  { id: 13, name: 'Everton Cebolinha', position: 'ATA', score: 7.9 },
  { id: 14, name: 'Willian José', position: 'ATA', score: 7.7 },
  { id: 15, name: 'Diego Souza', position: 'ATA', score: 8.0 },
  { id: 16, name: 'Gustavo Scarpa', position: 'MEI', score: 7.3 },
  { id: 17, name: 'Danilo Pereira', position: 'LAT', score: 6.7 },
  { id: 18, name: 'Léo Ortiz', position: 'ZAG', score: 7.1 },
  { id: 19, name: 'Weverton', position: 'GOL', score: 8.4 },
  { id: 20, name: 'Técnico Abel Ferreira', position: 'TEC', score: 8.8 },
];

export const POSITIONS = [
  // Atacantes
  [null, { type: 'ATA' }, null, { type: 'ATA' }, null],
  // Meias
  [{ type: 'MEI' }, { type: 'MEI' }, null, { type: 'MEI' }, { type: 'MEI' }],
  // Laterais e zagueiros (zagueiros centralizados)
  [{ type: 'LAT' }, null, { type: 'ZAG' }, { type: 'ZAG' }, null, { type: 'LAT' }],
  // Goleiro e técnico (goleiro central, técnico na ponta)
  [null, null, { type: 'GOL' }, null, { type: 'TEC' }],
]; 