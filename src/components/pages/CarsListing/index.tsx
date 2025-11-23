import React, { useRef } from "react"
import { View, StyleSheet, Animated, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "@interfaces/Navigation"
import { Car } from "@interfaces/Car"
import { Loader } from "@atoms/Loader"
import { useTheme, spacing, fontWeight, fontSize } from "@theme"
import { HeaderSection } from "./Containers/HeaderSection"
import { FeaturedSection } from "./Containers/FeaturedSection"
import { RecommendedSection } from "./Containers/RecommendedSection"
import { useCarsListing } from "@hooks/useCarsListing"

type CarsListingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarsListing'>

const CarsListing = () => {
    const { colors } = useTheme()
    const navigation = useNavigation<CarsListingScreenNavigationProp>()
    const scrollY = useRef(new Animated.Value(0)).current
    
    const {
        featuredCars,
        featuredLoading,
        displayedRecommendedCars,
        recommendedLoading,
        loadingMore,
        hasMore,
        loadMoreRecommended,
        refreshing,
        onRefresh,
    } = useCarsListing()

    const handleScrollEvent = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        scrollY.setValue(offsetY)
    }

    const handleCarPress = (car: Car) => {
        navigation.navigate('CarDetails', { car })
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.surfaceLight }]} edges={['top']}>
            <HeaderSection scrollY={scrollY} />
            
            <View style={styles.scrollViewContainer}>
                {refreshing && (
                    <View style={styles.refreshLoaderContainer}>
                        <Loader color={colors.loader} size={30} />
                    </View>
                )}
                <Animated.ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={(e) => {
                        handleScrollEvent(e)
                        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
                        const paddingToBottom = 100
                        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
                            loadMoreRecommended()
                        }
                    }}
                    scrollEventThrottle={16}
                    bounces={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="transparent"
                            colors={['transparent']}
                            progressViewOffset={-1000}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    }
                >
                {/* Featured Section */}
                <FeaturedSection
                    featuredCars={featuredCars}
                    featuredLoading={featuredLoading}
                    onCarPress={handleCarPress}
                />

                {/* Recommended Section */}
                <RecommendedSection
                    displayedRecommendedCars={displayedRecommendedCars}
                    recommendedLoading={recommendedLoading}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
                    refreshing={refreshing}
                    onCarPress={handleCarPress}
                />
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
        position: 'relative',
    },
    refreshLoaderContainer: {
        position: 'absolute',
        top: spacing.md,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
        paddingTop: spacing.md,
    },
    scrollContent: {
        paddingBottom: spacing.md,
        paddingTop: spacing.sm,
    },
})

export default CarsListing