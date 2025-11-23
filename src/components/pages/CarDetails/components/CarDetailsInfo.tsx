import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme, spacing, fontSize } from "@theme"
import { Title } from "@atoms/Title"
import { Car } from "@interfaces/Car"

interface CarDetailsInfoProps {
    car: Car
}

const colorMap: { [key: string]: string } = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#00FF00',
    black: '#000000',
    white: '#FFFFFF',
    silver: '#C0C0C0',
    gray: '#808080',
    yellow: '#FFFF00',
    orange: '#FFA500',
    purple: '#800080',
}

export const CarDetailsInfo = React.memo(({ car }: CarDetailsInfoProps) => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    const carColors = car.colors || ['red', 'blue', 'green']

    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Title style={styles.infoIcon}>🤝</Title>
                    <Title color={colors.textMuted} style={styles.infoText}>{t('carDetails.contactDealer')}</Title>
                </View>
                <View style={styles.infoItem}>
                    <Title style={styles.infoIcon}>🚗</Title>
                    <View style={styles.colorsContainer}>
                        {carColors.map((color, index) => {
                            const colorHex = colorMap[color.toLowerCase()] || colorMap.red
                            return (
                                <View 
                                    key={index}
                                    style={[
                                        styles.colorCircle, 
                                        { 
                                            backgroundColor: colorHex, 
                                            borderColor: colors.dividerLight,
                                            marginLeft: index > 0 ? spacing.xs : 0,
                                        }
                                    ]} 
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Title style={styles.infoIcon}>📍</Title>
                    <Title color={colors.textMuted} style={styles.infoText}>{t('carDetails.location')}</Title>
                </View>
                <View style={styles.infoItem}>
                    <Title style={styles.infoIcon}>💰</Title>
                    <Title color={colors.textMuted} style={styles.infoText}>{t('carDetails.emiLoan')}</Title>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    infoContainer: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,

    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        flex: 1,
    },
    infoIcon: {
        fontSize: fontSize.xxl,
    },
    colorsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
    infoText: {
        fontSize: fontSize.md,
        flex: 1,
    },
})


