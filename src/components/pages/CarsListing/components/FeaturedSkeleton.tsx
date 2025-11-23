import React from "react"
import { View, StyleSheet } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { useTheme, spacing, wp, hp } from "@theme"

export const FeaturedSkeleton = React.memo(() => {
    const { colors } = useTheme()

    return (
        <View style={styles.featuredCard}>
            <SkeletonPlaceholder
                backgroundColor={colors.skeletonBase}
                highlightColor={colors.skeletonHighlight}
            >
                <SkeletonPlaceholder.Item width={wp(85)} height={hp(25)} borderRadius={spacing.md} />
                <SkeletonPlaceholder.Item marginTop={spacing.md} marginLeft={spacing.md} width={200} height={20} borderRadius={spacing.xs} />
                <SkeletonPlaceholder.Item marginTop={spacing.sm} marginLeft={spacing.md} width={150} height={16} borderRadius={spacing.xs} />
            </SkeletonPlaceholder>
        </View>
    )
})

const styles = StyleSheet.create({
    featuredCard: {
        width: wp(85),
        borderRadius: spacing.md,
        marginRight: spacing.md,
    },
})

