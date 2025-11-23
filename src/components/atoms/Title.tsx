import React from "react"
import { Text, StyleSheet, TextStyle } from "react-native"
import { useTheme } from "@theme"

interface TitleProps {
    children: React.ReactNode
    color?: string
    style?: TextStyle
    numberOfLines?: number
}

export const Title = React.memo(({ children, color, style, numberOfLines }: TitleProps) => {
    const { colors } = useTheme()
    const textColor = color || colors.textPrimary

    return (
        <Text 
            style={styles(textColor, style).title}
            numberOfLines={numberOfLines}
        >
            {children}
        </Text>
    )
})

const styles = (color: string, style = {}) => StyleSheet.create({
    title: {
        color: color,
        ...style
    },
})

