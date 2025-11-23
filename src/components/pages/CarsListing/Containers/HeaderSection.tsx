import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, spacing, fontWeight, fontSize } from '@theme';

interface HeaderSectionProps {
  scrollY: Animated.Value;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ scrollY }) => {
  const { t } = useTranslation();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [headerVisible, setHeaderVisible] = useState(true);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      setHeaderVisible(value <= 50);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: headerOpacity,
          height: headerHeight,
          transform: [{ translateY: headerTranslateY }],
        },
      ]}
      pointerEvents={headerVisible ? 'auto' : 'none'}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {t('carsListing.title')}
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Text style={[styles.themeIcon, { color: colors.textPrimary }]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeToggle: {
    padding: spacing.sm,
  },
  themeIcon: {
    fontSize: fontSize.md,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    flex: 1,
  },
});

