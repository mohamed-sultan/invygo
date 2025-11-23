import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { useTheme, spacing, fontWeight, fontSize, wp, hp } from "@theme"
import { Title } from "@atoms/Title"  

export const CarFeatures = React.memo(() => {
    const { t } = useTranslation()
    const { colors } = useTheme()

    return (
        <View style={styles.featuresContainer}>
            <View style={styles.featuresRow}>
                <View style={[styles.featureButton, { backgroundColor: colors.featureButtonBg }]}>
                    <View style={[styles.featureIconContainer, { backgroundColor: colors.featureButtonIconBg }]}>
                        <Title color={colors.textInverse} style={styles.checkIcon}>✓</Title>
                    </View>
                    <Title color={colors.textInverse} style={styles.featureText}>{t('carDetails.autopilot')}</Title>
                </View>
                <View style={[styles.featureButton, { backgroundColor: colors.featureButtonBg }]}>
                    <View style={[styles.featureIconContainer, { backgroundColor: colors.featureButtonIconBg }]}>
                        <Title color={colors.textInverse} style={styles.checkIcon}>✓</Title>
                    </View>
                    <Title color={colors.textInverse} style={styles.featureText}>{t('carDetails.camera360')}</Title>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    featuresContainer: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    featuresRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    featureButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: spacing.sm,
        gap: spacing.sm,
    },
    featureIconContainer: {
        width: wp(6),
        height: wp(6),
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.bold,
    },
    featureText: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.semiBold,
    },
})

