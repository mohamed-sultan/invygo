import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme';

export const LoadingWrapper = React.memo(() => {
  const { colors } = useTheme();

  return (
    <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
    </View>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

