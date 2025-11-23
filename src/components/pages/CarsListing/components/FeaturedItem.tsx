import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme, spacing, fontWeight, fontSize, wp, hp } from "@theme"
import { Image } from "@atoms/Image"
import { Title } from "@atoms/Title"
import { Badge } from "@molecules/Badge"
import { Car } from "@interfaces/Car"

interface FeaturedItemProps {
    item: Car
    onPress: (car: Car) => void
}

export const FeaturedItem = React.memo(({ item, onPress }: FeaturedItemProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    const fullCarName = `${item.brandName} ${item.carName} ${item.manufacturingYear}`

    return (
        <TouchableOpacity
            style={[styles.featuredCard, { backgroundColor: colors.background, shadowColor: colors.shadowBlack }]}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.featuredImageContainer}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.featuredImage}
                    resizeMode="cover"
                />
                <Badge 
                    backgroundColor={colors.accentOrange}
                    position="topLeft"
                    variant="featured"
                >
                    {t('common.featured')}
                </Badge>
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
            <View style={styles.featuredInfo}>
                <Title 
                    color={colors.textPrimary} 
                    style={styles.featuredCarName}
                    numberOfLines={2}
                >
                    {fullCarName}
                </Title>
                <View style={styles.featuredPriceRow}>
                    <Title color={colors.primary} style={styles.featuredPrice}>
                        {item.price.toLocaleString()} {item.currency}
                    </Title>
                    <Title color={colors.textMuted} style={styles.featuredPricePeriod}>
                        {t('common.month')}
                    </Title>
                </View>
            </View>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    featuredCard: {
        width: wp(85),
        borderRadius: spacing.md,
        marginRight: spacing.md,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    featuredImageContainer: {
        position: 'relative',
        width: '100%',
        height: hp(25),
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredInfo: {
        padding: spacing.md,
    },
    featuredCarName: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
        marginBottom: spacing.sm,
    },
    featuredPriceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    featuredPrice: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
    },
    featuredPricePeriod: {
        fontSize: fontSize.md,
        marginLeft: spacing.xs,
    },
})

