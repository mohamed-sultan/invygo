import React from "react"
import {
    LoaderKitView,
} from 'react-native-loader-kit';
import { useTheme } from "@theme"

interface LoaderProps {
    color?: string
    size?: number
}

export const Loader = React.memo(({ color, size = 50 }: LoaderProps) => {
    const { colors, isDarkMode } = useTheme()
    const loaderColor = color??  isDarkMode ? 'white' : colors.accentOrange

    return (
        <LoaderKitView
            style={{ width: size, height: size }}
            name={'BallClipRotate'}
            animationSpeedMultiplier={1.0}
            color={loaderColor}
        />
    )
})