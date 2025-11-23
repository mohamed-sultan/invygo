// Export light colors as default for backward compatibility
import { lightColors, darkColors } from './colors';
export { lightColors, darkColors } from './colors';
export { ThemeProvider, useTheme } from './ThemeContext';
export { spacing } from './spacing';
export { fontWeight, fontSize, lineHeight } from './typography';
export { wp, hp } from './dimensions';

export const Colors = lightColors;
export default Colors;
