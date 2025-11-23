import React from "react"
import { Image as RNImage, ImageStyle, ImageSourcePropType, ImageProps as RNImageProps, StyleSheet } from "react-native"
import { lightColors } from "@theme"

interface ImageProps extends Omit<RNImageProps, 'source' | 'style'> {
    source: ImageSourcePropType | { uri: string }
    style?: ImageStyle
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
}

export const Image = React.memo(({ source, style, resizeMode = 'cover', ...props }: ImageProps) => {
    return (
        <RNImage
            source={source}
            style={[
                styles.image,
                style
            ]}
            resizeMode={resizeMode}
            {...props}
        />
    )
})

const styles = StyleSheet.create({
    image: {
        backgroundColor: lightColors.imagePlaceholder,
    },
})

