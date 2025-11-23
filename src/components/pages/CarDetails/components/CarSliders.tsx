import React, { useRef, useEffect, useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { BackButton } from "@molecules/BackButton"
import { SelectedImage } from "@molecules/SelectedImage"
import { HorizontalCarousel, HorizontalCarouselRef } from "@organisms/HorizontalCarousel"
import { spacing, wp, hp } from "@theme"

interface CarSlidersProps {
    images: string[]
    selectedImageIndex: number
    onImageSelect: (index: number) => void
}

const AUTO_SCROLL_INTERVAL = 2000
const AUTO_SCROLL_RESUME_DELAY = 5000

export const CarSliders = React.memo(({ images, selectedImageIndex, onImageSelect }: CarSlidersProps) => {
    const flatListRef = useRef<HorizontalCarouselRef>(null)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)
    const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const stopAutoScroll = useCallback(() => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current)
            scrollIntervalRef.current = null
        }
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
        }
        setIsAutoScrolling(false)
    }, [])

    const resumeAutoScroll = useCallback(() => {
        resumeTimeoutRef.current = setTimeout(() => {
            setIsAutoScrolling(true)
        }, AUTO_SCROLL_RESUME_DELAY)
    }, [])

    const pauseAutoScroll = useCallback(() => {
        stopAutoScroll()
        resumeAutoScroll()
    }, [stopAutoScroll, resumeAutoScroll])

    // Auto-scroll functionality
    useEffect(() => {
        if (images.length <= 1 || !isAutoScrolling) {
            return
        }

        scrollIntervalRef.current = setInterval(() => {
            const nextIndex = (selectedImageIndex + 1) % images.length
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            })
            onImageSelect(nextIndex)
        }, AUTO_SCROLL_INTERVAL)

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current)
                scrollIntervalRef.current = null
            }
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current)
                resumeTimeoutRef.current = null
            }
        }
    }, [images.length, isAutoScrolling, selectedImageIndex, onImageSelect])

    const handleIndexChange = useCallback((index: number) => {
        onImageSelect(index)
        pauseAutoScroll()
    }, [onImageSelect, pauseAutoScroll])

    const handleThumbnailPress = useCallback((index: number) => {
        onImageSelect(index)
        flatListRef.current?.scrollToIndex({ index, animated: true })
        pauseAutoScroll()
    }, [onImageSelect, pauseAutoScroll])

    return (
        <>
            <View style={styles.mainImageContainer}>
                <HorizontalCarousel 
                    ref={flatListRef}
                    data={images}
                    onIndexChange={handleIndexChange}
                    initialIndex={selectedImageIndex}
                    itemWidth={wp(100)}
                    itemHeight={hp(37)}
                    keyExtractor={(item, index) => `image-${index}`}
                
                />
                <BackButton />
            </View>

            <View style={styles.thumbnailContainer}>
                {images.map((image: string, index: number) => (
                    <SelectedImage
                        key={index}
                        imageUrl={image}
                        isSelected={selectedImageIndex === index}
                        onPress={() => handleThumbnailPress(index)}
                    />
                ))}
            </View>
        </>
    )
})

const styles = StyleSheet.create({
    mainImageContainer: {
        width: '100%',
        height: hp(37),
        position: 'relative',
    },
    thumbnailContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        gap: spacing.md,
    },
})

