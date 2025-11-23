import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme, spacing, fontWeight, fontSize, wp, hp } from "@theme"
import { Image } from "@atoms/Image"
import { Title } from "@atoms/Title"
import { Badge } from "@molecules/Badge"
import { Car } from "@interfaces/Car"

interface RecommendedItemProps {
    item: Car
    onPress: (car: Car) => void
}

export const RecommendedItem = React.memo(({ item, onPress }: RecommendedItemProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    const carNameWithYear = `${item.carName} ${item.manufacturingYear}`
    return (
        <TouchableOpacity
            style={[styles.recommendedCard, { backgroundColor: colors.background, shadowColor: colors.shadowBlack }]}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.recommendedImageContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.recommendedImage}    
                        resizeMode="stretch"
              
                />
                {item.condition === "NEW" && (
                    <Badge 
                        backgroundColor={colors.successGreen}
                        position="topRight"
                        variant="condition"
                    >
                        {t('common.new')}
                    </Badge>
                )}
            </View>
            <View style={styles.recommendedInfo}>
                <Title 
                    color={colors.textPrimary} 
                    style={styles.recommendedCarName}
                    numberOfLines={1}
                >
                    {carNameWithYear}
                </Title>
                {item.brandName && (
                    <Title color={colors.textMuted} style={styles.recommendedBrandName}>
                        {item.brandName}
                    </Title>
                )}
        
                <View style={styles.recommendedPriceRow}>
                    <Title color={colors.primary} style={styles.recommendedPrice}>
                        {item.price.toLocaleString()} {item.currency}
                    </Title>
                </View>
            </View>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    recommendedCard: {
        width: '100%',
        borderRadius: spacing.md,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    recommendedImageContainer: {
        position: 'relative',
        width: '100%',
        height: hp(17.5),
    },
    recommendedImage: {
        width: '100%',
        height: '100%',
    },
    recommendedInfo: {
        padding: spacing.md,
    },
    recommendedCarName: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
        marginBottom: spacing.xs,
    },
    recommendedBrandName: {
        fontSize: fontSize.sm,
        marginBottom: spacing.xs,
    },
    recommendedTrim: {
        fontSize: fontSize.sm,
        marginBottom: spacing.xs,
    },
    recommendedPriceRow: {
        marginTop: spacing.xs,
    },
    recommendedPrice: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.bold,
    },
})

