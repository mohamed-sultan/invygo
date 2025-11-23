import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createMMKV } from 'react-native-mmkv';
import { lightColors, darkColors } from './colors';

const storage =  createMMKV();

const THEME_STORAGE_KEY = 'theme_mode';
const DEFAULT_THEME = 'light';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDarkMode: boolean;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = storage.getString(THEME_STORAGE_KEY);
    return savedTheme === 'dark';
  });

  const colors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    storage.set(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
  };

  const setTheme = (mode: ThemeMode) => {
    setIsDarkMode(mode === 'dark');
    storage.set(THEME_STORAGE_KEY, mode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

