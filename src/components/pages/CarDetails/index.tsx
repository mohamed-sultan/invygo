import React, { useState, useCallback } from "react"
import { 
    View, 
    StyleSheet, 
    ScrollView
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { RootStackParamList } from "@interfaces/Navigation"
import { Button } from "@atoms/Button"    
import { useTheme, spacing } from "@theme"
import { EmptyState } from "./components/EmptyState"
import { CarDetailsInfo } from "./components/CarDetailsInfo"
import { CarFeatures } from "./components/CarFeatures"
import { CarSliders } from "./components/CarSliders"
import { CarMetaData } from "./components/CarMetaData"

type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>
type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>

const CarDetails = () => {
    const { t } = useTranslation()
    const { colors } = useTheme()
    const navigation = useNavigation<CarDetailsScreenNavigationProp>()
    const route = useRoute<CarDetailsScreenRouteProp>()
    const { car } = route.params || {}
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [readMore, setReadMore] = useState(false)
    const [isBuying, setIsBuying] = useState(false)

    const handleBuyNow = useCallback(async () => {
        if (isBuying) return
        setIsBuying(true)
        await new Promise<void>(resolve => setTimeout(() => resolve(), 2000))
        navigation.goBack()
    }, [isBuying, navigation])

    if (!car) {
        return <EmptyState />
    }

    // Get images from car object (support both single imageUrl and images array)
    const carImages = (car as any).images && Array.isArray((car as any).images) 
        ? (car as any).images 
        : [car.imageUrl, car.imageUrl, car.imageUrl]
    
    const thumbnailImages = carImages.slice(0, 3) // Take first 3 images

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <CarSliders
                    images={thumbnailImages}
                    selectedImageIndex={selectedImageIndex}
                    onImageSelect={setSelectedImageIndex}
                />

                <CarMetaData 
                    car={car}
                    readMore={readMore} 
                    onReadMoreToggle={() => setReadMore(!readMore)}
                />

                <CarFeatures />

                <CarDetailsInfo car={car} />
            </ScrollView>

            <View style={[styles.bottomButtonContainer, { backgroundColor: colors.background, borderTopColor: colors.dividerLight }]}>
                <Button
                    loading={isBuying}
                    disabled={isBuying}
                    onPress={handleBuyNow}
                >
                    {t('carDetails.buyNow')}
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: spacing.xl * 3 + spacing.md, // 100 equivalent
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderTopWidth: 1,
    },
})

export default CarDetails
