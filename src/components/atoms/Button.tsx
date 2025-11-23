import React from "react"
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Loader } from "./Loader"
import { Title } from "./Title"
import { useTheme, spacing, fontWeight, fontSize, hp } from "@theme"

interface ButtonProps {
    children: React.ReactNode
    onPress: () => void
    loading?: boolean
    disabled?: boolean
    backgroundColor?: string
    textColor?: string
    style?: ViewStyle
    textStyle?: TextStyle
}

export const Button = React.memo(({ 
    children, 
    onPress, 
    loading = false,
    disabled = false,
    backgroundColor,
    textColor,
    style,
    textStyle
}: ButtonProps) => {
    const { colors } = useTheme()
    const bgColor = backgroundColor || colors.accentOrange
    const txtColor = textColor || colors.textInverse
    const isDisabled = disabled || loading

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: bgColor },
                isDisabled && styles.buttonDisabled,
                style
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            {loading ? (
                <Loader color={colors.textPrimary} size={30} />
            ) : (
                <Title color={txtColor} style={{ ...styles.buttonText, ...textStyle }}>
                    {children}
                </Title>
            )}
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    button: {
        paddingVertical: spacing.md,
        borderRadius: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: hp(8),
    },
    buttonDisabled: {
        opacity: 0.8,
    },
    buttonText: {
        fontSize: fontSize.xl,
        fontWeight: fontWeight.bold,
    },
})

