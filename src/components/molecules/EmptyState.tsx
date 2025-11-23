import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { Title } from '@atoms/Title';

interface EmptyStateProps {
  text: string;
}

export const EmptyState = React.memo(({ text }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title color={colors.textPrimary}>{text}</Title>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

