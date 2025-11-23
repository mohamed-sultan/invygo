import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme, spacing, fontWeight, fontSize, lineHeight } from "@theme"
import { Title } from "@atoms/Title"
import { Car } from "@interfaces/Car"

interface CarMetaDataProps {
    car: Car
    readMore: boolean
    onReadMoreToggle: () => void
}

export const CarMetaData = React.memo(({ car, readMore, onReadMoreToggle }: CarMetaDataProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    
    const fullCarName = `${car.brandName} ${car.carName}`
    const description = t('carDetails.description')
    const shortDescription = description.substring(0, 100)

    return (
        <>
            {/* Car Name and Price */}
            <View style={styles.carInfoHeader}>
                <View style={styles.carNamePriceContainer}>
                    <Title color={colors.textPrimary} style={styles.carName}>{fullCarName}</Title>
                    <Title color={colors.textPrimary} style={styles.carPrice}>
                        {car.price.toLocaleString()} {car.currency}
                    </Title>
                </View>
                <View style={styles.ratingContainer}>
                    <Title color={colors.accentOrange} style={styles.rating}>4.5/5</Title>
                    <Title color={colors.accentOrange} style={styles.star}>★</Title>
                </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
                <Title color={colors.textMuted} style={styles.description}>
                    {readMore ? description : shortDescription}
                    {!readMore && '...'}
                </Title>
                <TouchableOpacity onPress={onReadMoreToggle}>
                    <Title color={colors.primary} style={styles.readMore}>{t('carDetails.readMore')}</Title>
                </TouchableOpacity>
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    carInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    carNamePriceContainer: {
        flex: 1,
    },
    carName: {
        fontSize: fontSize.xxxl,
        fontWeight: fontWeight.bold,
        marginBottom: spacing.xs,
    },
    carPrice: {
        fontSize: fontSize.xl,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    rating: {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semiBold,
    },
    star: {
        fontSize: fontSize.xl,
    },
    descriptionContainer: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.lg,
    },
    description: {
        fontSize: fontSize.md,
        lineHeight: lineHeight.md,
        marginBottom: spacing.sm,
    },
    readMore: {
        fontSize: fontSize.md,
    },
})

