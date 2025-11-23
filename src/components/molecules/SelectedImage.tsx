import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from '@atoms/Image';
import { useTheme, spacing, wp, hp } from '@theme';

interface SelectedImageProps {
  imageUrl: string;
  isSelected: boolean;
  onPress: () => void;
}

export const SelectedImage = React.memo(({ imageUrl, isSelected, onPress }: SelectedImageProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.thumbnail,
        isSelected && [styles.thumbnailSelected, { borderColor: colors.accentOrange }],
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.thumbnailImage} resizeMode="cover" />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  thumbnail: {
    width: wp(20),
    height: hp(7.5),
    borderRadius: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailSelected: {
    // borderColor set dynamically
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});

