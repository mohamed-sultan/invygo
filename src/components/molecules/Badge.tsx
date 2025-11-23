import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { Title } from "@atoms/Title"  
import { useTheme, spacing, fontWeight, fontSize } from "@theme"

interface BadgeProps {
    children: React.ReactNode
    backgroundColor?: string
    textColor?: string
    position?: 'topLeft' | 'topRight'
    variant?: 'featured' | 'condition'
    style?: ViewStyle
}

export const Badge = React.memo(({ 
    children, 
    backgroundColor, 
    textColor,
    position = 'topLeft',
    variant = 'condition',
    style 
}: BadgeProps) => {
    const { colors } = useTheme()
    const bgColor = backgroundColor || colors.accentOrange
    const txtColor = textColor || colors.textInverse

    const getPositionStyle = () => {
        switch (position) {
            case 'topRight':
                return variant === 'featured' 
                    ? { top: spacing.md, right: spacing.md }
                    : { top: spacing.sm, right: spacing.sm }
            case 'topLeft':
            default:
                return { top: spacing.md, left: spacing.md }
        }
    }

    const getVariantStyle = () => {
        switch (variant) {
            case 'featured':
                return styles.featuredBadge
            case 'condition':
            default:
                return styles.conditionBadge
        }
    }

    return (
        <View 
            style={[
                getVariantStyle(),
                getPositionStyle(),
                { backgroundColor: bgColor },
                style
            ]}
        >
            <Title 
                color={txtColor} 
                style={variant === 'featured' ? styles.featuredBadgeText : styles.conditionText}
            >
                {children}
            </Title>
        </View>
    )
})

const styles = StyleSheet.create({
    featuredBadge: {
        position: 'absolute',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: spacing.sm,
    },
    conditionBadge: {
        position: 'absolute',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: spacing.xs,
    },
    featuredBadgeText: {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.bold,
    },
    conditionText: {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.bold,
    },
})

