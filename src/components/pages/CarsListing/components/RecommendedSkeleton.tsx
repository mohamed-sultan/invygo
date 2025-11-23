import React from "react"
import { View, StyleSheet } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { useTheme, spacing, wp, hp } from "@theme"

export const RecommendedSkeleton = React.memo(() => {
    const { colors } = useTheme()

    return (
        <View style={styles.recommendedCard}>
            <SkeletonPlaceholder
                backgroundColor={colors.skeletonBase}
                highlightColor={colors.skeletonHighlight}
            >
                <SkeletonPlaceholder.Item width="100%" height={hp(17.5)} borderRadius={spacing.md} />
                <SkeletonPlaceholder.Item marginTop={spacing.md} marginLeft={spacing.md} width="80%" height={16} borderRadius={spacing.xs} />
                <SkeletonPlaceholder.Item marginTop={spacing.sm} marginLeft={spacing.md} width="60%" height={14} borderRadius={spacing.xs} />
                <SkeletonPlaceholder.Item marginTop={spacing.sm} marginLeft={spacing.md} width="70%" height={16} borderRadius={spacing.xs} />
            </SkeletonPlaceholder>
        </View>
    )
})

const styles = StyleSheet.create({
    recommendedCard: {
        width: '100%',
        borderRadius: spacing.md,
        overflow: 'hidden',
    },
})

