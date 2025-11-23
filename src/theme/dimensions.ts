import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export const wp = (pct: number): number => {
  return (SCREEN_WIDTH * pct) / 100;
};


export const hp = (pct: number): number => {
  return (SCREEN_HEIGHT * pct) / 100;
};

