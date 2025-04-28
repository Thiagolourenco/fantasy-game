/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const palette = {
  white: '#FFFFFF',
  green: '#74E857',
  grayLight: '#D9D9D9',
  grayLighter: '#FAFAFA',
  purpleDark: '#503280',
  purple: '#794CF3',
  purpleLight: '#8776AE',
};

export const Colors = {
  palette,
  background: palette.white,
  primary: palette.purple,
  secondary: palette.green,
  text: palette.purpleDark,
  textLight: palette.white,
  card: palette.grayLight,
  border: palette.grayLighter,
  highlight: palette.green,
  // You can add more semantic colors as needed
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
