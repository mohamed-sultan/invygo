import React from "react"
import { Text, StyleSheet, TextStyle } from "react-native"
import { useTheme, fontWeight, fontSize } from "@theme"

interface HeadingProps {
    children: React.ReactNode
    color?: string
    style?: TextStyle
}

export const Heading = React.memo(({ children, color, style }: HeadingProps) => {
    const { colors } = useTheme()
    const textColor = color || colors.textPrimary

    return (
        <Text 
            style={styles(textColor, style).heading}
        >
            {children}
        </Text>
    )
})

const styles = (color: string,style={}) => StyleSheet.create({
    heading: {
        fontSize: fontSize.xxl,
        fontWeight: fontWeight.bold,
        color: color,
        ...style
    },
})

